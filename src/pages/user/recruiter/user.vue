<template>
  <div class="selfSch">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      text-color="#fff"
      background-color="#4b3613"
      active-text-color="#fce9c7"
      router>
      <el-menu-item index="/user/recr/recruiter">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/school">
        <i class="el-icon-self-edu"></i>
        <span>学校信息</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/job">
        <i class="el-icon-self-gongzuojingyan"></i>
        <span slot="title">招募职位</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/chat">
        <i class="el-icon-self-taolunhui"></i>
        <span slot="title">聊天室</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/articleList">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/postList">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/comment">
        <i class="el-icon-s-comment"></i>
        <span slot="title">我的评论</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/interest">
        <i class="el-icon-star-off"></i>
        <span slot="title">收藏关注</span>
      </el-menu-item>
    </el-menu>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selfSch',
  data() { 
    return {

    }
  },
  props: {

  },
  computed:{
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
.selfSch{
  width: 100%;
  height: 100%;
  // background-color: #fff;
  i{
    // color: ;
  }
  .el-menu-vertical-demo{
    width: 10%;
    padding:5px 0;
    span{
      font-size: 14px;
      letter-spacing: 1px;
      font-weight: bold;
    }
    el-menu-item{
      height: 80px;
    }
  }
  .main{
    position: relative;
    padding:40px 30px 20px 60px;
    // right: 30px;
    width: 85%;
    // height: 150%;
    margin: 20px;
    box-shadow: 0 0 10px 0 #eeeeff;
    background-color: #fff;
  }
}
</style>
<style lang="less">
.selfSch{
  display: flex;
  .el-menu-vertical-demo > i{
    color: #fff;
  }
  .el-menu-vertical-demo{
    width: 8%;
    // height: 100vh;
    padding:5px 0;
    .el-menu-item.is-active{
      background-color: #4b3613;
    }
    span{
      font-size: 16px;
      letter-spacing: 1px;
      font-weight: bold;
    }
    el-menu-item{
      height: 80px;
    }
  }
}
</style>