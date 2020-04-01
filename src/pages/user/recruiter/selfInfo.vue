<template>
  <div class="selfInfo">
    <el-dialog title="申请认证" :visible.sync="identyFormVisible" top="2vh"
      width="40%">
      <el-form ref="identyForm" label-position="right" :model="identyFormData" class="identy-form" :rules="rules" >
        <el-form-item v-for="prop,idx in identyForm" :prop="prop.prop" class="edit-form-item" :label="prop.label":key="idx">
          <el-input v-if="prop.type == 'input'" v-model="identyFormData[prop.prop]" :placeholder="prop.label"></el-input>
          <div v-if="prop.type=='image'" class="image-upload">
            <el-upload
              action="doUpload"
              list-type="picture-card"
              :on-change="handleChange"
              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRecrIdenty">提交申请</el-button>
          <el-button type="primary" @click="identyFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="认证历史" :visible.sync="identyHisFormVisible" top="2vh"
      width="60%">
      <div class="history-info">仅处理最新认证申请</div>
      <tablePage ref="tbMain" :tableTitles="tableTitles"
        :tableData="tableData"
        :tableConf="tableConf" class="tablepage" :tableCellStyle="tableCellStyle"></tablePage>
    </el-dialog>
    <div class="info">
      <div class="base">
        <h3>个人信息</h3>
        <i class="el-icon-edit" @click="changeBase">
          <label v-if="baseEdit" for="">&nbsp;&nbsp;取消</label>
          <label v-else for="">&nbsp;&nbsp;编辑</label>
        </i>
        <el-form ref="baseForm" label-position="right" :model="baseFormData" class="demo-form-inline-base" :rules="rules" >
          <!-- <template> -->
          <el-form-item v-for="prop,idx in baseForm" :prop="prop.prop" class="edit-form-item" :label="prop.label":key="idx">
            <template v-if="baseEdit">
              <template v-if="prop.prop!='address'">
                <el-input :type="prop.prop=='password'?'password':'text'" v-model="baseFormData[prop.prop]" :placeholder="prop.label" :disabled="!prop.edit"></el-input>
              </template>
              <template v-else>
                <el-select v-model="recruiter.province"
                    placeholder="省"
                    @change="changeCity">
                  <el-option
                    v-for="item in selectData.province"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select v-model="recruiter.city"
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
                <el-select v-model="recruiter.county"
                    placeholder="区县">
                  <el-option
                    v-for="item in selectData.county"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    placeholder="">
                  </el-option>
                </el-select>
              </template>
            </template>
            <label v-else>
              <label for="" v-if="prop.prop=='address'">{{recruiter.addressName}}</label>
              <label for="" v-else-if="prop.prop=='password'">************</label>
              <label for="" v-else>{{recruiter[prop.prop]}}</label>
            </label>
          </el-form-item>
          <!-- </template> -->
          <el-form-item v-if="baseEdit" prop="checkPass" label="确认密码">
            <el-input type="password" v-model="baseFormData.checkPass" autocomplete="off" placeholder="再次输入密码">
            </el-input>
          </el-form-item>
          <el-form-item v-if="baseEdit">
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="identy">
      </div>
    </div>
    <div class="zhaomu">
      <div class="identy-title">
        <h3>认证信息</h3>
        <el-button icon="el-icon-edit" @click="identyFormVisible = true">申请认证</el-button>
        <el-button icon="el-icon-notebook-2" @click="showHisIdenty">认证历史</el-button>
      </div>
      <el-form label-position="right" :model="recruiter" class="demo-form">
        <el-form-item label="身份证号">
          <label for="">{{recruiter.idcard}}</label>
        </el-form-item>
        <el-form-item label="认证状态">
          <label 
          :style="recruiter.result==-1?'color:orange':recruiter.result==-2?'color:red':'color:green'">
          {{recruiter.result==-1?"认证中...":recruiter.result==-2?"认证失败":"认证成功"}}
          </label>
        </el-form-item>
        <el-form-item label="公司名称">
          <label>{{recruiter.companyName}}</label>
        </el-form-item>
        <el-form-item label="公司职位">
          <label>{{recruiter.applyName}}</label>
        </el-form-item>
        <el-form-item label="公司联系方式">
          <label>{{recruiter.companyPhone}}</label>
        </el-form-item>
        <el-form-item label="工号">
          <label>{{recruiter.applyId||"无"}}</label>
        </el-form-item>
        <el-form-item label="工作证照片" class="upload-images">
          <template v-if="recruiter.image&&recruiter.image.length>0">
            <img class="upload-image" v-for="img in recruiter.image" :src="img" alt="" />
          </template>
          <template v-else>
            无相关照片
          </template>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import tablePage from '../../../components/common/table-page.vue'
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
        if (this.baseFormData.checkPass !== '') {
          this.$refs.baseForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.baseFormData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      baseEdit:false,
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
        }

      ],
      identyForm:[
        {
          prop:"companyName",
          label:"公司名称",
          type: "input"
        },
        {
          prop:"companyPhone",
          label:"公司联系方式",
          type: "input"
        },
        {
          prop:"applyName",
          label:"职称",
          type: "input"
        },
        {
          prop:"applyId",
          label:"工号",
          type: "input"
        },
        {
          prop:"image",
          label:"工作证图片",
          type: "image"
        }
      ],
      identyFormData: {},
      identyFormVisible: false,
      recruiter:{},
      
      baseFormData: {
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
        companyName: [
          {required: true, message: ' '}
        ],
        companyPhone: [
          {required: true, message: ' '}
        ],
        applyName: [
          {required: true, message: ' '}
        ],
      },
      
      selectData:{
        province:[],
        city:[],
        county:[],
      },
      identyHisFormVisible: false,
      tableTitles:[{
        prop: "applyDt",
        label: "申请日期"
      },{
        prop: "companyName",
        label: "公司名称"
      },{
        prop: "companyPhone",
        label: "公司联系方式"
      },{
        prop: "applyName",
        label: "职称"
      },{
        prop: "applyId",
        label: "工号"
      },{
        prop: "resultName",
        label: "结果"
      },{
        prop: "describe",
        label: "备注说明"
      }],
      tableData:[],
      tableConf:{
        operation:false
      },
    }
  },
  props: {

  },
  components:{
    tablePage
  },
  mounted() {
    let _this=this
    this.recruiter = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.recruiter)
    _this.getUserInfo(this.recruiter.id)
  },
  methods:{
    getUserInfo(dataId=this.recruiter.userId){
      let _this=this
      _this.$request.getRecuriter({userId:dataId}).then(
        res=>{
          _this.recruiter=res.data
          _this.recruiter.province=res.data.address.substring(0,2)
          _this.recruiter.city=res.data.address.substring(0,4)
          _this.recruiter.county=res.data.address
          Object.keys(_this.recruiter).forEach(key=>{
            if(_this.baseFormData.hasOwnProperty(key)){
              _this.baseFormData[key]=_this.recruiter[key]
            }
          })
          this.$request.selectAddress({level:1,pcode:0}).then(res=>{
            _this.selectData.province=res.data
          })
          this.$request.selectAddress({level:2,pcode:_this.recruiter.province}).then(res=>{
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.recruiter.city}).then(res=>{
            _this.selectData.county=res.data
          })
          // 获取认证信息
          _this.$request.getLastRecrIdenty({recrId:dataId}).then(res=>{
            if(res.data.image!="[]"){
              res.data.image = res.data.image.substr(1, res.data.image.length-2).split(",").map(url=>{
                return "/" + url.substr(url.indexOf("static"), url.length - url.indexOf("static")).replace(/\\/g, "/")
              })
            }else{
              res.data.image = []
            }
            _this.recruiter = {
              ..._this.recruiter,
              ...res.data
            }
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
      this.$refs.baseForm.validate(valid => {
        if (valid) {
          Object.keys(this.baseFormData).forEach(key=>{
            if(_this.recruiter.hasOwnProperty(key)){
              _this.recruiter[key]=_this.baseFormData[key]
            }
          })
          _this.recruiter.address=_this.recruiter.county
          _this.$request.editRecuriter(_this.recruiter).then(
            res=>{
              _this.getUserInfo(_this.recruiter.userId)
              this.baseEdit=!this.baseEdit
            }
          )
        } else {
          return false
        }
      })
      
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
    },
    // 删除文件
    handleRemove(file) {
      let fileList = this.identyFormData.image
      fileList.splice(fileList.indexOf(file), 1)
      this.identyFormData.image = fileList
    },
    handleChange(file, fileList) {
      this.identyFormData.image = fileList
      if(fileList.length > 2){
        this.$message.warning("最多选择两张照片")
        fileList.splice(fileList.length-1, 1)
      }
    },
    // 申请认证
    applyRecrIdenty(){
      this.$refs.baseForm.validate(valid => {
        if(valid){
          let image = (this.identyFormData.image||[]).map(item=>item.raw)
          let formData = new FormData();
          image.forEach(item=>{formData.append('image', item)})
          formData.append("recrId", this.recruiter.userId)
          formData.append("companyName", this.identyFormData.companyName)
          formData.append("companyPhone", this.identyFormData.companyPhone)
          formData.append("applyName", this.identyFormData.applyName)
          formData.append("applyId", this.identyFormData.applyId||"")
          formData.append("frontPath", this.$rootPath)
          
          this.$request.appplyRecrIdenty(formData).then(
            res=>{
              this.getUserInfo()
              this.identyFormVisible = false
            }
          )
          
        }else{
          return false
        }
      })
    },
    showHisIdenty(){
      this.$request.getRecrIdenty({recrId:this.recruiter.userId}).then(res=>{
        this.tableData = res.data.map((item,idx)=>{
          switch(item.result){
            case -1:
              if(idx==0){
                item.resultName = "认证中"
              }else{
                item.resultName = "过期"
              }
              break;
            case 0:
              item.resultName = "认证失败"
              break;
            case 2:
              item.resultName = "认证成功"
              break;
          }
          return item
        })
        this.identyHisFormVisible = true
      })
    },
    tableCellStyle(row){
      if(row.column.property == "resultName")
      switch(row.row.result){
        case -1:
          if(row.rowIndex==0){
            return "color:orange;"
          }else{
            return "color:#ccc;"
          }
        case 0:
          return "color:red"
        case 2:
          return "color:green"
      }
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../../static/css/main';
.selfInfo{
  display: flex;
  height: 100%;
  padding: 1vh;
  .info,.zhaomu{
    width: 45%;
    text-align: left;
    h3{
      font-size: 3vh;
      font-weight: bold;
      text-align: left;
      border-left: 0.5vw solid @secondColor;
      padding-left: 2vw;
      margin-left: 2vw;
      margin-bottom: 2vh;
      letter-spacing: 2px;
      display: inline-block;
      width: 50%;
    }
    .demo-form-inline-base{
      padding-left: 2vw;
    }
  }
  .info{
    border-right: 1px solid #f7f7f7;
    .base,.identy{
      padding: 2vh;
    }
  }
  .zhaomu{
    padding: 2vh;
    .identy-title{
      display: flex;
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
  
  .tablepage{
    width: 100%;
    height: 70vh;
  }
}
</style>
<style lang="less">
@import '../../../../static/css/main';
.selfInfo{
  .el-form{
    width: 80%;
    .el-form-item{
      margin-bottom: 2.3vh;
      font-size: 2vh;
      line-height: 6vh;
      // height: 6vh;
      display: flex;
      .el-form-item__label{
        text-align: right;
        width: 8vw;
        height: 6vh;
        line-height: inherit;
        font-size: 1.6vh;
        padding: 0 1vw 0 0;
      }
      .el-form-item__content{
        flex: 1;
        // height: inherit;
        line-height: inherit;
        font-size: inherit;
        display: flex;
        label{
          font-size: 1.8vh;
        }
        .el-input{
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          .el-input__inner{
            height: inherit;
            line-height: 2.7;
            font-size: inherit;
            padding: 0 1vw;
            border-color: @sixthColor;
          }
        }
        .el-button{
          width: 100%;
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          padding: 0;
          background-color: @thirthColor;
          border: none;
          letter-spacing: 1px;
          &:hover{
            background-color: @secondColor;
          }
        }
        .el-form-item__error{
          font-size: 1.4vh;
          width: 100%;
          text-align: right;
        }
        .el-upload--picture-card {
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          line-height: 6vw;
          i{
            font-size: 3vh;
          }
        }
        .el-upload-list--picture-card .el-upload-list__item{
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          margin: 0 1vw 0 0;
          border-color: @sixthColor;
        }
      }
    }
    .upload-images{
      display: flex;
      .el-form-item__content{
        display: flex;
      }
      .upload-image{
        width: 40%;
        height: auto;
        margin-right: 1vw;
        margin-bottom: 1vw;
        border: 1px solid @sixthColor;
      }
    }
  }
  .demo-form{
    .el-form-item{
      margin-bottom: 0;
      .el-form-item__label{
        width: 10vw;
      }
    }
  }
  .el-dialog__title {
    line-height: 1;
    font-size: 3vh;
    font-weight: bolder;
  }
  .el-dialog__body{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1vh 1vw;
    .history-info{
      margin-bottom: 1vh;
      font-size: 1.6vh;
    }
  }
}
.info{
  .base{
    .el-icon-edit{
      cursor: pointer;
      font-size: 1.6vh;
      line-height: 1.6vh;
      text-decoration: underline;
      &:hover{
        color: #fba400;
        font-weight: bold;
        background: none;
      }
    }
    .el-icon-edit label{
      cursor: pointer;
    }
  }
}
.zhaomu{
  .identy-title{
    .el-button{
      border-color: transparent;
      padding: 0;
      font-size: 1.6vh;
      line-height: 1.6vh;
      text-decoration: underline;
      background: none;
      &:hover{
        // border-bottom-color: @fourthColor;
        color: #fba400;
        font-weight: bold;
        background: none;
      }
    }
  }
}
</style>