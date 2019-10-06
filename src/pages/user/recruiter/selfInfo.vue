<template>
  <div class="selfInfo">
    <div class="info">
      <div class="base">
        <h3>个人信息</h3>
        <i class="el-icon-edit" @click="changeBase">
          <label v-if="baseEdit" for="">&nbsp;&nbsp;取消</label>
          <label v-else for="">&nbsp;&nbsp;编辑</label>
        </i>
        <el-form ref="baseInfoForm" label-position="right" :model="baseInfoForm" class="demo-form-inline-base" label-width="100px" :rules="rules" >
          <template v-for="prop,idx in baseForm" >
            <el-form-item :prop="prop.prop" class="edit-form-item" :label="prop.label":key="idx">
              <div v-if="baseEdit">
                <div v-if="prop.prop!='address'">
                  <el-input v-model="baseInfoForm[prop.prop]" :placeholder="prop.label" :disabled="!prop.edit"></el-input>
                </div>
                <div v-else>
                  <el-select v-model="recruiter.province" style="width:180px;"
                      placeholder="省"
                      @change="changeCity">
                    <el-option
                      v-for="item in selectData.province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="recruiter.city" style="width:180px;"
                      placeholder="市"
                      @change="changeCounty">
                    <el-option
                      v-for="item in selectData.city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="recruiter.county" style="width:180px;"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <label v-else>
                <label for="" v-if="prop.prop=='address'">{{recruiter.addressName}}</label>
                <label for="" v-else>{{recruiter[prop.prop]}}</label>
              </label>
            </el-form-item>
          </template>
          <el-form-item v-if="baseEdit" prop="checkPass" label="确认密码">
            <el-input type="password" v-model="baseInfoForm.checkPass" autocomplete="off" placeholder="再次输入密码">
            </el-input>
          </el-form-item>
          <el-form-item v-if="baseEdit">
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="identy">
        <h3 style="width:100%">认证信息</h3>
        <el-form label-position="right" :model="recruiter" class="demo-form-inline" label-width="100px">
          <el-form-item label="身份证号">
            <el-input class="inline-input" v-model="recruiter.idcard" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="身份认证">
            <el-input v-if="recruiter.status==1" class="inline-input" v-model="identyName" >
              <el-button slot="append"
                @click="submitIdenty">认证身份</el-button>
            </el-input>
            <label v-else>{{recruiter.identyName}}</label>
          </el-form-item>
          <!-- <template v-for="prop,idx in identyForm" >
            <el-form-item :label="prop.label":key="idx">
              <el-input v-if="recruiter.identify==1" class="inline-input" v-model="recruiter[prop.prop]" :placeholder="prop.label" :disabled="!prop.edit" 
              @focus="changeIndenty" @blur="changeIndenty">
                <el-button slot="append" v-if="prop.hasOwnProperty('focus')&&recruiter.identify==1"
                @click="submitIdenty">认证身份</el-button>
                <label v-if="prop.hasOwnProperty('focus')">{{recruiter.reason}}</label>
                <label v-if="prop.hasOwnProperty('focus')">{{recruiter.reason}}</label>
              </el-input>
              <label v-else>{{recruiter[prop.prop]}}</label>
            </el-form-item>
          </template> -->
        </el-form>
      </div>
    </div>
    <div class="zhaomu">
      <h3 style="width:100%">综合信息</h3>
      <div class="mg-total">
        <div class="school-mg mg-div" @click="pathTo(1)">
          <p for="" class="title">学校</p>
          <p for="" class="cnt">{{recruiter.schoolCnt}}</p>
        </div>
        <div class="job-mg mg-div" @click="pathTo(2)">
          <p for="" class="title">职位</p>
          <p for="" class="cnt">{{recruiter.jobCnt}}</p>
        </div>
        <div class="article-mg mg-div" @click="pathTo(3)">
          <p for="" class="title">文章</p>
          <p for="" class="cnt">{{recruiter.articleCnt}}</p>
        </div>
        <div class="post-mg mg-div" @click="pathTo(4)">
          <p for="" class="title">帖子</p>
          <p for="" class="cnt">{{recruiter.postCnt}}</p>
        </div>
      </div>
      <!-- <el-form label-position="right" :model="recruiter" class="demo-form-inline" label-width="80px">
        <el-form-item label="管理学校" class="form-sub">
          <label>{{recruiter.schoolCnt}}个</label>
          <router-link to="school">查看详情</router-link>
        </el-form-item>
        <el-form-item label="管理职位" class="form-sub">
          <router-link to="zhiwei">查看详情</router-link>
          <el-form label-position="right" :model="recruiter" class="demo-form-inline">
            <el-form-item label="总数" class="form-form-label">
              <label>{{recruiter.zhiwei.cnt}}个</label>
            </el-form-item>
            <el-form-item label="已关闭" class="form-form-label">
              <label>{{recruiter.zhiwei.closed}}个</label>
            </el-form-item>
            <el-form-item label="招募中" class="form-form-label">
              <label>{{recruiter.zhiwei.opened}}个</label>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'selfInfo',
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.baseInfoForm.checkPass !== '') {
          this.$refs.baseInfoForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.baseInfoForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      baseEdit:false,
      identyFocus:false,
      baseForm:[
        {
          prop:"name",
          label:"用户名",
          edit:true,
        },
        {
          prop:"phone",
          label:"联系手机",
          edit:true,
        },
        {
          prop:"email",
          label:"联系邮箱",
          edit:true,
        },
        {
          prop:"address",
          label:"联系地址",
          edit:true,
        },
        {
          prop:"password",
          label:"登录密码",
          edit:true,
        },

      ],
      identyForm:[
        {
          prop:"idcard",
          label:"身份证号",
          edit:false,
        },
        {
          prop:"identify",
          label:"招募身份认证",
          edit:true,
          focus:"focus"
        },
      ],
      recruiter:{
        name:"张XX",
        identiCard:"142729********20",
        phone:"1738200****",
        email:"ajoheobn@ss.com",
        password:"adsfa",
        address:"北京市朝阳区",
        reason:"s",
        identity:"简巨科技有限公司HR经理",
        schoolCnt:8,
        zhiwei:{
          cnt:10,
          opened:6,
          closed:4
        },
      },
      
      baseInfoForm: {
        name: '',
        phone: '',
        email: '',
        password: '',
        checkPass: '',
        address:'',
        identy:this.$route.path.split('/')[2]
      },
      rules: {
        name:[
          {required: true, message: '用户名不能为空'}
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
        // checkUser:[
        //   { validator: validateUser2, trigger: 'blur' }
        // ]
      },
      
      selectData:{
        province:[],
        city:[],
        county:[],
      },
      identyName:""
    }
  },
  props: {

  },
  components:{
  },
  mounted() {
    let _this=this
    this.recruiter = JSON.parse(sessionStorage.getItem('user'));
    _this.getUserInfo(this.recruiter.userId)
  },
  methods:{
    getUserInfo(dataId){
      let _this=this
      _this.$request.getRecuriter({userId:dataId}).then(
        res=>{
          console.log("getUser",res.data)
          _this.recruiter=res.data
          _this.recruiter.province=res.data.address.substring(0,2)
          _this.recruiter.city=res.data.address.substring(0,4)
          _this.recruiter.county=res.data.address
          _this.recruiter.status=_this.recruiter.identify.substring(0,1)
          let identyName=_this.recruiter.identify.substring(1,_this.recruiter.identify.length)
          _this.recruiter.identyName=identyName

          // 学校
          _this.$request.selectSchoolByCondition({userId:dataId}).then(
            res=>{
              _this.recruiter.schoolCnt=res.data.length
              _this.recruiter={..._this.recruiter}
            }
          )
          // 岗位
          _this.$request.selectJobByCondition({userId:dataId}).then(
            res=>{
              _this.recruiter.jobCnt=res.data.length
              _this.recruiter={..._this.recruiter}
            }
          )
          // 文章
          _this.$request.selectArticleByCondition({userId:dataId}).then(
            res=>{
              _this.recruiter.articleCnt=res.data.length
              _this.recruiter={..._this.recruiter}
            }
          )
          // 帖子
          _this.$request.selectPostByCondition({userId:dataId}).then(
            res=>{
              _this.recruiter.postCnt=res.data.length
              _this.recruiter={..._this.recruiter}
            }
          )

          Object.keys(_this.recruiter).forEach(key=>{
            if(_this.baseInfoForm.hasOwnProperty(key)){
              _this.baseInfoForm[key]=_this.recruiter[key]
            }
          })
          this.$request.selectAddress({level:1,pcode:0}).then(res=>{
            // console.log(res)
            _this.selectData.province=res.data
            // _this.selectData.expectJob.forEach(item=>{
            //   item.province=res.data
            // })
          })
          this.$request.selectAddress({level:2,pcode:_this.recruiter.province}).then(res=>{
            // console.log(res)
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.recruiter.city}).then(res=>{
            _this.selectData.county=res.data
          })
        }
      )
    },
    changeCity(pcode){
      let _this=this
      _this.selectData.city=[]
      _this.selectData.county=[]
      _this.recruiter.city=""
      _this.recruiter.county=""
      _this.recruiter.address=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
        _this.selectData.city=res.data
      })
    },
    changeCounty(pcode){
      let _this=this
      _this.selectData.county=[]
      _this.recruiter.county=""
      _this.recruiter.address=""
      this.$request.selectAddress({level:3,pcode:pcode}).then(res=>{
        _this.selectData.county=res.data
      })
    },
    changeBase(){
      this.baseEdit=!this.baseEdit
    },
    onSubmit(){
      let _this=this
      this.baseEdit=!this.baseEdit
      Object.keys(this.baseInfoForm).forEach(key=>{
        if(_this.recruiter.hasOwnProperty(key)){
          _this.recruiter[key]=_this.baseInfoForm[key]
        }
      })
      _this.recruiter.address=_this.recruiter.county
      console.log(_this.recruiter)
      _this.$request.editRecuriter(_this.recruiter).then(
        res=>{
          console.log(res)
          _this.getUserInfo(_this.recruiter.userId)
        }
      )
    },
    changeIndenty(){
      // console.log(this)
      this.identyFocus=!this.identyFocus
    },
    submitIdenty(){
      let _this=this
      _this.recruiter.identify='2'+_this.identyName+"\n等待认证中"
      _this.$request.editRecuriter(_this.recruiter).then(
        res=>{
          console.log(res)
          _this.getUserInfo(_this.recruiter.userId)
        }
      )

    },
    pathTo(flag){
      if(flag==1){
        this.$router.push("/user/recr/school")
      }
      if(flag==2){
        this.$router.push("/user/recr/job")
      }
      if(flag==3){
        this.$router.push("/user/recr/article")
      }
      if(flag==4){
        this.$router.push("/user/recr/post")
      }
    }
  },
 }
