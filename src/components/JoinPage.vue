<template>
    <div class="container">
        <h3>회원 가입</h3>
        {{ user }}
        <div>
            <label class="lbl">아이디</label>
            <input type="text" v-model="user.userid"/>
        </div>
        <div>
            <label class="lbl">암호</label>
            <input type="password" v-model="user.userpw"/>
        </div>
        <div>
            <label class="lbl">암호 확인</label>
            <input type="password" v-model="user.userpw1"/>
        </div>
        <div>
            <label class="lbl">이름</label>
            <input type="text" v-model="user.username"/>
        </div>
        <div>
            <label class="lbl">나이</label>
            <input type="number" v-model="user.userage"/>
        </div>
        <div>
            <label class="lbl">이메일</label>
            <input type="text" v-model="user.useremail"/>
            <label>@</label>
            <select v-model="user.useremail1">
                <option>이메일 주소 선택</option>
                <option>google.com</option>
                <option>naver.com</option>
                <option>daum.net</option>
            </select>
        </div>
        <div>
            <button @click="handleJoin()">회원 가입</button>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup () {
        
        // 상태변수
        const user = reactive({
            userid   : '',
            userpw   : '',
            userpw1  : '',
            username : '',
            userage : '',
            useremail: '',
            useremail1 : '이메일 주소 선택'
        });

        // 함수들
        const handleJoin = () => {
            if(user.userid === '') {
                alert('아이디를 입력하세요.')
                return false;
            }
            if(user.userpw === '') {
                alert('암호를 입력하세요.')
                return false;
            }
            if(user.userpw1 === '') {
                alert('암호를 다시 입력하세요.')
                return false;
            }
            if(user.userpw !== user.userpw1) {
                alert('암호를 확인 하세요.')
                return false;
            }
            if(user.username === '') {
                alert('이름를 입력하세요.')
                return false;
            }
            if(user.userage === '') {
                alert('나이를 입력하세요.')
                return false;
            }
            if(user.useremail === '') {
                alert('이메일을 입력하세요.')
                return false;
            }
            if(user.useremail1 === '이메일 주소 선택') {
                alert('이메일 주소를 입력하세요.')
                return false;
            }
            // 유효성 성공하면 백엔드 연동
        }

        // 템플릿에서 사용하기 위한 리턴(변수, 함수 등..)
        return {
            user,
            handleJoin
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 600px;
        padding : 20px;
        border  : 2px solid #ffd7d7;
        margin  : 0px auto;
    }
    .lbl {
        display: inline-block;
        width: 100px;
    }
</style>