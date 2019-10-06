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
      
      <router-view></router-view>
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
.volunteer-menu{
  width: 100%;
  height: 100%;
  .main{
    position: relative;
    padding:20px;
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
.volunteer-menu{
  display: flex;
  .el-menu-vertical-demo{
    width: 8%;
    background-color: transparent;
    // margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-menu-item{
      cursor: pointer;
      width: 100px;
      height: 100px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px;
      padding: 5px !important;
      i{
        font-size: 30px;
      }
      span{
        margin-top: 10px;
        height: 20px;
        line-height: 20px;
      }
    }
    li.is-active{
      background-color: coral;
      font-weight: 800;
    }
  }
}
</style>