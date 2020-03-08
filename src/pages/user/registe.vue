<template>
  <div class="registe" ref="registe">
    <div class="img"></div>
    <div class="teacher">
      <h1 v-if="registeForm.identy=='volunteer'" class="registe_top">欢迎加入志愿教师大家庭</h1>
      <h1 v-else class="registe_top">一站招募式平台</h1>
      <el-form :model="registeForm" status-icon :rules="rules" ref="registeForm" label-position="right" label-width="130px" class="form-cont">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="registeForm.name" autocomplete="off" placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="idcard" label="身份证号">
          <el-input v-model="registeForm.idcard" autocomplete="off" placeholder="身份证号码">
          </el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input v-model="registeForm.phone" autocomplete="off" placeholder="手机号码">
          </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registeForm.email" autocomplete="off" placeholder="邮箱">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registeForm.password" autocomplete="off" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input type="password" v-model="registeForm.checkPass" autocomplete="off" placeholder="再次输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="checkUser" label="联系地址" class="input-with-select">
          <el-select v-model="registeForm.province" style="width:180px;"
              placeholder="省"
              @change="changeCity">
            <el-option
              v-for="item in options.province"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="registeForm.city" style="width:180px;"
              placeholder="市"
              @change="changeCounty">
            <el-option
              v-for="item in options.city"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              placeholder="">
            </el-option>
          </el-select>
          <el-select v-model="registeForm.county" style="width:180px;"
              placeholder="区县">
            <el-option
              v-for="item in options.county"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              placeholder="">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button style="width:100%" type="primary" >登录</el-button>
        </el-form-item> -->
      </el-form>
        <el-button v-if="registeForm.identy=='volunteer'" 
          class="login_bottom" 
          @click="registe('registeForm')"
          style="width:70%" 
          type="primary" >开启志愿之旅</el-button>
        <el-button v-else
          class="login_bottom" 
          @click="registe('registeForm')"
          style="width:70%" 
          type="primary" >开启招募大门</el-button>
        <p class="loginDirect" @click="login">已有账号？现在就登录</p>
        <p v-if="registeForm.identy=='volunteer'" class="loginDirect" @click="registeDirect(2)">招募教师志愿者</p>
        <p v-else class="loginDirect" @click="registeDirect(1)">我想支教</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registe',
  userTime: {},
  data() { 
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }else{
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test(value)){
          callback();
        }else{
          callback(new Error('邮箱格式不正确'));
        }
      }
    };
    // var validateUser2 = (rule, value, callback) => {
    //   if(this.registeForm.user === ''){
    //     callback(new Error('请输入邮箱'));
    //   }
    //   if (value === '') {
    //     callback(new Error('请输入邮箱验证码'));
    //   }
    //   // let formData = {
    //   //   name: "asd",
    //   //   email: "1106469850@qq.com",
    //   // };
    //   // request.email(formData).then(res=>{console.log("success")})
    //   // .catch(error=>{console.log(error)})
    // };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registeForm.checkPass !== '') {
          this.$refs.registeForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registeForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      panels:{},
      codeTime:{},
      registeForm: {
        name: '',
        idcard:'',
        phone: '',
        email: '',
        password: '',
        checkPass: '',
        province:'',
        city:'',
        county:'',
        identy:this.$route.path.split('/')[2]
      },
      options:{
        province:[],
        city:[],
        county:[],
      },
      rules: {
        name:[
          {required: true, message: '用户名不能为空'}
        ],
        idcard: [
          {required: true, message: '身份证号不能为空'}
        ],
        phone: [
          {required: true, message: '手机号码不能为空'}
        ],
        email: [
          {required: true, message: '邮箱不能为空'},
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '密码不能为空'},
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass:[
          {required: true, message: '重复密码不能为空'},
          { validator: validatePass2, trigger: 'blur' }
        ],
        province: [
          {required: true, message: '地址不能为空'}
        ],
        city: [
          {required: true, message: '地址不能为空'}
        ],
        county: [
          {required: true, message: '地址不能为空'}
        ],
        // checkUser:[
        //   { validator: validateUser2, trigger: 'blur' }
        // ]
      }
    }
  },
  props: {

  },
  components:{
  },
  watch: {
    $route(to,from){
      this.registeForm.identy=this.$route.path.split('/')[2]
    }
  },
  created(){
    
  },
  mounted() {
    // console.log(this.user)
    let _this=this
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.registe.style.height = clientHeight + "px"
    this.panels.codeBtn = this.$refs.code
    // console.log()
    this.$request.selectAddress({level:1,pcode:0}).then(res=>{
      console.log(res)
      _this.options.province=res.data
    })
  },
  methods:{
    changeCity(pcode){
      let _this=this
      _this.options.city=[]
      _this.options.county=[]
      _this.registeForm.city=""
      _this.registeForm.county=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
        console.log(res)
        _this.options.city=res.data
      })
    },
    changeCounty(pcode){
      let _this=this
      _this.options.county=[]
      _this.registeForm.county=""
      this.$request.selectAddress({level:3,pcode:pcode}).then(res=>{
        _this.options.county=res.data
      })
    },
    // sendCode(){
    //   this.codeTime.startTime = new Date()
    //   // setTimeout(()=>{
    //   //   let endTime = new Date()
    //   //   alert(endTime-this.codeTime.startTime)
    //   // },1000)
    //   this.panels.codeBtn.innerText="已发送，请在60s内输入"
    //   // alert(this.codeTime.startTime)
    // },
    registe(formName){
      let _this=this
      let identy = this.registeForm.identy
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(identy == "volunteer"){
            console.log(this.registeForm)
            let formData=this.registeForm
            let param={
              name:formData.name,
              password:formData.password,
              phone:formData.phone,
              email:formData.email,
              address:formData.county,
              idcard:formData.idcard
            }
            _this.$request.registerVolunteer(param).then(
              res=>{
                let userId = res.data
                // console.log(res)
                _this.$request.getVolunteer({userId}).then(
                  res=>{
                    // console.log(res)
                    res.data.identy=identy
                    this.$store.commit('user', res.data);
                    sessionStorage.setItem("user",JSON.stringify(res.data))
                    this.$router.push('/user/vol/'+identy)
                    console.log(this.$store.state.user)
                  }
                )
              }
            )
          }
          if(identy == "recruiter"){
            console.log(this.registeForm)
            let formData=this.registeForm
            let param={
              name:formData.name,
              password:formData.password,
              phone:formData.phone,
              email:formData.email,
              address:formData.county,
              idcard:formData.idcard
            }
            _this.$request.registeRecuriter(param).then(
              res=>{
                let userId = res.data
                // console.log(res)
                _this.$request.getRecuriter({userId}).then(
                  res=>{
                    console.log(res)
                    res.data.identy=identy
                    this.$store.commit('user', res.data);
                    sessionStorage.setItem("user",JSON.stringify(res.data))
                    this.$router.push('/user/recr/'+identy)
                    console.log(this.$store.state.user)
                  }
                )
              }
            )

          }
          // if(identy == "recruiter"){
          //   this.$router.push('/user/recr/'+identy)
          // }else{
          //   this.$router.push('/user/vol/'+identy)
          // }
          // this.login(this.ruleForm.user, this.ruleForm.pass)
        } else {
          return false
        }
      })
      // location.reload()
    },
    registeDirect(flag){
      if(flag==1){
        this.$router.push('/registe/volunteer')
      }
      if(flag==2){
        this.$router.push('/registe/recruiter')
      }
    },
    login(){
        this.$router.push('/login')
    }
  },
 }
