<template>
  <div class="app" ref="app">
    <div class="main">
      <!--导航栏-->
      <div class="top" ref="top">
        <div class="title">
          师者
        </div>
        <el-menu
          :default-active="activeIdx"
          class="el-menu-vertical-demo"
          router>
          <el-menu-item index="/manager/volunteer" @click="toPath('/manager/volunteer')">
            <i class="el-icon-user"></i>
            <span>教资认证</span>
          </el-menu-item>
          <el-menu-item index="/manager/recruiter" @click="toPath('/manager/recruiter')">
            <i class="el-icon-help"></i>
            <span>招募者认证</span>
          </el-menu-item>
          <!-- <el-menu-item index="/manager/school" @click="toPath('/manager/school')">
            <i class="el-icon-school"></i>
            <span>学校</span>
          </el-menu-item>
          <el-menu-item index="/manager/zhiwei" @click="toPath('/manager/zhiwei')">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">职位</span>
          </el-menu-item> -->
          <el-menu-item index="/manager/articles" @click="toPath('/manager/articles')">
            <i class="el-icon-document"></i>
            <span slot="title">文章</span>
          </el-menu-item>
          <el-menu-item index="/manager/posts" @click="toPath('/manager/posts')">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">帖子</span>
          </el-menu-item>
        </el-menu>
        <div class="logout">
          <el-button @click="cancelLogin" icon="el-icon-switch-button" circle></el-button>
        </div>
      </div>
      <div class="content">
        <div class="content-view">
          <router-view/>
        </div>
        <!-- 页脚 -->
        <div class="footer">
          <div class="bottom">师者教师志愿者招募平台 ©2019 </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import topNav from '@/components/common/topNav.vue'
export default {
  name: 'App',
  data(){
    return{
      activeIdx:"/manager/volunteer"
    }
  },
  components: {
    topNav
  },
  mounted(){
    this.activeIdx = this.$route.path
  },
  methods:{
    toPath(path){
      this.$router.push(path)
    },
    cancelLogin(){
      this.$router.push("/back")
    }
  },
  watch:{
    "$route"(to,from){
      this.activeIdx = to.path
    }
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
  div.main{
    display: flex;
    min-height: 100vh;
    .top {
      width: 10%;
      background: @fifthColor;
      display: flex;
      flex-direction: column;
      .title{
        font-size: 4vh;
        margin-top: 2vh;
        font-weight: bolder;
        color: coral;
        // text-shadow: @sixthColor 0 2px 5px;
      }
      .el-menu{
        margin-top: 3vh;
        background: none;
        border-right: none;
        height: 80%;

      }
      .el-menu-item{
        color: #fff;
        text-align: left;
        padding-left: 1vw !important;
        margin-left: 0;
        font-weight: 600;
        border-radius: 1vh 70% 70% 1vh;
        border: 0.1vh solid transparent;
        i{
          width: 1.5vw;
        }
        &:hover{
          color: @mainColor;
        }
      }
      .el-menu-item.is-active{
        background-color: #f6f6f8;
        color: @mainColor;
        // border-radius: 1vh 30% 30% 1vh;
        border: 0.1vh solid coral;
        // border-left-width: 0.5vw;
        border-right: none;
        &::before{
          position: absolute;
          content: "";
          height: 100%;
          width: 0.5vw;
          background-color: coral;
          top: 0;
          left: 0;
        }
      }
      .logout{
        // position: absolute;
        // bottom: 20vh;
      }
    }
    .content{
      position: relative;
      padding:2vh 1vw 0;
      // right: 30px;
      width: 90vw;
      // height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .content-view{
        flex: 1;
        background-color: #fff;
        box-shadow: 0 0 3px 0 @fourthColor;
        .el-dialog__header{
          padding: 2vh 2vw;
          font-size: 3vh;
        }
        .el-dialog__body {
          padding: 1vh 2vw;
          color: #606266;
          font-size: 2vh;
        }
        .el-dialog__footer{
          display: flex;
          justify-content: flex-end;
        }
      }
      .footer {
        width: 100%;
        height: 3vh;
        background-color: inherit;
        .bottom{
          text-align: center;
          // margin-bottom: 1vh;
          line-height: 3vh;
          font-size: 1.5vh;
        }
      }
    }
  }
}

</style>
