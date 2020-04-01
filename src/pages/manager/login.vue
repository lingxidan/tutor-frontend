<template>
  <div ref="login" class="managerLogin">
    <div class="content">
      <div class="title">
        师者教师志愿者招募平台后台管理
      </div>
      <el-form class="form" ref="form" :model="loginForm" label-width="80px">
        <el-form-item label="登录名">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input type="password" v-model="loginForm.pass"></el-input>
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
        this.$router.push('/manager/volunteer')

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
@import "../../../static/css/main";
.managerLogin{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  
  background: linear-gradient(60deg,@mainColor 33.3%, #fce9c7 0, #fce9c7 67%,#fff 0); 
  .content{
    background-color: rgba(252, 252, 252, 0.8);
    width: 35%;
    padding: 6vh 0;
    // box-shadow: -10px 10px 10px 0px #fba400;
    .title{
      width: 100%;
      font-size: 4vh;
      font-weight: bold;
      margin-bottom: 3vh;
      // background-color: rgba(252, 252, 252, 0.5);
      // padding: 5px 20px;
    }
    .form{
      margin-left: 3vw;
      margin-right: 3vw;
      width: 80%;
    }
  }
  .el-form-item .el-form-item__content .el-input .el-input__inner{
    background-color: rgba(0, 0, 0, .1);
    border: none;
    border-radius: 0;
    color: @mainColor;
  }
  .el-button{
    border-radius: 0;
    padding: 2vh 3vw;
    font-size: 2vh;
    line-height: 2vh;
    border: none;
    letter-spacing: 2px;
    &:hover{
      background-color: @thirthColor;
    }
  }
  .el-button+.el-button{
    background-color: @sixthColor;
    color: @mainColor;
    &:hover{
      background-color: @fifthColor;
    }
  }
}
</style>