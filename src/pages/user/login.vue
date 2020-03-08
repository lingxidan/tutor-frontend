<template>
  <div class="login" ref="login">
    <div class="title">
      知识就是力量
    </div>
    <div class="form-out-cont">
      <el-button class="cancel" @click="cancel">X</el-button>
      <div class="login-form-top">
        <div class="text">师者教师志愿者招募平台</div>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="32px" class="form-cont">
        <div class="login-form-middle">
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" autocomplete="off" placeholder="邮箱/手机号">
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
          <el-form-item class="btn">
            <el-button style="width:100%" type="primary" @click="login">登录</el-button>
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
    let screenWidth = document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.login.style.height = screenWidth + "px"
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
      console.log(this.ruleForm)
      let _this=this
      let params={
        name:this.ruleForm.user,
        password:this.ruleForm.pass
      }
      this.$request.login(params).then(
        res=>{
          console.log(res)
          let userId =res.data.id
          console.log(userId)
          _this.$request.getRecuriter({userId}).then(
            res=>{
              this.$store.commit('user', res.data);
              sessionStorage.setItem("user",JSON.stringify(res.data))
              this.$router.push('/user/recr/recruiter')
            },
            error=>{
              _this.$request.getVolunteer({userId}).then(
                res=>{
                  sessionStorage.setItem("user",JSON.stringify(res.data))
                  this.$store.commit('user', res.data);
                  this.$router.push('/user/vol/volunteer')
                }
              )
            }
          )
          // 
        }
      )
      console.log(this.$store.state.user)
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.login{
  position: relative;
  background:url('../../../static/img/login_bc.jpg') 0 / cover;
  // background: url('../../../static/img/login_bc.jpg') no-repeat;
  background-position: center;
  // background-size: cover;
  overflow: hidden;
  .cancel{
    font-size: 16px;
    padding: 5px;
    width: 30px;
    height: 30px;
    position: absolute;
    // border-color: #fff;
    border: none;
    background-color: transparent;
    top: 10px;
    right:10px;
    // right:0;
    // left: 180px;
    color: @mainColor;
    &:hover{
      color: @thirthColor;
      // background-color:@thirthColor;
    }
  }
  .title{
    position: absolute;
    width: 100%;
    height: 80px;
    top:10%;
    // background-color: rgba(252,233,199,0.8);
    // background-color: rgba(250,184,62,0.5);
    // background-color: rgba(251,164,0,0.6);
    // background-color: rgba(255,255,255,1);
    line-height: 80px;
    font-size: 40px;
    color: white;
    letter-spacing: 5px;
    font-weight: bolder;
    text-shadow: 3px 3px 2px @thirthColor;
  }
  .form-out-cont {
    display:flex;
    flex-direction:column;
    align-items:center;
    // justify-content:center;
    position: relative;
    // width: 25rem;
    // height: auto;
    border-radius: 10px;
    margin:0 auto;
    top:46%;
    // margin-top: 50%;
    transform: translateY(-50%);
    background-color:rgba(255,255,255,.1);
    box-shadow:0 0 10px 0 #eee;
    width:60vh;
    height:40vh;
  }
  .form-top-button {
    width: 100%;
    height: 3.2rem;
    // margin-bottom: 1.25rem;
    // border: 2px solid #64bee3;
    border-radius: 5px;
  }
  .form-top-button span {
    font-size: 1rem;
    line-height: 3.2rem;
    display: inline-block;
    width: 100%;
    text-align: center;
    // color: #64bee3;
  }
  .form-cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding-top: 1.5rem;
    border-radius: 5px;
    // background-color: rgba(255, 255, 255, 1);
    // background-color: rgba(250,184,62,1);
    // background-color: rgba(252,233,199,0.7);
    justify-content: space-between;
    // margin-left:20px;
    // margin-right:20px;
  }
  .login-form-top {
    margin-top:30px;
    font-size: 1.25rem;
    text-align: center;
    // color: #64bee3;
    // margin-bottom: 30px;
    font-weight: bold;
    font-size: 30px;
  }
  .login-form-middle {
    padding: 1rem 2rem 0rem 0rem;
    .btn{
      margin-top:50px;
    }
  }
  .form-cont .text {
    font-size: .8rem;
    width: 100%;
    text-align: center;
    color:@secondColor;
    text-shadow: 0 0 3px white;
    letter-spacing: 2px;
    // color: white;
  }
  .registe{
    height: 10px;
    line-height: 10px;
    font-size: 13px;
    margin-bottom: 5px;
    text-decoration: underline;
    cursor: pointer;
    &:hover{
      color: @thirthColor;
    }
  }
}
// .login:before{
//   content: "";
//   position: absolute;
// }
</style>
<style lang="less">
@import '../../../static/css/main';
.login{
  position:relative;
  width:100%;
  height:100%;
	// margin:0 auto;
	// padding:1em;
	// max-width:23em;
	// background:hsla(0,0%,100%,.25) border-box;
	overflow:hidden;
	// border-radius:.3em;
	box-shadow:0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6);
	text-shadow:0 1px 1px hsla(0,0%,100%,.3);
  .el-input__inner{
    height: 5vh;
    // border: none;
    border-color: @mainColor;
  }
  .el-input-group__prepend{
    background-color: @mainColor;
    // border-color: @mainColor;
    border: none;
    color:white;
  }
  .el-form-item.is-error .el-input__inner{
    border-color: @mainColor;
  }
  .el-form-item.is-success .el-input__inner{
    border-color: @mainColor;
  }
  .el-input__icon{
    font-size: 20px;
  }
  .el-form-item__error{
    position: absolute;
    top: 45%;
    left: 67%;
    transform: translate(0,-50%);
  }
}

.login::before{
}
.login::before {
	content:'';
	position:absolute;
  background:url('../../../static/img/login_bc.jpg') 0 / cover;
	top:0;
	right:0;
	bottom:0;
  left:0;
	// margin:-30px;
	// z-index:;
	-webkit-filter:blur(10px);
	filter:blur(10px);
}
</style>
<style lang="less">
@import '../../../static/css/main';
.el-input__inner:hover,.el-input__inner:focus{
  border-color: @secondColor;
}
</style>