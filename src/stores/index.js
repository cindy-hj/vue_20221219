    // 생긴꼴은 라우터와 비슷~
    import { createStore } from 'vuex';
    
    // LoginPage.vue 컴포넌트에서 로그인된 정보를 App.vue로 실시간으로 알려줘야함
    // LogoutPage.vue 컴포넌트에서 로그아웃된 정보를 App.vue로 실시간으로 알려줘야함

    const stores=createStore ({
        // 컴포넌트 별 공유하는 변수
        // 저장소의 토큰값을 가져와서 true, false
        /*state : {
            // :를 찍고 {} 안에는 변수로 인식해서 if, for문 같은 문법 입력이 안됨..! 문법을 넣고 싶으면 아래와 같이 작성
            logged  : false,
            counter : 10
        }*/
        
        // 새로고침 하더라도 로그인 상태 유지하고 싶다!
        state() {
            let tmp = false;
            if(sessionStorage.getItem("TOKEN") !== null){
                tmp = true;
            }
            return {
                logged  : tmp,
                counter : 10 // 여러개 쓸수 있다고 보여주기 위한것. 실습에만 이용
            }
        },

        // App.vue 컴포넌트에서 사용 예정. 가져감!
        getters : {
            getLogged(state) {
                return state.logged;
            },
            getCounter(state) {
                return state.counter;
            }
        }, 

        // 로그인, 로그아웃 컴포넌트에서 사용 예정
        mutations : {
            setLogged(state, value) {
                state.logged = value
            },
            setCounter(state , val) { // counter에 새로운 값을 줌
                state.counter = val;
            },
            setCounterPlus(state) { // counter 값에 +1씩
                state.counter++;
                // state.counter = state.counter +1;
            },
            setCounterMinus(state) { // counter 값에 -1씩
                state.counter--;
            }
        }

    });

    export default stores;