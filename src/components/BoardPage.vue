<template>
    <div class="container">
        <h3>게시판</h3>
        
        <router-link to='/boardinsert'>
            <button>글쓰기1</button>
        </router-link>

        <!-- : 찍으면 오브젝트로 query를 보낼수 있다. 같은 역할이지만 밑에껄로 기억하는게 더 좋겠지! -->
        <router-link :to="{path:'/boardinsert', query:{no:1}}">
            <button>글쓰기2</button>
        </router-link>

        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp of board.rows" :key="tmp">
                    <td>{{ tmp._id }}</td>
                    <td @click="handleContent( tmp._id )" style="cursor:pointer;">{{ tmp.title }}</td> 
                    <!-- 클릭가능 한것 처럼 보여줌. 손가락 모양으로 -->
                    <!-- a태그를 쓰면 html과 똑같이 엔터 치면 깜빡임... 뷰를 쓰는 이유가 없다! 컴포넌트만 바꾸려면? router사용 -->
                    <!-- 주소를 바꾸는 이유? 컴포넌트만 교체하는거라서 의미가 없지만 f5눌렀을때 유지하기 위해서 주소를 따로 주는것! -->
                    <td>{{ tmp.writer }}</td>
                    <td>{{ tmp.hit }}</td>
                    <td>{{ tmp.regdate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

    export default {
        setup () {
            const router = useRouter();
            // 이동은 router사용. import 시켜야함

            // 상태변수
            // 목록=>[{},{}...{}]
            const board = reactive({
                rows : []
            });

            const handleContent =  async( tmp ) => {
                console.log('handleContent');
                
                // 조회수를 증가시키고 성공하면
                const url =`/board101/updatehit.json?no=${tmp}`;
                const headers = {"Content-Type":"application/json"};
                
                const { data } = await axios.put(url, {}, {headers});
                // body가 비었을때
                console.log(data);

                if(data.status === 200) {
                    // 주소창을 바꾸고, 컴포넌트 교체 (리로딩 아님!!!)
                    // localhost:8080/boardcontent?no=123 
                    router.push({path:'/boardcontent', query:{no:tmp}});
                }
            }

            const handleData = async() => {
                const url = `/board101/select.json?page=1&text=`;
                const headers = {"Content-Type":"application/json"};
                const { data } = await axios.get(url, {headers});
                console.log(data);

                //  정상적인 데이터인지 확인
                if(data.status === 200) {
                    // 테이블을 그리기 위한 상태변수 값을 추가
                    board.rows = data.rows;
                }
            }

            // 페이지가 로딩될때 자동 실행되는 함수
            onMounted(() =>{
                handleData(); //백엔드에서 게시판 목록 가져오기
            });
            // 외부에서 사용안할꺼면 리턴할필요없다
            return {
                board,
                handleContent
            };
        }
    }
</script>

<style lang="css" scoped>
    .container {
        width: 600px;
        background-color: rgb(255, 251, 255);
        margin: 0px auto;
        padding: 20px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }

</style>