</script>

<style lang="less" scoped>
.selfInfo{
  display: flex;
  height: 100%;
  .info,.zhaomu{
    padding-right: 80px;
    width: 50%;
    h3{
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      border-left: 3px solid #fce9c7;
      padding-left: 30px;
      margin-bottom: 20px;
      letter-spacing: 2px;
      display: inline-block;
      width: 70%;
    }
  }
  .info{
    border-right: 1px solid #f7f7f7;
    .base,.identy{
      padding: 10px;
    }
  }
  .zhaomu{
    .mg-total{
      display: flex;
      .mg-div{
        position: relative;
        width: 80px;
        height: 80px;
        padding: 10px;
        margin: 10px;
        border-radius: 4px;
        cursor: pointer;
        .title{
          position: relative;
          font-size: 17px;
          text-align: left;
          padding-left: 10px;
          color: #fff;
        }
        
        .title::before{
          content: "";
          position: absolute;
          width: 3px;
          height: 20px;
          border: none;
          left:0;
        }
        .cnt{
          margin: 8px;
          font-size: 20px;
          font-weight: 800;
          // text-shadow: 6px 6px 6px #999;
        }
      }
    }
    .school-mg{
      background-color: #3bc7ff;
      box-shadow: 3px 3px 3px 0 #016d97;
      .title::before{
        background-color: #a7e6ff;
      }
    }
    .job-mg{
      background-color: #1ce5ff;
      box-shadow: 3px 3px 3px 0 #007585;
      .title::before{
        background-color: #81f0ff;
      }
    }
    .article-mg{
      background-color: rgb(255, 214, 31);
      box-shadow: 3px 3px 3px 0 rgb(109, 89, 0);
      .title::before{
        background-color: rgb(253, 238, 169);
      }
    }
    .post-mg{
      background-color: rgb(243, 105, 255);
      box-shadow: 3px 3px 3px 0 rgb(115, 0, 126);
      .title::before{
        background-color: rgb(247, 160, 255);
      }
    }
    // margin-left: 30px;
    // padding: 10px;
    // a{
    //   display: inline-block;
    //   margin-left: 8px;
    //   cursor: pointer;
    //   font-size: 10px;
    //   text-decoration: underline;
    //   color:#fba400;
    // }
    // a:hover{
    //   color:#fab83e;

    // }
  }
}
</style>
<style lang="less">
.form-sub{
  .el-form-item__label{
    font-weight: bold;
  }
  .el-form-item__content{
    text-align: left;
  }
}
.form-form-label {
  .el-form-item__label{
    font-weight: normal;
    font-size: 12px;
  }
  .el-form-item__content{
    text-align: left;
  }
}
.info .edit-form-item{
  // cursor: pointer;
  .el-form-item__label{
    font-weight: 700;
  }
}
.info .el-input-group__append{
  background-color: rgb(252, 187, 47);
  color: #fff;
  border: none;
  &:hover{
    background-color: rgb(255, 217, 135);
  }
}
.info .edit-form-item .el-form-item__content{
  display: flex;
  align-items: center;
  justify-content: center;
}
.info{
  // .el-input__inner{
  //   width: 70%;
  // }
  .base{
    .el-input__inner{
      width: 70%;
    }
    .el-icon-edit{
      cursor: pointer;
      font-size: 20px;
      margin-left: 30px;
      margin-right: 30px;
      opacity: 0;
    }
    .el-icon-edit label{
      cursor: pointer;
    }
  }
}
.info .base:hover,
.info .identy:hover{
  background-color: #fff8eb;
  .el-icon-edit{
    color: #fba400;
    opacity: 1;
  }
}
</style>