<template>
  <div>
    {{ state }}
    <hr />
    <!-- 공통으로 나오는 항목 -->
    <router-link to='/'><button>홈으로</button></router-link><!-- a태그 -->

    <div v-if="state.logged === false" style="display: inline-block;">
      <router-link to='/login'><button>로그인</button></router-link>
      <router-link to='/join'><button>회원가입</button></router-link>
    </div>

    <div v-if="state.logged === true" style="display: inline-block;">
      <router-link to='/mypage'><button>마이페이지</button></router-link>
      <router-link to='/logout'><button>로그아웃</button></router-link>
    </div>

    <router-link to='/board'><button>게시판</button></router-link>
    <router-link to='/form'><button>Form 실습</button></router-link>
    <router-link to='/join1'><button>Join 실습</button></router-link>
    <router-link to='/image'><button>Image 실습</button></router-link>
    <router-link to='/item'><button>물품목록</button></router-link>
    <router-link to='/store'><button>store 실습</button></router-link>
    <router-link to='/comp'><button>comp 실습</button></router-link>
    <hr />
    <!-- 컴포넌트 부분을 넣어주는 역할 -->
    <router-view></router-view>
    <!-- 여기에 footer 넣어도 교체안됨! -->
    <footer>
      <hr />
      footer
    </footer>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup () {
    // 컴포넌트별 공용변수 사용하기 위해
    const store = useStore();

    const state = reactive({
      logged : computed(() => store.getters.getLogged ),
      counter : computed(() => store.getters.getCounter ),
    })

    return {state}
  }
}
</script>

<style lang="css" scoped>

</style>