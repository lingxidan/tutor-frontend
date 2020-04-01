<template>
<div id="appFront" ref="appFront">
  <!--导航栏以及轮播图-->
  <div class="top" ref="top">
    <topNav @login="login" @registe="registe"></topNav>
  </div>
  <div class="main-body" ref="mainBody">
    <router-view />
  </div>
  <!-- <img src="./assets/logo.png"> -->
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
    <div class="bottom" @click="manage">师者教师志愿者招募平台 ©2020 </div>
  </div>
  <div class="user-mask" v-if="!user.id">
    <span>登录以查看更多信息</span>
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
  data(){
    return{
      user:{}
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
  },
  methods: {
    registe(opt) {
      this.$router.push('/registe/' + opt)
    },
    login() {
      // let _login = this.panels.login
      // _login.style.display ="block"
      this.$router.push('/login')
    },
    manage() {
      this.$router.push('/back')
    }

  },
  watch: {
    '$route'(to,from) {
      this.user = JSON.parse(sessionStorage.getItem('user'))||{};
      window.scrollTo(0,0);
    }
  },

}
</script>

<style lang="less">
@import '../static/css/main.less';

#appFront {
  position: relative;
  width: 100%;
  font-family: @mainFont;
  // font-family: 'liukai';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f8f8;
  div.top {
    width: 100%;
    background: @mainColor;
  }
  .footer {
    width: 100%;
    padding-top: 1vh;
    padding-bottom: 1vh;
    background-color: @sixthColor;
    .main {
      width: 100%;
      display: flex;
      margin-top: 1vh;
      margin-bottom: 0.5vh;
      .report,
      .license {
        width: 48%;

        ul li {
          font-size: 1.5vh;
          height: 2.7vh;
          text-align: left;
          cursor: pointer;

          &:hover {
            font-size: 1.6vh;
            font-weight: bold;
          }
        }
      }

      .report {
        border-right: 1px solid @mainColor;
        ul {
          margin-right: 1vw;
        }
        ul li {
          text-align: right;
        }
      }
      .license {
        ul {
          margin-left: 1vw;
        }
      }
    }

    .bottom {
      cursor: pointer;
      text-align: center;
      font-size: 1.8vh;
      font-family: @thirdFont;

      &:hover {
        color: @thirthColor;
      }
    }
  }
  .user-mask{
    width: 100%;
    bottom: 0;
    height: 80%;
    position: absolute;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top,#ccc, transparent);
    span{
      // position: absolute;
      // margin-top: 10vh;
      // bottom: 30%;
      height: 20vh;
      line-height: 20vh;
      width: 100%;
      background-color: rgba(255,255,255,0.8);
      // border: 0.2vh solid @secondColor;
      font-size: 4vh;
    }
  }
}

::-webkit-scrollbar-track {
  background-color: @sixthColor;
}
::-webkit-scrollbar {
  width: 0.4vw;
}
::-webkit-scrollbar-thumb {
  background-color: @thirthColor;
}
</style>
