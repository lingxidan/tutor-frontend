<template>
  <div class="recr-identity-table">
    <h1>教资认证管理</h1>
    <tablePage ref="tbMain" :tableTitles="tableTitles"
      :tableData="tableData"
      :isLoading="false"
      :tableConf="tableConf" class="tablepage">
    </tablePage>
    <el-dialog title="认证详情" :visible.sync="identityDialog" top="3vh" width="80%">
      <div class="identity-detail">
        <div class="identity-top">
          <div class="top-info name"><label>用户名：</label>{{currentIdentity.recruiter.name}}</div>
          <div class="top-info idcard"><label>身份证号：</label>{{currentIdentity.recruiter.idcard}}</div>
          <div class="top-info addressName"><label>联系地址：</label>{{currentIdentity.recruiter.addressName}}</div>
          <div class="top-info email"><label>联系邮箱：</label>{{currentIdentity.recruiter.email}}</div>
          <div class="top-info phone"><label>联系电话：</label>{{currentIdentity.recruiter.phone}}</div>
        </div>
        <div class="identity-content">
          <div class="content-info applyDt">
            <label>申请日期：</label>{{currentIdentity.applyDt}}
            </div>
          <div class="content-info applyId">
            <label>公司名称：</label>{{currentIdentity.companyName}}
            </div>
          <div class="content-info applyStartdt">
            <label>职称：</label>
            {{currentIdentity.applyName}}
          </div>
          <div class="content-info applyStartdt">
            <label>工号：</label>
            {{currentIdentity.applyId}}
          </div>
          <div class="content-info applyStartdt">
            <label>公司联系方式：</label>
            {{currentIdentity.companyPhone}}
          </div>
          <div class="content-info image">
            <template v-if="!currentIdentity.images||currentIdentity.images.length==0">
              无照片
            </template>
            <template v-else>
              <!-- <div class="img" v-for="image in currentIdentity.image"> -->
                <img v-for="image in currentIdentity.images" :src="image" alt="">
              <!-- </div> -->
            </template>
            </div>
        </div>
      </div>
      <template slot="footer">
        <el-input class="descr" v-model="currentDesc" placeholder="备注"></el-input>
        <el-button type="success" @click="submitIdentity">通过申请</el-button>
        <el-button type="warning" @click="cancelIdentity">驳回申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import inputSelect from '../../../components/common/input-select.vue'
import tablePage from '../../../components/common/table-page.vue'
import pagination from '../../../components/common/pagination.vue'
export default {
  name: 'recruiterIdentity',
  data() { 
    return {
      tableData:[],
      tableTitles:[{
          prop: "recrName",
          label: "招募者"
        },{
          prop: "applyDt",
          label: "申请日期"
        },{
          prop: "companyName",
          label: "公司名称"
        },{
          prop: "applyName",
          label: "职称"
        },{
          prop: "applyId",
          label: "工号"
        },{
          prop: "companyPhone",
          label: "公司联系方式"
        }],
      tableConf:{
        // 表格按钮操作列(是否需要，列头，操作按钮列表)
        operation:true,
        btns:[{
          id:"detail",
          text:"查看",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.currentIdentity = val
            this.identityDialog = true
          }
        },{
          id:"edit",
          text:"通过",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.currentIdentity = val
            this.submitIdentity()
          }
        },{
          id:"delete",
          text:"驳回",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.currentIdentity = val
            this.cancelIdentity()
          }
        }]
      },
      currentIdentity:{
        recruiter:{}
      },
      currentDesc:"",
      identityDialog:false
    }
  },
  props: {

  },
  components:{
    tablePage,
    pagination,
    inputSelect
  },
  mounted() {
    this.initData()
  },
  methods:{
    initData(){
      this.$request.getAllRecrIdenty({result:-1}).then(res=>{
        res.data.forEach(data=>{
          data.recrName = ""
          data.phone = ""
          data.email = ""
          data.idcard = ""
          if(data.image!="[]"){
            data.images = data.image
              .substr(1, data.image.length - 2)
              .split(",")
              .map(url => {
                return (
                  "/" +
                  url
                    .substr(
                      url.indexOf("static"),
                      url.length - url.indexOf("static")
                    )
                    .replace(/\\/g, "/")
                );
              });
          }else{
            data.images=[]
          }
          this.$request.getRecuriter({userId:data.recrId}).then(volRes=>{
            data.recruiter = volRes.data
            data.recrName = volRes.data.name
            data.phone = volRes.data.phone
            data.email = volRes.data.email
            data.idcard = volRes.data.idcard
          })
        })
        this.tableData = res.data
      })
    },
    submitIdentity(){
      this.currentIdentity.describe = this.currentDesc
      this.currentIdentity.result = 1
      this.$request.updateRecrIdenty( this.currentIdentity).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    },
    cancelIdentity(){
      this.currentIdentity.describe = this.currentDesc
      this.currentIdentity.result = -2
      this.$request.updateRecrIdenty( this.currentIdentity).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    }
  },
 }
</script>

<style lang="less" scoped>
.recr-identity-table{
  display: flex;
  flex-direction: column;
  // align-items: center;
  text-align: left;
  h1{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 3vh;
    line-height: 6vh;
    margin-left: 2vw;
  }
  .schoolTop{
    width: 100%;
    display: flex;
    .feature{
      margin-left: 30px;
      width: 10%;
      display: flex;
      align-items: center;
    }
  }
  .tablepage{
    width: 100%;
  }
  .identity-detail{
    display: flex;
    .identity-top{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 30%;
      .top-info{
        height: 6vh;
        // width: 40%;
        margin-left: 2vw;
        font-size: 2.1vh;
        label{
          font-size: 1.7vh;
          margin-right: 0.3vw;
          color: #aaa;
        }
      }
    }
    .identity-content{
      flex: 1;
      padding-left: 2vw;
      border-left: 0.1vh solid #ccc;
      .content-info{
        height: 7vh;
        // width: 40%;
        margin-left: 2vw;
        font-size: 2.1vh;
        label{
          font-size: 1.7vh;
          margin-right: 0.3vw;
          color: #aaa;
        }
      }
      .content-info.image{
        display: flex;
        // flex-direction: column;
        width: 40vw;
        height: auto;
        padding-left: 1vw;
        flex-wrap: wrap;
        img{
          margin-left: 1vw;
          height: auto;
          width: 46%;
          border-radius: 2px;
          border: 0.1vh solid #ccc;
        }
      }
    }
    .identity-top,.identity-content{
      padding: 2vh;
    }
  }
  .descr{
    width: 40%;
    margin-right: 2vw;
  }

}
</style>