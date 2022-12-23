<template>
    <div style="border : 1px solid #cccccc; padding:5px">
        <h3>컴포넌트메뉴4</h3>
        <slot name="default" :data="state"></slot>
        <!-- :data를 쓰면 셋업에 있는 데이터를 부모쪽으로 준다 -->
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const state = reactive({
            userid      : 'aaa',
            username    : 'bbb'
        })
        
        return {
            state
        }
    }
}
</script>

<style lang="css" scoped>

</style>