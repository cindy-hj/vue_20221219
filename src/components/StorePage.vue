<template>
    <div>
        <h3>store 실습</h3>
        <input type="number" v-model="state.num"/>
        <button @click="handleFunc1()">입력한 값으로 변경하기</button>
        <button @click="handleFunc2()">기본 숫자에서 1증가 시키기</button>
        <button @click="handleFunc3()">기본 숫자에서 1감소 시키기</button>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup () {
        const store = useStore();
        const state = reactive({
            num: '10',
            counter : computed(() => store.getters.getCounter ),
            // 바뀐 값을 바로 보여주고싶으면 App에서 가져와서 쓴것 처러 computed 해야함! import하는것 잊지마
        })

        const handleFunc1 = () => {
            store.commit('setCounter', state.num);
        };

        const handleFunc2 = () => {
            store.commit('setCounterPlus');
            state.num = state.counter;
        };

        const handleFunc3 = () => {
            store.commit('setCounterMinus')
            state.num = state.counter;
        } ;

        return {
            state,
            handleFunc1,
            handleFunc2,
            handleFunc3
        }
    }
}
</script>

<style lang="scss" scoped>

</style>