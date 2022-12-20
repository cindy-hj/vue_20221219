<template>
    <div class="container">
        <div class="item">
            {{ state }}
            <h3>회원가입</h3>
        </div>

        <div class="item">
            <label class="lbl">아이디</label>
            <input type="text" v-model="state.id" placeholder='아이디를 입력하세요' />
        </div>

        <div class="item">
            <label class="lbl">암호</label>
            <input type="password" v-model="state.pw" placeholder='암호를 입력하세요' />
        </div>

        <div class="item">
            <label class="lbl">암호확인</label>
            <input type="password" v-model="state.pw1" placeholder='암호를 다시 입력하세요' />
        </div>

        <div class="item">
            <label class="lbl">이름</label>
            <input type="text" v-model="state.name" placeholder='이름을 입력하세요' />
        </div>

        <div class="item">
            <label class="lbl">연락처</label>
            <input type="text" v-model="state.num" style="width: 25px;" placeholder='010' />
            <label>-</label>
            <input type="text" v-model="state.num1" style="width: 33px;" placeholder='0000' />
            <label>-</label>
            <input type="text" v-model="state.num2" style="width: 33px;" placeholder='0000' />
        </div>

        <div class="item" >
            <label class="lbl">성별</label>
            <div v-for="tmp of radio" :key="tmp" style="display: inline-block;">
                <input type="radio" name="gender" :value="tmp.value" v-model="state.gender"/> {{ tmp.value }}
            </div>
        </div>

        <div class="item">
            <label class="lbl">이메일</label>
            <input type="text" v-model="state.email" placeholder='이메일' />
            <label>@</label>
            <select v-model="state.email1">
                <option v-for="tmp of email1" :key="tmp" :value="tmp.value">{{ tmp.value }}</option>
            </select>
        </div>

        <div class="item">
            <label class="lbl">관심분야</label>
            <div v-for="tmp of interest" :key="tmp" style="display: inline-block;">
                <input type="checkbox" :value="tmp.value" v-model="state.interest"/>{{ tmp.value }}
            </div>
        </div>

        <div class="item">
            <label class="lbl">자기소개</label>
            <textarea rows="6" cols="25" v-model="state.intro" placeholder="자기소개"></textarea>
        </div>

        <div class="item">
            <label class="lbl">생년월일</label>
            <input type="date" v-model="state.birth"/>
        </div>
        
        <hr />
        <div class="item">
            <label class="lbl"></label>
            <button>회원가입</button>
            <button>로그인</button>
            <button>홈으로</button>
        </div>

    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup () {
        const state = reactive({
            id       : '',
            pw       : '',
            pw1      : '',
            name     : '',
            num      : '',
            num1     : '',
            num2     : '',
            gender   : '',
            email    : '',
            email1   : 'naver.com',
            interest : [],
            intro    : '',
            birth    : ''
        });
        const radio = [
            { value: '남' },
            { value: '여' }
        ];
        const email1 = [
            { value: 'naver.com' },
            { value: 'daum.net' },
            { value: 'google.com' },
        ]
        const interest = [
            { value: 'html' },
            { value: 'css' },
            { value: 'javascript' },
            { value: 'vue' },
        ]

        return {
            state,
            radio,
            email1,
            interest
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width: 800px;
        background-color: aliceblue;
        border: 1px solid #cccccc;
        margin: 0px auto;
        padding: 20px;
    }
    .item {
        
    }
    .lbl {
        display: inline-block;
        width: 100px;
    }
</style>