</script>

<style lang="less">
@import '../../../static/css/main';
.registe{
  // width:100%;
  height:100%;
  .el-input__inner, .el-checkbox__inner, .el-textarea__inner, .el-button {
    border-radius: 13px 0 13px 0;
    border-color: @mainColor;
    // display: inline;
    z-index:10;
  }
  .el-icon-arrow-up:before{
    color:@mainColor;
  }
  .el-button,.el-input-group__append{
    background-color: @secondColor;
    // width: 10%;
    color:white;
    padding-bottom: 13px;
    border-radius: 3px;
    border:none;
  }
  .el-input-group__append{
    padding-bottom: 0;
  }
  .el-button:hover,.el-button:focus,.el-input-group__append:hover,.el-input-group__append:focus{
    background-color: @thirthColor;
    border: none;
  }
  .el-input__inner:hover,.el-input__inner:focus{
    border-color: @secondColor;
  }
  .el-form-item__label{
    // letter-spacing: 3px;
    // font-family: @thirdFont;
    font-size: 17px;
    // font-weight: bold;
  }
}
</style>


<style lang="less" scoped>
@import '../../../static/css/main';
.registe{
  z-index: 1;
  position: relative;
  padding-left: 100px;
  // padding-right: 80px;
  // background:  linear-gradient(60deg,#fff 30%,@thirthColor 30%, @secondColor 90%);
  // background: linear-gradient(60deg, #fff 33.3%, @thirthColor 0, @thirthColor 66.6%,@secondColor 0); 
  background: linear-gradient(60deg, @secondColor 33.3%, @thirthColor 0, @thirthColor 67%,#fff 0); 
  overflow: hidden;
  display: flex;
  align-items: center;
  // justify-content: center;
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: rgba(252,233,199,0.4);
    z-index: -1;
  }
  .img{
    width: 37%;
    height: 59%;
    background: url('../../../static/img/registe_bc.jpg') no-repeat;
    background-position: center;
    background-size: 100% 100%;
    background-size: cover;
    border-radius: 0 50% 0 50%;
    box-shadow: 0 0 10px 10px @mainColor;
    z-index: -3;
    margin-left: 60px;
  }
  .registe_top{
    width: 100%;
    height: 33px;
    line-height: 33px;
    font-family: @secondFont;
    font-size: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color:rgba(250,184,62,0.5);
  }
  .teacher,.school{
    margin-left: -10px;
    background-color: rgba(255, 255, 255, 1);
    width: 42%;
    height: 79%;
    // display: flex;
    // flex-direction: column;
    padding-top: 40px;
    // padding-left: 50px;
    // color:white;
    // line-height: 300px;
    // font-size: 30px;
    // letter-spacing: 3px;

    // box-shadow: -9px 9px 3px 0px @mainColor;
    border-radius: 10px;
    .form-cont{
      padding: 40px 50px 30px 20px;
      // height: 70%;
      // padding-right: 100px;
    }
    .loginDirect{
      position: relative;
      display: block;
      height: 10px;
      line-height: 10px;
      font-size: 13px;
      margin-top: 20px;
      text-decoration: underline;
      cursor: pointer;
      &:hover{
        color: @thirthColor;
      }
    }
    // .login_bottom{
    //   margin-top: 50px;
    // }
  }
  // .school{
  //   background-color: rgba(250,184,62,0.5);
  //   background:  radial-gradient(rgba(250,184,62,0.5),#fff);
  // }
}
</style>