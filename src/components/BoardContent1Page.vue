<template>
    <div>
        다음글 이동용 페이지
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        
        const route = useRoute() ;
        const router = useRouter() ;

        const state = reactive({
            no : Number(route.query.no1),
        })
        
        if(state.no === 0) {
            alert('다음글이 없습니다.');
            router.push({path:"/board"});
        }
        else {
            router.push({path:"/boardcontent", query:{no:state.no}});
        }
        
        return {
            state
        }
    }
}
</script>

<style lang="css" scoped>

</style>