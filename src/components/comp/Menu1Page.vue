<template>
    <div style="border : 1px solid #cccccc; padding:5px">
        <h3>{{ state.title }}</h3>
        <label>{{ state.label }}</label>
    </div>
</template>

<script>
import { reactive } from 'vue';


export default {
    props: { // 사용하는 컴포넌트(부모 컴포넌트)에서 전달되는 값 설정
        title : {
            type : String,
            default : 'Menu1컴포넌트' // 부모에서 안주면 띄우는 기본값
        },
        label : {
            type : String,
            defalut : ''
        }
    
    },
    setup ( props ) {
        const state = reactive({
            title : props.title,
            label : props.label
        });
        

        return {
            state
        }
    }
}
</script>

<style lang="css" scoped>

</style>