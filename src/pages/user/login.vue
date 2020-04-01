<template>
  <div class="login" ref="login">
    <div class="title">
      师者教师志愿者招募平台
    </div>
    <div class="form-out-cont">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="32px" class="form-cont">
        <div class="login-form-middle">
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" autocomplete="off" placeholder="邮箱/手机号/身份证号">
              <i slot="prepend" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" @keyup.enter.native="login" placeholder="请输入密码">
              <i slot="prepend" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <!-- <el-form-item class="registe"> -->
          <!-- </el-form-item> -->
          <el-form-item>
            <el-button class="btn" type="primary" @click="login">登录</el-button>
            <el-button class="btn" type="primary" @click="cancel">取消</el-button>
          </el-form-item>
        </div>
        <p>没有账号？
          <label class="registe" @click="registe(1)">我想支教</label>
          <label class="registe" @click="registe(2)">招募教师</label>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() { 
    return {
      ruleForm: {
        user: '',
        pass: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  props: {

  },
  components:{
  },
  mounted() {
    // let screenWidth = document.documentElement.clientHeight || document.body.clientHeight
    // this.$refs.login.style.height = screenWidth + "px"
  },
  methods:{
    cancel(){
      this.$router.push('/')
    },
    registe(flag){
      if(flag==1){
        this.$router.push('/registe/volunteer')
      }
      if(flag==2){
        this.$router.push('/registe/recruiter')
      }
    },
    login(){
      let _this=this
      let params={
        name:this.ruleForm.user,
        password:this.ruleForm.pass
      }
      this.$request.login(params).then(
        res=>{
          if(res.data){
            let userId =res.data.id
            this.$store.commit('user', res.data);
            sessionStorage.setItem("user",JSON.stringify(res.data))
            // // 志愿者
            if(res.data.userType == 1){
              this.$router.push('/user/vol/volunteer')
            }
            if(res.data.userType == 2){
              this.$router.push('/user/recr/recruiter')
            }
          }else{
            this.$message.error("用户名或密码错误")
          }
        }
      )
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.login{
  width: 100%;
  height: 100vh;
  position: relative;
  background:url('../../../static/img/login_bc.jpg');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  &::before {
    content:'';
    position:absolute;
    background:url('../../../static/img/login_bc.jpg');
    background-position: center;
    background-size: cover;
    top:0;
    right:0;
    bottom:0;
    left:0;
    -webkit-filter:blur(5px);
    filter:blur(5px);
  }
  .title{
    position: absolute;
    width: 100%;
    height: 10vh;
    top: 10%;
    line-height: 10vh;
    font-size: 6vh;
    color: white;
    letter-spacing: 5px;
    font-weight: bolder;
    text-shadow: 3px 3px 2px @fourthColor;
    background-color: @thirthColor;
  }
  .form-out-cont {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
    background-color:rgba(255,255,255,.5);
    box-shadow:0 0 5px 0 #eee;
    width: 60vh;
    height: 40vh;
    padding-top: 3vh;
  }
  .form-cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    // padding-top: 1.5rem;
    border-radius: 5px;
    height: 90%;
    align-items: center;
    justify-content: center;
    .login-form-middle{
      width: 80%;
      height: 80%;
    }
    p{
      color: @secondColor;
      label{
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
        &:hover{
          color: #fff;
        }
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../static/css/main';
.login{
  .el-form-item{
    .el-form-item__content{
      .el-input{
        height: 6vh;
        line-height: 6vh;
        font-size: 1.7vh;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-input-group__prepend{
          padding: 0;
          width: auto;
          border: none;
          display: block;
          background-color: @mainColor;
          color: #fff;
          .el-input__icon{
            height: inherit;
            line-height: inherit;
            font-size: inherit;
            width: 4vw;
          }
        }
        .el-input__inner{
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          padding: 0 1vw;
          border: none;
        }
      }
      .el-button{
        height: 5vh;
        line-height: 5vh;
        font-size: 1.7vh;
        padding: 0;
        width: 40%;
        background-color: @mainColor;
        letter-spacing: 2px;
        border: none;
        &:hover{
          background-color: @thirthColor;
        }
      }
      .el-form-item__error{
        width: 100%;
        top: 110%;
        padding: 0;
        text-align: right;
        font-size: 1.5vh;
        font-weight: bold;
      }
    }
  }
}
</style>