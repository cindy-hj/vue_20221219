<template>
    <div class="container">
        <h3>게시판 상세 내용</h3>
        {{ state }}
        <hr />
        <div class="item">
            <p>번호 : {{ state.row._id }}</p>
            <p>제목 : {{ state.row.title}}</p>
            <p>내용 : {{ state.row.content }}</p>
            <p>작성자 : {{ state.row.writer }}</p>
            <p>조회수 : {{ state.row.hit }}</p>
            <p>등록일 : {{ state.row.regdate }}</p>
            <button @click="handleBack()">이전</button>
            <button @click="handlePrev()">이전글</button>
            <button @click="handleNext()">다음글</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        // 주소창의 no 받기, 역시나 import 시켜야함
        // 보내는건 router 받는건 route
        const route = useRoute();
        const router = useRouter();

        // ?no=771
        const state = reactive({
            no : Number(route.query.no),
            row : '',   
            prev : Number(),
            next : ''   
        })
        // BoardPage에서 query:{no:tmp}로 보낸걸 받음

        // 이전페이지 이동
        const handleBack = () => {
            router.go(-1);
        };

        const handlePrev = () => {
            router.push({path:`/boardcontent?no=${state.prev}`});
            // 이건... 오류도 안나는걸 보면 prev값이 null인가?
            // router.push({path:'/boardcontent', query:{prev}});
            // 위에껀 오류가 나는데... prev가 정의되지 않았다고 함. 결국 prev에 어떻게 값을 넣어주느냐를 모르는것...!
        }

        const handleNext = () => {
            router.push({path:`/boardcontent?no=${state.next}`});
        }

        const handleData = async() => {
            const url = `/board101/selectone.json?no=${state.no}` ;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);

            if( data.status === 200 ) {
                state.row = data.result;
                state.prev = data.prevNo;
                state.next = data.nextNo;
            }
        };

        // 웹페이지 생명주기. 화면이 로딩될때 자동 실행
        onMounted(()=>{
            handleData();
        });

        return {
            state, 
            handleBack,
            handlePrev,
            handleNext
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width               : 600px;
        margin              : 0px auto;
        background-color    : rgb(255, 252, 239);
        padding             : 10px;
    }
</style>