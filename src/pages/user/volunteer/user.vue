<template>
  <div class="volunteer-menu">
    
      <!-- text-color="#fff"
      background-color="#4b3613"
      active-text-color="#fce9c7" -->
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      active-text-color="#fce9c7"
      router>
      <el-menu-item index="/user/vol/volunteer">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/user/vol/chat">
        <i class="el-icon-self-taolunhui"></i>
        <span slot="title">聊天室</span>
      </el-menu-item>
      <el-menu-item index="/user/vol/articleList">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/user/vol/postList">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="/user/vol/comment">
        <i class="el-icon-s-comment"></i>
        <span slot="title">我的评论</span>
      </el-menu-item>
      <el-menu-item index="/user/vol/interest">
        <i class="el-icon-star-off"></i>
        <span slot="title">收藏关注</span>
      </el-menu-item>
    </el-menu>
    <div class="main">
      
      <router-view class="main-view"></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'volunteer-menu',
  data() { 
    return {

    }
  },
  props: {

  },
  components:{
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
@import '../../../../static/css/main';
.volunteer-menu{
  width: 100%;
  height: 100%;
  .main{
    position: relative;
    // padding:1vh;
    // right: 30px;
    width: 100%;
    // height: 150%;
    margin: 0.5vh auto;
    // background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .main-view{
      width: 80%;
      // background-color: #fff;
    }
  }
}
</style>
<style lang="less">
@import '../../../../static/css/main';
.volunteer-menu{
  display: flex;
  .el-menu-vertical-demo{
    position: fixed;
    width: 8%;
    background-color: transparent;
    border-right: none;
    // margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    .el-menu-item{
      box-shadow: 0 0 6px 0 @sixthColor;
      cursor: pointer;
      width: 7vw;
      height: 7vw;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0.5vh;
      padding: 5px !important;
      i{
        font-size: 4vh;
        margin-right: 0;
        width: 2vw;
        height: 2vw;
      }
      span{
        margin-top: 1.5vh;
        height: 3vh;
        line-height: 3vh;
        font-size: 2vh;
      }
    }
    li.is-active{
      background-color: coral;
      font-weight: 800;
    }
  }
}
</style>