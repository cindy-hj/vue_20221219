<template>
    <div class="container">
        <h3>로그인</h3>
        {{ user }} 
        <div>
            <label class="lbl">아이디</label>
            <el-input type="text" size="small" style="width:200px" ref="userid" v-model="user.userid"></el-input>
        </div>

        <div>
            <label class="lbl">암호</label>
            <el-input type="password" size="small" style="width:200px" ref="userpw" v-model="user.userpw"></el-input>
        </div>

        <div>
            <el-button type='info' size="small" @click="handleLogin()">로그인</el-button>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {
    setup () { 

        const store = useStore();

        // 페이지 이동
        const router = useRouter();
        
        // 공통변수 영역 상수 object로 만듬, reactive
        const user = reactive({
            userid : '',
            userpw : ''
        });

        // 레퍼런스 변수 생성(focus 시키기 위함). import 시켜야함.
        const userid = ref();
        const userpw = ref();

        // 함수들 영역
        const handleLogin = async() => {
            console.log('handleLogin');
            if(user.userid === '') {
                alert('아이디를 입력하세요.');
                userid.value.focus();
                return false;
            }
            if(user.userpw === '') {
                alert('암호를 입력하세요.');
                userpw.value.focus();
                return false;
            }
            // 여기 왔다는 말은 위쪽에 if문이 수행된적이 없다! 필터하고자 한것을 다 통과했다!
            // 함수 안에 짜야 한다!
            const url =`/member101/select.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : user.userid,
                pw : user.userpw
            };

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                // 다른 컴포넌트에서 로그인 검증하기 위해 저장(토큰 값을 넣어 주는것)
                sessionStorage.setItem("TOKEN", data.result);
                
                // 컴포넌트 공통 변수 값 변경(함수, 변경값)
                store.commit('setLogged', true);

                alert('로그인 성공했습니다.');
                router.push({path:'/'});
            }
            else {
                alert('아이디 또는 암호가 틀립니다.');
            }
            
        };

        // 리턴 영역 (변수, 함수 등 templates에 사용하는 모든것)
        return { 
            user, // reactive
            handleLogin, // 함수
            userid, // ref
            userpw // ref
        }
    } 
}
</script>

<style lang="css" scoped>
    .container {
        width   : 600px;
        padding : 20px;
        border  : 1px solid #cccccc;
        margin  : 0px auto;
    }
    .lbl {
        display : inline-block;
        width   : 100px;
    }
</style>