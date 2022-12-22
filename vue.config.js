// npm run serve => 호출할때만 읽어서 수행함. 호출하고 수정했으면 다시 호출해줘야 바꾼 내용 반영됨. (환경설정파일은 서버를 재구동해야한다)
// 컨트롤씨 두번해서 중지 시키고 npm run serve로 다시 서버 돌림.

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, 
  
  devServer : {
    // 백엔드 서버 위치 : 프론트에서 주소를 생략하고 '/board101로 시작하면 실제로는 target에 있는 주소를 앞에 붙여서 시행하라는 뜻

    proxy : {
      '/board101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      '/item101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      '/member101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      }
    }
  }
})
