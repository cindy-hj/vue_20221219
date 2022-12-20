<template>
    <div class="container">
        <h3>게시판 글쓰기</h3>
        <hr />
        {{ state }}
        <div class="item">
            <label class="lbl">제목</label>
            <input type="text" v-model="title" />
            <!-- // toRefs로 하면 state.title을 title로 써도 됨! -->
        </div>

        <div class="item">
            <label class="lbl">작성자</label>
            <input type="text" v-model="writer" />
        </div>

        <div class="item">
            <label class="lbl">내용</label>
            <textarea rows="6" cols="22" style="resize: none;" v-model="content"></textarea>
        </div>

        <div class="item">
            <label class="lbl"></label>
            <button @click="handleInsert()">글쓰기</button>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const state = reactive({
            title   : '',
            content : '',
            writer  : ''
        });
        
        const router = useRouter(); 

        const handleInsert = async() => {
            const url = '/board101/insert.json' ;
            const headers = {"Content-Type":"application/json"} ;
            const body = {
                title   : state.title,
                content : state.content,
                writer  : state.writer
            };
            const { data } = await axios.post( url, body, {headers} )
            console.log(data);

            if(data.status === 200 ) {
                alert('글쓰기 성공!');
                router.push({path:'/board'});
                // <router-link to='/board'></router-link> 이건 a태그의 역할. 클릭해야 이동하는것
                // router.push({path:'', query:{}})는 location.href역할. 차이는 리로딩 하지 않고 컴포넌트만 교체 한다는것.
            }
        }

        return {
            state, 
            ... toRefs(state),
            handleInsert
        }  
    }
}
</script>

<style lang="css" scoped>
    .container{
        width   : 600px;
        margin  : 0px auto;
        border  : 3px solid #e6ffef;
        padding : 20px;
    }
    .item {
        margin  : 10px;
    }
    .lbl {
        display : inline-block;
        width   : 100px;
    }

</style>