<template>
    <div>
        <h3>마이페이지</h3> 
        <!-- 토큰을 가지고 있을때만 나오는 페이지 -->
        {{ state }}
        <hr />
        
        <button @click="state.menu=1">회원정보 수정</button>
        <button @click="state.menu=2">비밀번호 변경</button>

        <div v-show="state.menu === 1" v-if="state.user">
            <div>
                <input type="text" v-model="state.user.name" />
            </div>
            <div>
                <input type="text" v-model="state.user.age" />
            </div>
            <div>
                <button @click="handleUpdate()">정보수정</button>
            </div>
        </div>
        <div v-show="state.menu === 2">
            비번변경
            <div>
                <input type="password" v-model="state.oldpw" placeholder="기존암호" />
            </div>
            <div>
                <input type="password" v-model="state.newpw" placeholder="변경암호" />
            </div>
            <div>
                <input type="password" v-model="state.newpw1" placeholder="변경암호확인" />
            </div>
            <div>
                <button @click="handleUpdatePW()">비밀번호 변경</button>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';

export default {
    setup () {

        const state = reactive({
            menu    : 1, // 메뉴
            token   : sessionStorage.getItem("TOKEN"), // 토큰
            user    : null, // 현재 사용자 정보 보관용
            // null로 하면 if문 처리 해야됨. ''로 하면 if문 처리 안해도됨
            oldpw   : null, // 이건 또 null로 해도 오류가 안나는군.. 처리 순서 뒤죽박죽?!
            newpw   : null,
            newpw1  : null
        });

        const handleData = async() => {
           const url = `/member101/selectone.json`;
           const headers = {
                "Content-Type":"application/json",
                "auth"        : state.token
                // headers에 토큰을 심음
            } 
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.user = data.result;
            }
        };

        onMounted(()=> {
            handleData();
        });

        const handleUpdate = async() => {
            const url = `/member101/update.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth"        : state.token 
                //이름하고 나이만 주면 어떤 사람 건지 몰라. 그래서 토큰을 같이 보내주는것
            };
            const body = {
                name : state.user.name,
                age  : state.user.age
            }
            const { data } = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                alert('회원정보 수정 완료!');
                handleData(); // 정보 수정 후 새로고침 해준것
            }
        };

        const handleUpdatePW = async() => {
            const url = `/member101/updatepw.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth"        : state.token
            };
            const body = {
                pw : state.oldpw, 
                newpw: state.newpw
            }
            const { data } = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                alert('비밀번호 변경 완료!');
                state.menu = 2; 
                // handleData는 회원정보를 불러오는거니까 굳이 비밀번호 변경하고 다시 정보 불러올 이유가 없음.
            }
        };

        return {
            state,
            handleUpdate,
            handleUpdatePW
        };
    }
}
</script>

<style lang="css" scoped>


</style>