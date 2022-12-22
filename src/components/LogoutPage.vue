<template>
    <div>
        <!-- 화면을 안만들어서 화면은 따로 뜨지 않고 알림만 뜸 -->
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {

        const store = useStore();
        const router = useRouter();

        // 페이지 로딩될때
        onMounted(()=> {
            if(confirm('로그아웃 할까요?')) {
                sessionStorage.removeItem("TOKEN"); // 토큰이 키!
                store.commit('setLogged', false);
            }
            router.push({path:'/'})
        });

        return {

        };
    }
}
</script>

<style lang="css" scoped>

</style>