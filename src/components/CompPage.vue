<template>
    <div>
        <h3>컴포넌트 실습</h3>
        <hr />
        <menu-1-page title="props메뉴1" label="라벨"></menu-1-page> 
        <!-- 3. 적절한 위치에 사용한다 -->
        
        <menu-2-page title="props메뉴2" @myevent="handleNum"></menu-2-page> 
        <!-- 함수 명을 명시해야 하지만 함수 명에 ()넣으니 안받아짐... -->
        
        <menu-3-page>
            <template #output1>
                <p>slot로 전송되는 태그 출력</p>
            </template>

            <template #output2>
                <input type="text" value="aaa"/>
                <button @click="handleOutput2()">전송</button>
            </template>
            <!-- 이건 내가 만든걸 준것...! -->
        </menu-3-page>

        <menu-4-page>
            <template #default="scope">
                {{ scope }}
                <!-- 데이터 잘 오는지 확인 -->
                <input type="text" :value="scope.data.userid"/>
            </template>
            <!-- component 내부(menu4)의 데이터를 받아와서 화면을 만든다음에 다시 넣어줌. input에 받은 데이터를 보여줄수 있음!  -->
            <!-- 3과 4는 데이터의 주체가 다름 -->
        </menu-4-page>
    </div>
</template>

<script>
import Menu1Page from './comp/Menu1Page.vue'; // 1. import 먼저 시킨다
import Menu2Page from './comp/Menu2Page.vue';
import Menu3Page from './comp/Menu3Page.vue';
import Menu4Page from './comp/Menu4Page.vue';

export default {
    // 컴포넌트 문법-> 파스칼(Menu1Page), 케밥(menu-1-page)
    // 스크립트에 등록할때는 파스칼 형태로 등록, 위에 쓸때는 케밥 쓰는걸 권장! template에 모두 소문자라서... 파스칼 써도 동작되긴한다. 
    // 보통 파스칼로 등록하면 케밥형태로 위에 자동으로 떠야한데 안뜨는중.. 익스텐션 vetur 깔아보자.. 뷰 익스텐션 3개 깔았음... 까니까 된다
    components : {
        Menu1Page, // 2. 등록한다
        Menu2Page,
        Menu3Page,
        Menu4Page
    },
    setup () {
        const handleNum = (e) => {
            alert(e);
        };
        // 값을 넣어준 곳은 menu2지만 반응은 comp에서 한것
        const handleOutput2 = () => {
            alert('output2');
        }
        
        return {
            handleNum,
            handleOutput2
        }
    }
}
</script>

<style lang="css" scoped>

</style>