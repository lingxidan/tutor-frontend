<template>
  <div class="vol-identity-table">
    <h1>教资认证管理</h1>
    <tablePage ref="tbMain" :tableTitles="tableTitles"
      :tableData="tableData"
      :isLoading="false"
      :tableConf="tableConf" class="tablepage">
    </tablePage>
    <el-dialog title="认证详情" :visible.sync="identityDialog" top="3vh" width="80%">
      <div class="identity-detail">
        <div class="identity-top">
          <div class="top-info name"><label>用户名：</label>{{currentIdentity.volunteer.name}}</div>
          <div class="top-info education"><label>学历：</label>{{currentIdentity.volunteer.education}}</div>
          <div class="top-info idcard"><label>身份证号：</label>{{currentIdentity.volunteer.idcard}}</div>
          <div class="top-info addressName"><label>联系地址：</label>{{currentIdentity.volunteer.addressName}}</div>
          <div class="top-info email"><label>联系邮箱：</label>{{currentIdentity.volunteer.email}}</div>
          <div class="top-info phone"><label>联系电话：</label>{{currentIdentity.volunteer.phone}}</div>
        </div>
        <div class="identity-content">
          <div class="content-info applyDt">
            <label>申请日期：</label>{{currentIdentity.applyDt}}
            </div>
          <div class="content-info applyId">
            <label>证书编号：</label>{{currentIdentity.applyId}}
            </div>
          <div class="content-info applyStartdt">
            <label>证书有效期：</label>
            {{currentIdentity.applyStartdt+"  --  "+currentIdentity.applyEnddt}}
            </div>
          <div class="content-info image">
            <template v-if="!currentIdentity.image||currentIdentity.image.length==0">
              无照片
            </template>
            <template v-else>
              <!-- <div class="img" v-for="image in currentIdentity.image"> -->
                <img v-for="image in currentIdentity.image" :src="image" alt="">
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
  name: 'volunteer',
  data() { 
    return {
      tableData:[],
      tableTitles:[{
          prop: "volName",
          label: "志愿者"
        },{
          prop: "applyDt",
          label: "申请日期"
        },{
          prop: "applyId",
          label: "证书编号"
        },{
          prop: "applyStartdt",
          label: "证书开始日期"
        },{
          prop: "applyEnddt",
          label: "证书结束日期"
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
        volunteer:{}
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
      this.$request.getAllVolIdenty({result:-1}).then(res=>{
        res.data.forEach(data=>{
          data.volName = ""
          data.phone = ""
          data.email = ""
          data.idcard = ""
          if(data.img!="[]"){
            data.image = data.img
              .substr(1, data.img.length - 2)
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
            data.image=[]
          }
          this.$request.getVolunteer({userId:data.volId}).then(volRes=>{
            data.volunteer = volRes.data
            data.volName = volRes.data.name
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
      this.$request.updateVolIdenty( this.currentIdentity).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    },
    cancelIdentity(){
      this.currentIdentity.describe = this.currentDesc
      this.currentIdentity.result = -2
      this.$request.updateVolIdenty( this.currentIdentity).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    }
  },
 }
</script>

<style lang="less" scoped>
.vol-identity-table{
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