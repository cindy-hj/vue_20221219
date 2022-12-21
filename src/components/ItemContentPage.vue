<template>
    <div>
        <h3>물품상세</h3>
        {{ state }}
        <!-- //하나밖에 없음. 배열 꼴이 아니므로 반복문 돌릴수 없어! -->
        
        <!-- //row로 백엔드로 갔다가 받아오는데 시간좀 걸림. template에 그리는건 바로 수행. 먼저 수행될수 ㅣㅇㅆ따! row가 null일때 template을 수행했다!
        //데이터 받는 타이밍과 화면에 출력하는 타이밍이 안맞는것
        //row에 데이터 담기는게 먼저. 그다음에 그려져야함.. 근데 이건 우리가 조절 못해..! 
        // 2번 하는수 밖에.. null일떄는 수행 안되게. null 이 아닐때 수행되게! -> if문 처리 -->
        
        <!-- // show는 숨기는 개념 -->
        <div v-show="state.div===1" v-if="state.row"> 
            <p>글번호    : {{ state.row._id }}</p>
            <p>물품사진  : <img :src="state.row.img" style="width: 50px; height: 50px;" /></p>
            <p>물품명    : {{ state.row.name }}</p>
            <p>물품 설명 : {{ state.row.content }}</p>
            <p>물품 가격 : {{ state.row.price }}</p>
            <p>물품 수량 : {{ state.row.quantity }}</p>
            <p>등록일    : {{ state.row.regdate }}</p>
            <button @click="state.div = 2">수정</button>
            <button @click="handleDelete()">삭제</button>
            <button @click="handlePrevPage()">이전페이지</button>
        </div>
        
        <div v-show="state.div===2" v-if="state.row1">
            <div>
                <input type="text" v-model="state.row1.name" />
            </div>

            <div>
                <input type="text" v-model="state.row1.content" />
            </div>

            <div>
                <input type="text" v-model="state.row1.price" />
            </div>

            <div>
                <input type="text" v-model="state.row1.quantity" />
            </div>

            <button @click="handleUpdate()">수정완료</button>
            <button @click="state.div = 1">취소</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter() ;
        const route = useRoute() ;
        const state = reactive({
            no   : Number(route.query.code), // ?no=511
            row  : null,
            row1 : null, // 수정시 사용
            div  : 1, // ex 1,2 div 태그를 전환하기 위한 용도

            //이값을 기반으로 최초로 화면 그리고. 새로운 데이터가 들어오면 다시 화면 그림. null이면 _id없어서 오류 뜸. v-if="state.row"는 !== null의 의미
            // if 걸면 최초에는 안그림. null이니까. 데이터 들어오면 그림.
            // ''는null 이 아니라 빈것! 이건 if처리 안해도 오류는 안남... null은 할당이 안된것. ''는 빈게 들어간것. 정확한건 null이지..! 
            // 어쨌든 if문 처리해서 화면 잡는게 맞음. 수행되는 순서가 뒤죽박죽이므로..
            // 글자를 ㅁㄴ저 채우고 이미지 나중에 채우는 식... 아예 안뜨면 시간 오래 걸리면 사용자가 화면 안뜬줄 안다..
            // 그래서 먼저 보여주는것...! 화면을 빨리 보여주고... 데이터 오류나는 부분에는 if문 처리 하는것. 
        });

        const handleData = async() => {
            const url =`/item101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get( url, {headers});
            console.log(data);
            if( data.status === 200) {
                state.row = data.result;
                state.row1 = { ...data.result}; // 내용만 복사하기
            }
        }

        onMounted(()=> {
            handleData()
        });

        const handlePrevPage = () => {
            router.go(-1);
        }

        const handleDelete = async() => {
            // const result = confirm ('삭제 할까요?');
            if(confirm('삭제할까요?')) {
                const url=`/item101/delete.json?no=${state.no}`;
                const headers={"Content-Type":"application/json"};
                const body = {}
            
                const {data} = await axios.delete(url, {headers:headers, data:body});
                console.log(data);
            
                if(data.status === 200) {
                    alert('삭제 되었습니다.')
                    router.push({path:"/item"}) 
                }
            }   
        }

        

        const handleUpdate = async() => {
            const url = `/item101/update.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                name     : state.row1.name,
                content  : state.row1.content,
                price    : state.row1.price,
                quantity : state.row1.quantity,
            }
            const {data} = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                // 현재 페이지로 전환
                // 같은 페이지는 url은 변경되지만 컴포넌트 갱신하지 않음.
                handleData(); // 수동으로 내용 변경
                state.div = 1; // 첫번째 div로 보이게..
            }
        }

        return {
            state,
            handleDelete,
            handlePrevPage,
            handleUpdate
        };
    }
}
</script>

<style lang="css" scoped>

</style>