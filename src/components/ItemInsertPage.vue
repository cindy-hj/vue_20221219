<template>
    <div class="container">
    {{ state }}
        <div class="item">
            <label class="lbl">물품명</label>
            <input type="text" v-model="state.name"/>
        </div>

        <div class="item">
            <label class="lbl">물품설명</label>
            <textarea rows="6" v-model="state.content"></textarea>
        </div>

        <div class="item">
            <label class="lbl">가격</label>
            <input type="text" v-model="state.price"/>
        </div>

        <div class="item">
            <label class="lbl">수량</label>
            <input type="number" v-model="state.quantity" />
        </div>

        <div class="item">
            <label class="lbl">이미지</label>
            <img :src="state.imageurl" style="width: 50px; height: 50px;" />
            <input type="file" @change="handleImage($event)"/>
        </div>

        <div class="item">
            <label class="lbl"></label>
            <button @click="handleInsert()">등록하기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {

        const router =useRouter();
        
        const state = reactive({
            name      : 'a',
            content   : 'b',
            price     : '123', // 문자 취급
            quantity  : 456, // 숫자로 하면 비울수가 없음. 0이라도 써야..
            imagedata : null,
            imageurl  : require('../assets/imgs/logo.png')
        });

        const handleImage = (e) => {
            if(e.target.files.length > 0 ){
                state.imagedata = e.target.files[0];
                state.imageurl= URL.createObjectURL(e.target.files[0]);            }
            else {
                state.imagedata = null;
                state.imageurl= require('../assets/imgs/logo.png')
            }
        };

        const handleInsert = async() => {
            if(state.name.length <= 0) {
                alert('물품명을 입력하세요.');
                return false; // 함수종료
            }
            if(state.imagedata === null) {
                alert('이미지를 첨부하세요.');
                return false; // 함수종료
            }

            const url = `/item101/insert.json`;
            const headers = {"Content-Type":"multipart/form-data"}; // 이미지 존재할떄!!!!
            let body = new FormData(); // 계속 바뀌므로..

            body.append('name', state.name);
            body.append('price', Number(state.price) ); //전송할때 문자인 값을 숫자로 변환시켜서 보냄
            body.append('content', state.content);
            body.append('quantity', Number(state.quantity) );
            body.append('image', state.imagedata);
            
            const { data } = await axios.post(url, body, {headers});
            console.log(data) ; // 콘솔이라도 안찍으면 data 안썼다고 오류뜸...
            if(data.status === 200 ) {
                alert('등록되었습니다.')
                router.push({path:'/item'});
            }
        }
        
        return {
            state,
            handleInsert,
            handleImage
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width: 800px;
        margin: 0px auto;
    }
    .item {
        margin: 10px;
    }
    .lbl {
        display: inline-block;
        width: 100px;
    }
</style>