<template>
    <div style="border : 1px solid #cccccc; padding:5px">
        <h3>{{ state.title }}</h3>
        <input type="text" v-model="state.num"/>
        <button @click="handleClick()">전송</button>
    </div>
</template>

<script>
import { reactive } from 'vue';


export default {
    props : {
        title : {
            type : String,
            default : '메뉴2제목'
        }
    },
    setup ( props, context ) {
        const state = reactive({
            title : props.title,
            num : 10,
        });

        const handleClick = () => {
            // alert(state.num);
            // 부모컴포넌트의 특정 이벤트 발생(이벤트명, 전송값)
            context.emit('myevent', state.num);
        }

        return {
            state,
            handleClick
        }
    }
}
</script>

<style lang="css" scoped>

</style>