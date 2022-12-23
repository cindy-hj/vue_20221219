<template>
    <div class="container">
        <h3>게시판</h3>
        
        <!-- <router-link to='/boardinsert'>
            <button>글쓰기1</button>
        </router-link> -->

        <!-- : 찍으면 오브젝트로 query를 보낼수 있다. 같은 역할이지만 밑에껄로 기억하는게 더 좋겠지! -->
        <router-link :to="{path:'/boardinsert', query:{no:1}}" style="text-decoration: none;">
            <el-button type="info" size="small" >글쓰기</el-button>
        </router-link>

        <el-input type="text" size="small" v-model="board.text" @keyup.enter="handleText()" placeholder="검색어 입력" style="width:200px;"/>

        <!-- // : 없으면 String -->
        <el-table :data="board.rows" style="width:100%; cursor:pointer;" @row-click="handleContent1">
            <el-table-column prop="_id" label="글번호" width="80px;"/>
            <el-table-column prop="title" label="제목" />
            <el-table-column prop="writer" label="작성자" />
            <el-table-column prop="hit" label="조회수" />
            <el-table-column prop="regdate" label="날짜" width="160px;"/>
        </el-table>

        <el-pagination small layout="prev, pager, next" @current-change="handlePage" :total="board.total">
        </el-pagination>

        <!-- <table border="1">
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
                    <td @click="handleContent( tmp._id )" style="cursor:pointer;">{{ tmp.title }}</td>  -->
                    <!-- 클릭가능 한것 처럼 보여줌. 손가락 모양으로 -->
                    <!-- a태그를 쓰면 html과 똑같이 엔터 치면 깜빡임... 뷰를 쓰는 이유가 없다! 컴포넌트만 바꾸려면? router사용 -->
                    <!-- 주소를 바꾸는 이유? 컴포넌트만 교체하는거라서 의미가 없지만 f5눌렀을때 유지하기 위해서 주소를 따로 주는것! -->
                    <!-- <td>{{ tmp.writer }}</td>
                    <td>{{ tmp.hit }}</td>
                    <td>{{ tmp.regdate }}</td>
                </tr>
            </tbody>
        </table> -->

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
            // 초기값설정-> 숫자: 0, 문자: '', 배열: null
            const board = reactive({
                total   : 0, // 전체 게시물 수
                rows    : null, // 게시물 내용
                page    : 1, // 페이지 정보
                text    : '', // 검색어 정보
            });

            const handleText = () => {
                board.page = 1; // 검색 완료됐을땐 1페이지에서 띄움
                handleData();
            };

            const handlePage = (page) => {
                console.log(page);
                board.page = page; // 상태변수값 변경
                handleData(); // 게시물 읽기
            };

            // parameter 3개 라서 일단 a,b,c로 지정해서 콘솔 찍어봄
            // 하나만 있어도 id알수있으므로 하나만 받아와도 될꺼 같다.
            const handleContent1 = (row) => {
                console.log(row._id);
                handleContent (row._id);
                // 복붙 귀찮으니까 호출한것
            };

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
            };

            const handleData = async() => {
                const url = `/board101/select.json?page=${board.page}&text=${board.text}`;
                const headers = {"Content-Type":"application/json"};
                const { data } = await axios.get(url, {headers});
                console.log(data);

                //  정상적인 데이터인지 확인
                if(data.status === 200) {
                    // 테이블을 그리기 위한 상태변수 값을 추가
                    board.rows = data.rows;
                    board.total = data.total
                }
            };

            // 페이지가 로딩될때 자동 실행되는 함수
            onMounted(() =>{
                handleData(); //백엔드에서 게시판 목록 가져오기
            });
            // 외부에서 사용안할꺼면 리턴할필요없다
            return {
                board,
                handleContent,
                handleContent1,
                handlePage,
                handleText
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