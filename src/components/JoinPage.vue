<template>
    <div class="container">
        <h3>회원 가입</h3>
        {{ user }}
        <div>
            <label class="lbl">아이디</label>
            <el-input type="text" size="small" style="width:200px" ref="uid" v-model="user.userid" @keyup="handleIDCheck()" />
            <label class="lbl" v-html="user.idcheck"></label> 
            <!-- // html태그 작성한것 해석해서 출력 -->
        </div>
        <div>
            <label class="lbl">암호</label>
            <el-input type="password" size="small" style="width:200px" ref="upw" v-model="user.userpw" />
        </div>
        <div>
            <label class="lbl">암호 확인</label>
            <el-input type="password" size="small" style="width:200px" ref="upw1" v-model="user.userpw1" />
        </div>
        <div>
            <label class="lbl">이름</label>
            <el-input type="text" size="small" style="width:200px" ref="uname" v-model="user.username" />
        </div>
        <div>
            <label class="lbl">나이</label>
            <el-input-number size="small" style="width:200px" :min="0" ref="uage" v-model="user.userage" />
        </div>
        <div>
            <label class="lbl">이메일</label>
            <el-input type="text" size="small" style="width:200px" ref="uemail" v-model="user.useremail" />
            <label>@</label>
            <el-select v-model="user.useremail1">
                <el-option v-for="tmp of email" :key="tmp" :value="tmp.value"/>
                <!-- 시키는대로 반복문을 돌려야 하는구만 -->
            </el-select>
        </div>
        <div>
            <el-button type='info' size="small" @click="handleJoin()">회원 가입</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const email = [
            { value : 'google.com' },
            { value : 'naver.com' },
            { value : 'daum.net' }
        ];        
        
        const router = useRouter();

        // 상태변수
        const user = reactive({
            userid      : '',
            userpw      : '',
            userpw1     : '',
            username    : '',
            userage     : 0,
            useremail   : '',
            useremail1  : '이메일 주소 선택',
            
            idcheck     : '<label style="color:#000000">중복 확인</label>'
        });
        
        // 묶어서 표현하고 싶다...어떻게?
        const uid = ref();
        const upw = ref();
        const upw1 = ref();
        const uname = ref();
        const uage = ref();
        const uemail = ref();

        // 함수들
        const handleJoin = async() => {
            if(user.userid === '') {
                alert('아이디를 입력하세요.')
                uid.value.focus();
                return false;
            }
            if(user.userpw === '') {
                alert('암호를 입력하세요.')
                upw.value.focus();
                return false;
            }
            if(user.userpw1 === '') {
                alert('암호를 다시 입력하세요.')
                upw1.value.focus();
                return false;
            }
            if(user.userpw !== user.userpw1) {
                alert('암호를 확인 하세요.')
                upw1.value.focus();
                return false;
            }
            if(user.username === '') {
                alert('이름를 입력하세요.')
                uname.value.focus();
                return false;
            }
            if(user.userage <= 0) {
                alert('나이를 입력하세요.')
                uage.value.focus();
                return false;
            }
            if(user.useremail === '') {
                alert('이메일을 입력하세요.')
                uemail.value.focus();
                return false;
            }
            if(user.useremail1 === '이메일 주소 선택') {
                alert('이메일 주소를 입력하세요.')
                return false;
            }
            // 유효성 성공하면 백엔드 연동
            const url = `/member101/insert.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id      : user.userid,
                pw      : user.userpw,
                name    : user.username,
                email   : `${user.useremail}@${user.useremail1}`, // 변수와 문자를 동시에 입력하고 싶다면 이런 꼴로!
                age     : user.userage
            };
            const { data } = await axios.post(url, body, {headers}); 
            console.log(data);
            if(data.status === 200) {
                alert('회원 가입 성공!');
                router.push({path:'/'});            
            }
        }

        // 아이디를 입력할때 마다 호출되는 함수
        const handleIDCheck = async() => {
            console.log('handleIDCheck');

            // user.idcheck = '중복확인';  이렇게 걸면 else 두개를 생략 가능 하지만 중간중간(백엔드로 왔다갔다 하는 시간차) 중복확인이 떠서 거슬림...
            // 프론트에서 검증 다하고 백엔드로 날리는게 맞다. 아니면 백엔드에서 부하 걸려!
            if(user.userid.length > 0) { // 내용 입력
                const url=`/member101/idcheck.json?id=${user.userid}`;
                const headers={"Content-Type":"application/json"};
                const { data } = await axios.get(url, {headers});
                console.log(data);    
                if(data.status === 200) { // 백엔드 정상적인가?
                    if(data.result === 0) { // 사용 가능 위치
                        user.idcheck = '<label style="color:green">사용 가능</label>';
                    }
                    else if(data.result === 1) { // 사용 불가 위치
                        user.idcheck = '<label style="color:red">사용 불가</label>';
                    }
                }
                else { // 정상적이지 않을 경우 
                    user.idcheck = '<label style="color:#000000">중복 확인</label>';
                }                      
            }
            else { // 내용 입력하지 않음
                user.idcheck = '<label style="color:#000000">중복 확인</label>';
            } 
        };

        // 템플릿에서 사용하기 위한 리턴(변수, 함수 등..)
        return {
            user,
            handleJoin,
            uid,
            upw,
            upw1,
            uname,
            uage,
            uemail,
            handleIDCheck,
            email
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
        padding: 5px;
    }
</style>