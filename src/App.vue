<template>
  <div>
    <!-- 공통으로 나오는 항목 -->
    <router-link to='/'><button>홈으로</button></router-link><!-- a태그 -->
    <router-link to='/login'><button>로그인</button></router-link>
    <router-link to='/join'><button>회원가입</button></router-link>
    <router-link to='/board'><button>게시판</button></router-link>
    <router-link to='/form'><button>Form 실습</button></router-link>
    <router-link to='/join1'><button>Join 실습</button></router-link>
    <router-link to='/image'><button>Image 실습</button></router-link>
    <router-link to='/item'><button>물품목록</button></router-link>
    <hr />
    <!-- 컴포넌트 부분을 넣어주는 역할 -->
    <router-view></router-view>
    <!-- 여기에 footer 넣어도 교체안됨! -->
    <hr />
    footer
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