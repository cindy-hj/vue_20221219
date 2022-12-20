<template>
    <div class="container">
        <h3>로그인</h3>
        {{ user }} 
        <div>
            <label class="lbl">아이디</label>
            <input type="text" v-model="user.userid" />
        </div>

        <div>
            <label class="lbl">암호</label>
            <input type="password" v-model="user.userpw" />
        </div>

        <div>
            <button @click="handleLogin()">로그인</button>
        </div>
    </div>

</template>

<script>
import { reactive } from 'vue';


export default {
    setup () { 
        
        // 공통변수 영역 상수 object로 만듬, reactive
        const user = reactive({
            userid : 'aaa',
            userpw : 'bbb'
        });

        // 함수들 영역
        const handleLogin = () => {
            console.log('handleLogin');
            if(user.userid === '') {
                alert('아이디를 입력하세요.');
                return false;
            }
            if(user.userpw === '') {
                alert('암호를 입력하세요.');
                return false;
            }
        };

        // 리턴 영역 (변수, 함수 등 templates에 사용하는 모든것)
        return { 
            user,
            handleLogin
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