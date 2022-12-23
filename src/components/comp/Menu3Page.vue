<template>
    <div style="border : 1px solid #cccccc; padding:5px">
        <h3>컴포넌트메뉴3</h3>
        <slot name="output1"></slot>
        <!-- 출력할 위치 -->
        <hr />
        <slot name="output2"></slot>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>

</style>