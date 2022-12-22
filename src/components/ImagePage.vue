<template>
    <div>
        <h3>image 실습</h3>
        <div v-for="tmp of imgs" :key="tmp" style="display: inline-block;">
            <img :src="tmp.url" style="width: 100px; height: 50px;"/>
        </div>

        <div>
            {{ state }} <br />
            이름   : <input type="text" v-model="state.username" /><br />
            파일   : <input type="file" @change="handleImage($event)" /><br />
            <img :src="state.imageurl" style="width: 50px; height: 50px;" />
            <!-- 이미지 : <input type="file" v-model="state.userfile"/><br />  -->
            <!-- file에는 v-model 못건다! 웹에서 파일은 숫자, 문자처럼 생각하면 안됨. 다르게 처리한다 생각! -->
            <!-- 파일을 선택했을때 밑에 state.userfile에 넣어주는 작업을 해야함 -->
            <!-- 첨부한 상태인지 취소한 상태인지를 먼저 알아야 한다. event로 따지면 change될때! 파일이 변화될때 -->
            <!-- this역할이 $event -->
            <!-- :src="state.imageurl"를 찍으면 밑에 있는 정보를 찍는것. 그냥 src="state.imageurl"는 문자 그대로 들어가는것! 밑에 있는 변수 쓸꺼면 : 빼먹지마! -->
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup () {
        //[{},{},{}] => read로 사용
        const imgs = [ // 바뀌는 변수가 아니라서 reactive 안쓴것
            { url : require('../assets/imgs/mango.png') }, // 파일 가져올때는 require를 넣어야함. ../ 는 현재 기준으로 한단계 위로 올라가는것
            { url : require('../assets/imgs/orange.jpg') },
            { url : 'https://picsum.photos/500/300?image=1'} // 웹에 있는 이미지는 주소 그대로 넣기
        ];

        // read, writer로 사용. 사용자가 입력하면 바뀜!
        const state = reactive({
            username : '',
            userfile : null, // 보여지는거는 imageurl이지만 실제 백엔드로 보내주는 역할은 usefile이 하는것!!
            imageurl : require('../assets/imgs/logo.png'), // 아무것도 안했을때 기본으로 뜨는 이미지
        });

        const handleImage = (e) => { //$event를 e로 받은것
            // {0: File, length: 1}
            console.log('handleImage', e.target.files); // target 밑에 files 안에서 첨부했을때, 안했을때 확인할수 있다.
            if(e.target.files.length > 0) { // 첨부 선택
                state.userfile = e.target.files[0];
                // URL.createObjectURL => 크롬내부에 가상의 이미지 url을 만드는것
                // blob:가상의 주소 생성
                state.imageurl = URL.createObjectURL( e.target.files[0] ); 
            }
            else { // 첨부 취소
                state.userfile = null;
                state.imageurl = require('../assets/imgs/logo.png');
            }
        }

        return { 
            imgs, 
            state,
            handleImage 
        }
    }
}
</script>

<style lang="css" scoped>

</style>