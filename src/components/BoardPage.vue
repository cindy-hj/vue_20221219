<template>
    <div>
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
                    <td>{{ tmp.title }}</td>
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

    export default {
        setup () {

            // 상태변수
            // 목록=>[{},{}...{}]
            const board = reactive({
                rows : []
            });
            
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
                board
            };
        }
    }
</script>

<style lang="css" scoped>

</style>