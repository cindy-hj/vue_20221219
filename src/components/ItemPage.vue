<template>
    <div>
        <h3>물품목록</h3>
        <router-link :to ="{ path :'/iteminsert' }">
            <button>물품등록</button>
        </router-link>
        <el-table :data="state.rows" style="width: 100%; cursor: pointer;" @row-click="handleContent1">
            <el-table-column prop="_id" label="물품번호" width="100" />
            <el-table-column prop="name" label="물품명" width="180" />
            <el-table-column prop="content" label="물품내용" width="250" />
            <el-table-column prop="price" label="물품가격" width="180" />
            <el-table-column prop="quantity" label="물품수량" width="180" />
            <el-table-column prop="regdate" label="등록일" width="180" />
        </el-table>
        <!-- <table border="1">
            <thead>
                <tr>
                    <th>물품번호</th>
                    <th>물품명</th>
                    <th>물품내용</th>
                    <th>물품가격</th>
                    <th>물품수량</th>
                    <th>등록일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp of state.rows" :key="tmp" @click="handleContent( tmp._id )" style="cursor: pointer;">
                    <td>{{ tmp._id }}</td>
                    <td>{{ tmp.name }}</td>
                    <td>{{ tmp.content }}</td>
                    <td>{{ tmp.price }}</td>
                    <td>{{ tmp.quantity }}</td>
                    <td>{{ tmp.regdate }}</td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        // 페이지 이동 라우트
        const router = useRouter();

        // 백엔드 데이터를 받아서 보관, template에 적용되서 출력
        const state = reactive({
            rows: null, // 물품목록 받을 변수
        });

        const handleContent1 = (a) => {
            console.log(a._id);
            handleContent(a._id);
        };

        // 함수 호출 되어야 함.
        const handleData = async () => {
            const url = `/item101/selectlist.json`; // board101로 시작된게 아니라서 config에서 인식이 안됨. 보통은 서버:8080/api/borad101 식으로 통일됨.
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log(data);
            if (data.status === 200) {
                //[{},{}...{}]
                state.rows = data.result;
            }
        };

        const handleContent = ( code ) => { // 물품 번호 받음
            console.log('handleContent', code);
            router.push({path:'/itemcontent', query:{code:code}}); 
            // 쿼리를 줬다는건 뒤쪽에 ?를 붙여서 데이터 전송했다는 뜻. ?code=code(위에서 받은물품번호) 라는 뜻이여!
        };

        // 화면이 로딩될때 함수 호출, 생명주기
        onMounted(() => {
            handleData(); // () 붙이는거 까먹지 마라...
        });
        return {
            state,
            handleContent,
            handleContent1
        };
    }
}
</script>

<style lang="css" scoped>

</style>