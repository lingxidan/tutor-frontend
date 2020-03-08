<template>
  <div ref="login" class="login">
    <div class="content">
      <div class="title">
        师者教师志愿者招募平台后台管理
      </div>
      <el-form class="form" ref="form" :model="loginForm" label-width="80px">
        <el-form-item label="登录名">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="loginForm.pass"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:"login",
  data(){
    return {
      loginForm:{
        name:"",
        pass:""
      }
    }
  },
  mounted(){
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.login.style.height = clientHeight + "px"
  },
  methods:{
    onSubmit(){
      if(this.loginForm.name=="admin"&&this.loginForm.pass=="admin"){
        this.$router.push('/manager/school')

      }
    },
    onCancel(){
      // console.log("登录成功")
      this.$router.push('/')
    },
  }
}
</script>

<style lang="less">
.login{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  
  background: linear-gradient(60deg,#fba400 33.3%, #fce9c7 0, #fce9c7 67%,#fff 0); 
  .content{
    background-color: #fff;
    width: 35%;
    padding: 30px 0;
    box-shadow: -10px 10px 10px 0px #fba400;
    .title{
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 30px;
      background-color: rgba(252, 252, 252, 0.9);
      // padding: 5px 20px;
    }
    .form{
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
</style>