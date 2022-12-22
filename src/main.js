import { createApp } from 'vue'
import App from './App.vue'

// 내가 만든 폴더의 파일 가져오기
import routes from './routes/index';
import stores from './stores/index';

//createApp(App).mount('#app'); 
const app = createApp(App);
// vue에서 사용한다고 등록
app. use(routes);
app. use(stores);

app. mount('#app');