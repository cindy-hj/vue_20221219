<template>
    <div>
        {{ state }}
        <h3>form 실습</h3>
        
        <input type="text" :value="state.value" /><br />
        <!-- // 문자 그대로 출력 -->
        <p>{{ state.value }}</p> 
        <!-- // 문자 그대로 출력 -->
        <p v-text="state.value"></p> 
        <!-- //태그가 해석 되서 출력 -->
        <p v-html="state.value"></p> 

        <hr />
        <!-- checkbox 일일히 쓰지 말고 반복문 돌림. 4번 반복됨. -->
        <div v-for="tmp of checklist" :key="tmp" style="display: inline-block">
            <input type="checkbox" :value="tmp.value" v-model="state.check"/>{{ tmp.text }}
                <!-- : 이거 빠지니까 모든 값이 하나로 묶여서 체크됨 -->
                <!-- <input type="checkbox" value="A" /> A -->
                <!-- div 문단이 4번 반복된것 -->
        </div> 
        <hr />

        <select v-model="state.select">
            <option v-for="tmp of checklist" :key="tmp" :value="tmp.value">{{ tmp.value }}</option>
        </select> 
        <hr />
        
        <!-- 여러개 선택할 수 있게 옵션으로 준것. ctrl키로 여러개 선택 가능. -->
        <select v-model="state.select1" multiple> 
            <option v-for="tmp of checklist" :key="tmp" :value="tmp.value">{{ tmp.value }}</option>
        </select> 
        <hr />

        <div v-for="tmp of checklist" :key="tmp" style="display: inline-block;">
            {{ tmp.value }}<input type="radio" :value="tmp.value" v-model="state.radio"/> 
            <!-- name으로 안묶어도 되네? -->
        </div> 
        <hr />

        

    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup () {
        // 읽기 [{},{},{},{}]
        const checklist = [
            {  value:'A', text:'에이' },
            {  value:'B', text:'비' },
            {  value:'C', text:'씨' },
            {  value:'D', text:'디' }
        ];

        // 상태 변수(읽고 쓰기) -> v-model을 사용해서 사용자가 입력한 값 실시간으로 받아서 백엔드로 보낼 수 있음.
        // 위에 {{ state }}로 실시간으로 입력 되는 값 확인 가능.
        const state = reactive({
            value   : '<p>태그</p>',
            check   : ['B'], // 체크박스용 여러개 값 보관
            // 미리 체크 해놓고 싶은 값을 입력. 없으면 전부 체크 안되있음.
            select  : '', // ''는 하나의 값 보관
            select1 : [] , // []는 여러개 값 보관
            radio   : '', //라디오 용 하나의 값 보관
        });

        return {
            state,
            checklist,
        }
        
    }
}
</script>

<style lang="css" scoped>

</style>