<template>
  <div class="selfSch">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      router>
      <el-menu-item index="/user/recr/recruiter" style="padding-left: 0.8vw;">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/school" style="padding-left: 0.8vw;">
        <i class="el-icon-self-edu"></i>
        <span>学校信息</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/job" style="padding-left: 0.8vw;">
        <i class="el-icon-self-gongzuojingyan"></i>
        <span slot="title">招募职位</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/chat" style="padding-left: 0.8vw;">
        <i class="el-icon-self-taolunhui"></i>
        <span slot="title">聊天室</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/articleList" style="padding-left: 0.8vw;">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/postList" style="padding-left: 0.8vw;">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/comment" style="padding-left: 0.8vw;">
        <i class="el-icon-s-comment"></i>
        <span slot="title">我的评论</span>
      </el-menu-item>
      <el-menu-item index="/user/recr/interest" style="padding-left: 0.8vw;">
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
@import '../../../../static/css/main';
.selfSch{
  width: 100%;
  height: 100%;
  .el-menu-vertical-demo{
    // width: 8vw;
    span{
      font-size: 1.6vh;
      letter-spacing: 1px;
      font-weight: bold;
    }
  }
  .main{
    position: relative;
    flex: 1;
    margin: 1.5vh;
    box-shadow: 0 0 2px 0 @sixthColor;
    background-color: #fff;
    min-height: 80vh;
  }
}
</style>
<style lang="less">
@import '../../../../static/css/main';
.selfSch{
  display: flex;
  .el-menu-vertical-demo{
    width: 8%;
    box-shadow: 0 0 2px 0 @sixthColor;
    border-right: none;
    color: @mainColor;
    // background-color: @thirthColor;
    .el-menu-item.is-active{
      background-color: @thirthColor;
      color: @sixthColor;
    }
    span{
      font-size: inherit;
      letter-spacing: 1px;
      font-weight: bold;
    }
    .el-menu-item{
      height: 8vh;
      line-height: 8vh;
      font-size: 1.6vh;
      padding: 0 1.2vw;
      text-align: left;
    }
    .el-menu-item:focus, .el-menu-item:hover{
      background-color: @thirthColor;
      color: @sixthColor;
      i{
        color: @sixthColor;
      }
    }
    .el-menu-item:hover{
      background-color: @thirthColor;
      color: @sixthColor;
    }
    .el-menu-item [class^=el-icon-] {
      margin-right: 0;
      width: 1.6vw;
      text-align: center;
      font-size: 2vh;
      font-weight: bold;
      vertical-align: middle;
    }
  }
}
</style>