//  localhost:8080/login
//  localhost:8080/join

//  localhost:8080/#/login
//  localhost:8080/#/join
//  두가지 방식!

//  cmd에서 설치한 라이브러리를 가져와서 적용
import {   createRouter, createWebHistory   } from 'vue-router';

//  내가 만든 컴포넌트 가져오기
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import JoinPage from '@/components/JoinPage.vue';
import BoardPage from '@/components/BoardPage.vue';
import BoardInsertPage from '@/components/BoardInsertPage.vue';
import BoardContentPage from '@/components/BoardContentPage.vue';
import FormPage from '@/components/FormPage.vue';
import JoinPage1 from '@/components/JoinPage1.vue';
import ImagePage from '@/components/ImagePage.vue';
import ItemPage from '@/components/ItemPage.vue';
import ItemInsertPage from '@/components/ItemInsertPage.vue';
import BoardContent1Page from '@/components/BoardContent1Page.vue'; 
import ItemContentPage from '@/components/ItemContentPage.vue'; 
import MyPage from '@/components/MyPage.vue';
import LogoutPage from '@/components/LogoutPage.vue';
import StorePage from '@/components/StorePage.vue';
import CompPage from '@/components/CompPage.vue';


// [{},{},{}] 자바스크립트이므로 배열형태 인것!
const routes = [
    {path : "/", component:HomePage}, // localhost:8080/ => HomePage

    {path : "/login", component:LoginPage},
    {path : "/join", component:JoinPage}, //localhost:8080/join => JoinPage

    {path : "/mypage", component:MyPage},
    {path : "/logout", component:LogoutPage},

    {path : "/board", component:BoardPage}, 
    {path : "/boardinsert", component:BoardInsertPage},
    {path : "/boardcontent", component:BoardContentPage},
    {path : "/form", component:FormPage},
    {path : "/join1", component:JoinPage1},
    {path : "/image", component:ImagePage},
    {path : "/item", component:ItemPage},
    {path : "/iteminsert", component:ItemInsertPage},
    {path : "/boardcontent1", component:BoardContent1Page},
    {path : "/itemcontent", component:ItemContentPage},
    {path : "/store", component:StorePage},
    {path : "/comp", component:CompPage},

];

const router = createRouter({ //주소 체계를 어떻게 쓸꺼냐.. 샵 없는걸로!
    history : createWebHistory(),
    routes : routes
});

export default router;