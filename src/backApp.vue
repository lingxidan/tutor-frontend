<template>
  <div class="app" ref="app">
    <div class="main">
      <!--导航栏-->
      <div class="top" ref="top">
        <div class="title">
          师者
        </div>
        <el-menu
          default-active="/manager/volunteer"
          class="el-menu-vertical-demo"
          background-color="#2b261e"
          text-color="#fce9c7"
          active-text-color="#fba400"
          router>
          <el-menu-item index="/manager/volunteer">
            <i class="el-icon-user"></i>
            <span>教资认证</span>
          </el-menu-item>
          <el-menu-item index="/manager/recruiter">
            <i class="el-icon-help"></i>
            <span>招募者认证</span>
          </el-menu-item>
          <el-menu-item index="/manager/school">
            <i class="el-icon-school"></i>
            <span>学校</span>
          </el-menu-item>
          <el-menu-item index="/manager/zhiwei">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">职位</span>
          </el-menu-item>
          <el-menu-item index="/manager/articles">
            <i class="el-icon-document"></i>
            <span slot="title">文章</span>
          </el-menu-item>
          <el-menu-item index="/manager/posts">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">帖子</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view/>
        <!-- 页脚 -->
        <div class="footer">
          <div class="bottom">师者教师志愿者招募平台 ©2019 </div>
        </div>
      </div>

    </div>
    <!-- <img src="./assets/logo.png"> -->
  </div>
</template>

<script>
import topNav from '@/components/common/topNav.vue'
export default {
  name: 'App',
  components: {
    topNav
  },
  methods:{
    registe(opt){
      console.log(opt)
      this.$router.push('/manager/school')
    },
    login(){
      let _login = this.panels.login
      _login.style.display ="block"
      // this.$router.push('/login')
    },

  }
  
}
</script>

<style lang="less">
@import '../static/css/main.less';
.app {
  width: 100%;
  height: 100%;
  font-family: @mainFont;
  // font-family: 'liukai';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

div.main{
  display: flex;
  .top {
    width: 10%;
    background:  #2b261e;
    .title{
      font-size: 30px;
      margin-top: 10px;
      font-weight: bolder;
      color: white;
      text-shadow: @secondColor 0 0 5px;
    }
  }
  .content{
    position: relative;
    padding:20px 30px 20px 20px;
    // right: 30px;
    width: 86%;
    height: 100%;
  }
}
.footer {
  width: 100%;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: inherit;
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
    text-align: center;
    margin-bottom: 5px;
    font-size: 16px;
    font-family: @thirdFont;
  }
}
</style>
