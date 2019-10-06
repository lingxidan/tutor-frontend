<template>
  <div id="appFront" ref="app">
    <!--导航栏以及轮播图-->
    <div class="top" ref="top">
      <topNav @login="login" @registe="registe"></topNav>
    </div>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <!-- 页脚 -->
    <div class="footer">
      <div class="main">
        <div class="report">
          <ul>
            <li>侵权举报</li>
            <li>有害信息举报</li>
            <li>违法和不良信息举报</li>
          </ul>
        </div>
        <div class="license">
          <ul>
            <li>联系我们</li>
            <li>网络文化经营许可证</li>
            <li>电信与服务业务经营许可证</li>
          </ul>
        </div>
      </div>
      <div class="bottom" @click="manage">师者教师志愿者招募平台 ©2019 </div>
    </div>
  </div>
</template>

<script>
import topNav from './components/common/topNav.vue'
export default {
  name: 'App',
  components: {
    topNav
  },
  mounted(){
  },
  methods:{
    registe(opt){
      console.log(opt)
      this.$router.push('/registe/'+opt)
    },
    login(){
      // let _login = this.panels.login
      // _login.style.display ="block"
      this.$router.push('/login')
    },
    manage(){
      this.$router.push('/back')
    }

  }
  
}
</script>

<style lang="less">
@import '../static/css/main.less';
#appFront {
  width: 100%;
  font-family: @mainFont;
  // font-family: 'liukai';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f6f6f8;
}


div.top {
  width: 100%;
  background:  @mainColor;
}

.footer {
  width: 100%;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: @mainColor;
  .main{
    width: 100%;
    display:flex;
    margin-top: 20px;
    margin-bottom: 5px;
    .report,.license{
      // font-size: 30px;
      width: 48%;
      ul li{
        font-size: 14px;
        height: 24px;
        text-align: left;
        cursor: pointer;
        &:hover{
        font-size: 14px;
        font-weight: bold;
      }
      }
    }
    .report{
      border-right:1px solid @secondColor;
      ul{
        margin-right:20px;
      }
      ul li{
        text-align: right;
      }
    }
    .license{
      ul{
        margin-left:20px;
      }
    }
  }
  .bottom{
    cursor: pointer;
    text-align: center;
    margin-bottom: 5px;
    font-size: 16px;
    font-family: @thirdFont;
    &:hover{
      color: @hoverColor;
    }
  }
}
</style>
