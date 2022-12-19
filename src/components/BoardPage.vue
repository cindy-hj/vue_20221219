<template>
    <div class="container">
        <div>
            <h3>게시판</h3>
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
                            <td><a href=# @click="handleHit(tmp._id, $event)">{{ tmp.title }}</a></td>
                            <td>{{ tmp.writer }}</td>
                            <td>{{ tmp.hit }}</td>
                            <td>{{ tmp.regdate }}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

    export default {
        setup () {

            // 상태변수
            // 목록=>[{},{}...{}]
            const board = reactive({
                rows : []
            });

            const handleHit = async(e) => {
                const url = `http://1.234.5.158:23000/board101/updatehit.json?no=${e}`;
                const headers = {"Content-Type":"application/json"};
                const body = {};
                const {data} = await axios.put(url, body, {headers});
                console.log(data);
                if(data.status === 200 ) {
                    window.location.href=`/boardone1.html?no=${e}`;
                    // boardone게시판을 따로 만들어야 하긴 하는데.... 흠
                }
            }
            
            const handleData = async() => {
                const url = `http://1.234.5.158:23000/board101/select.json?page=1&text=`;
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

            return {
                board,
                handleHit
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