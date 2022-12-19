<template>
    <div class="container">
        <h3>게시판 글쓰기</h3>
        <hr />
        
        <div class="item">
            <label class="lbl">제목</label>
            <input type="text" v-model="write.title" />
        </div>
        
        <div class="item">
            <label class="lbl">내용</label>
            <textarea rows="6" cols="22" style="resize: none;" v-model="write.content"></textarea>
        </div>

        <div class="item">
            <label class="lbl">작성자</label>
            <input type="text" v-model="write.writer" />
        </div>

        <div class="item">
            <label class="lbl"></label>
            <button @click="handleWrite()">글쓰기</button>
        </div>

    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {
        const write = reactive({
            title   : '',
            content : '',
            writer  : ''
        });

        const handleWrite = async() => {
            const url = 'http://1.234.5.158:23000/board101/insert.json' ;
            const headers = {"Content-Type":"application/json"} ;
            const body = {
                title   : write.title,
                content : write.content,
                writer  : write.writer
            };
            const { data } = await axios.post( url, body, {headers} )
            console.log(data);

            if(data.status === 200 ) {
                window.location.href="http://localhost:8080/board";    
            }
        }

        return {
            write,
            handleWrite
        }
        
    }

}
</script>

<style lang="css" scoped>
    .container{
        width   : 600px;
        margin  : 0px auto;
        border  : 3px solid #e6ffef;
        padding : 20px;
    }
    .item {
        margin  : 10px;
    }
    .lbl {
        display : inline-block;
        width   : 100px;
    }

</style>