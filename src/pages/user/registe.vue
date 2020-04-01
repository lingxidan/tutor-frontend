<template>
  <div class="registe" ref="registe">
    <div class="img"></div>
    <div class="teacher">
      <h1 v-if="identy=='volunteer'" class="registe_top">欢迎加入志愿教师大家庭</h1>
      <h1 v-else class="registe_top">一站式招募平台</h1>
      <el-form :model="registeForm" :rules="rules" ref="registeForm" label-position="right" class="form-cont">
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
      </el-form>
      <el-form :model="registeForm" :rules="rules" ref="moreForm" label-position="right" class="form-cont">
        <el-form-item label="联系地址">
          <el-select v-model="registeForm.province"
              placeholder="省"
              @change="changeCity">
            <el-option
              v-for="item in options.province"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="registeForm.city"
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
          <el-select v-model="registeForm.county"
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
        <el-form-item v-for="(item, index) in moreForm" :key="item.model" :prop="item.model" :label="item.label">
          <el-input v-if="item.type == 'input'" v-model="registeForm[item.model]">
          </el-input>
          <el-select v-if="item.type == 'select'" v-model="registeForm[item.model]">
            <el-option
              v-for="itemOp in item.options"
              :key="itemOp.code"
              :label="itemOp.name"
              :value="itemOp.code"
              placeholder="">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button v-if="identy=='volunteer'" 
          class="login_bottom" 
          @click="registe"
          type="primary" >开启志愿之旅</el-button>
        <el-button v-else
          class="login_bottom" 
          @click="registe"
          type="primary" >开启招募大门</el-button>
      </el-form>
      <div class="form_bottom">
        <p class="loginDirect" @click="login">已有账号？现在就登录</p>
        <p v-if="identy=='volunteer'" class="loginDirect" @click="registeDirect">去招募</p>
        <p v-else class="loginDirect" @click="registeDirect">我想支教</p>
      </div>
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
        idcard: '',
        phone: '',
        email: '',
        password: '',
        checkPass: '',
        province: '',
        city: '',
        county: '',
        education: '1',
        status: '1',
        companyName: '',
        identify: '',
        companyPhone: ''
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
        ]
      },
      moreForm:[],
      identy:this.$route.path.split('/')[2]
    }
  },
  props: {

  },
  components:{
  },
  watch: {
    $route(to,from){
      this.identy=this.$route.path.split('/')[2]
      this.getMoreForm()
    }
  },
  created(){
    
  },
  mounted() {
    let _this=this
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.registe.style.height = clientHeight + "px"
    this.panels.codeBtn = this.$refs.code
    this.$request.selectAddress({level:1,pcode:0}).then(res=>{
      _this.options.province=res.data
    })
    this.getMoreForm()
  },
  methods:{
    changeCity(pcode){
      let _this=this
      _this.options.city=[]
      _this.options.county=[]
      _this.registeForm.city=""
      _this.registeForm.county=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
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
    getMoreForm(){
      this.moreForm = []
      if(this.identy == "volunteer"){
        this.moreForm = [{
            model: "education",
            label: "学历",
            type: "select",
            options: [{
              name:"高中及以下",
              code:"1"
            },{
              name:"高中",
              code:"2"
            },{
              name:"大专",
              code:"3"
            },{
              name:"本科",
              code:"4"
            },{
              name:"硕士研究生",
              code:"5"
            },{
              name:"博士研究生",
              code:"6"
            },]
          },{
            model: "status",
            label: "求职状态",
            type: "select",
            options: [{
              name:"考虑机会",
              code: "1"
            },{
              name:"暂不考虑",
              code: "2"
            }]
          }]
      }
      if(this.identy == "recruiter"){
        this.moreForm = [{
            model: "companyName",
            label: "公司名称",
            type: "input"
          },{
            model: "identify",
            label: "职位",
            type: "input"
          },{
            model: "companyPhone",
            label: "公司联系方式",
            type: "input",
          }]
      }
    },
    registe(){
      let _this=this
      let identy = this.identy
      this.$refs.registeForm.validate(valid=>{
        this.$refs.moreForm.validate(valid1=>{
          if(valid && valid1){
            this.registeForm.address = this.registeForm.county || this.registeForm.city || this.registeForm.province || ""
            if(this.identy == "volunteer"){
              this.$request.registerVolunteer(this.registeForm).then(
                res=>{
                  this.$store.commit('user', res.data);
                  sessionStorage.setItem("user", JSON.stringify(res.data))
                  this.$router.push('/user/vol/' + this.identy)
                }
              )
            }
            if(this.identy == "recruiter"){
              this.$request.registeRecuriter(this.registeForm).then(
                res=>{
                  this.$store.commit('user', res.data);
                  sessionStorage.setItem("user", JSON.stringify(res.data))
                  this.$router.push('/user/vol/' + this.identy)
                }
              )

            }
          }
        })
      })
    },
    registeDirect(){
      if(this.identy == "recruiter"){
        this.$router.push('/registe/volunteer')
      }
      if(this.identy == "volunteer"){
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
    border-radius: 3px;
    border-color: @mainColor;
    z-index:10;
    border-width: 0.1vh;
  }
  .el-icon-arrow-up:before{
    color:@mainColor;
  }
  .el-form-item{
    margin-bottom: 2.4vh;
    height: 5vh;
    line-height: 5vh;
    font-size: 2vh;
    margin-left: 2vw;
    display: flex;
    .el-form-item__label{
      width: 7vw;
      height: inherit;
      line-height: inherit;
      font-size: inherit;
      padding: 0 0.7vw 0 0;
    }
    .el-form-item__content{
      // flex: 1;
      height: inherit;
      line-height: inherit;
      font-size: inherit;
      display: flex;
      width: 65%;
      .el-input{
        height: 100%;
        font-size: inherit;
        .el-input__inner{
          height: inherit;
          line-height: inherit;
          font-size: 1.6vh;
          padding: 0 1vw;
        }
      }
      .el-input__suffix{
        right: 0.2vw;
        display: block;
      }
      .el-input__icon{
        // height: 99%;
        line-height: 5.2vh;
        // line-height: 4vh;
        font-size: inherit;
        width: 2vw;
      }
      .el-form-item__error{
        // height: inherit;
        // line-height: inherit;
        font-size: 1.3vh;
        position: absolute;
        padding: 0;
        top: 113%;
        right: 0;
        text-align: right;
      }
    }

  }
  .el-button{
    width: 90%;
    height: 5vh;
    line-height: 5vh;
    font-size: 2vh;
    padding: 0;
    margin-top: 1vh;
    background-color: @thirthColor;
    border: none;
    &:hover{
      background-color: @secondColor;
    }
  }
}
</style>


<style lang="less" scoped>
@import '../../../static/css/main';
.registe{
  z-index: 1;
  position: relative;
  padding-left: 100px;
  display: flex;
  background: linear-gradient(60deg, @secondColor 33.3%, @thirthColor 0, @thirthColor 67%,#fff 0); 
  overflow: hidden;
  display: flex;
  align-items: center;
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
    width: 30%;
    height: 48%;
    background: url('../../../static/img/registe_bc.jpg') no-repeat;
    background-position: center;
    background-size: 100% 100%;
    background-size: cover;
    border-radius: 0 50% 0 50%;
    box-shadow: 0 0 5px 5px @thirthColor;
    z-index: -3;
    margin-left: 6vw;
  }
  .registe_top{
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    font-weight: bolder;
    font-size: 3.6vh;
    letter-spacing: 1px;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
    background-color:@thirthColor;
    color: @sixthColor;
  }
  .teacher,.school{
    margin-left: -1.6vw;
    background-color: rgba(255, 255, 255, 1);
    width: 42%;
    // height: 86vh;
    border-radius: 0.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form-cont{
      // padding: 5vh 4vw 0 0;
      // height: ;
      flex: 1;
      margin-top: 3vh;
      width: 80%;
    }
    .form-cont+.form-cont{
      margin-top: 0;
    }
    .form_bottom{
      height: 3vh;
      width: 80%;
      margin-top: 1vh;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2vh;
      .loginDirect{
        position: relative;
        display: block;
        font-size: 1.5vh;
        margin-left: 1vw;
        text-decoration: underline;
        font-size: 1.4vh;
        cursor: pointer;
        &:hover{
          color: @fourthColor;
        }
      }
    }
  }
}
</style>