<template>
  <div class="info-vol">
    <div class="content">
      <div class="jingli">
        <div class="part zhiwei">
          <div class="title">期望岗位</div>
          <div class="partContent">
            <div class="zhiweiContent" v-for="(zhiweiInfo,idx) in zhiweiList" :key="idx">
              <div class="zhiweiContent-part">
                <span>
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{zhiweiInfo.name}}
                </span>
                <span>
                  <i class="el-icon-self-dingwei"></i>
                  <label v-for="(addr,addrIdx) in zhiweiInfo.addrNames" :key="addrIdx">
                    {{addr}}
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="part jiaoyu">
          <div class="title">教育经历</div>
          <div class="partContent">
            <div class="jiaoyuContent" v-for="(jiaoyuInfo,idx) in jiaoyuList" :key="idx">
              <div class="jiaoyuContent-part">
                <div class="gongsi">
                  <i class="el-icon-self-edu"></i>
                  <label for="">{{jiaoyuInfo.schoolName}}</label>
                  <span class="time">{{jiaoyuInfo.startDt+"  --  "+(jiaoyuInfo.endDt||jiaoyuInfo.endDtBak)}}</span>
                </div>
                <div class="project">
                  <label>专业：</label>
                  <span>{{jiaoyuInfo.project}}</span>
                </div>
                <div class="degree">
                  <label>学历：</label>
                  <span >{{jiaoyuInfo.degree}}</span>
                </div>
                <div class="neirong">
                  <label>经历：</label>
                  <span>{{jiaoyuInfo.content}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="part zhengshu">
          <div class="title">资格证书</div>
          <div class="partContent">
            <div>
              <el-tag
                v-for="tag in zhengshu.zhengshuList"
                :key="tag"
                type="success"
                class="license-tag">
                {{tag}}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="part shengya">
          <div class="title">工作经历</div>
          <div class="partContent">
            <div class="jingliContent" v-for="(jingliInfo,idx) in jingliList" :key="idx">
              <div class="jingliContent-part">
                <div class="gongsi">
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  <label>{{jingliInfo.companyName}}</label>
                  <span class="time">{{jingliInfo.startDt+"  --  "+(jingliInfo.endDt||jingliInfo.endDtBak)}}</span>
                </div>
                <div class="zhiwei">
                  <label>部门职位：</label>
                  <span>{{jingliInfo.departName+"  --  "+jingliInfo.jobName}}</span>
                  <!-- <span>{{jingliInfo.}}</span> -->
                </div>
                <div class="neirong">
                  <label>工作内容：</label><span>{{jingliInfo.task}}</span>
                </div>
                <div class="yeji">
                  <label>工作业绩：</label><span>{{jingliInfo.performance}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other">
        <div class="self">
          <div class="name">
            <h2 class="show">{{teacher.name}}</h2>
          </div>
          <div class="base">
            <p>
              <i class="el-icon-self-touxiang"></i>
              <label for="">当前状态:</label>
              {{teacher.status==1?"考虑机会":"暂不考虑"}}
            </p>
            <p>
              <i class="el-icon-self-edu"></i>
              <label for="">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</label>
              {{teacher.educationName}}
            </p>
            <p>
              <i class="el-icon-self-dianhua"></i>
              <label for="">联系电话:</label>
              {{teacher.phone}}
            </p>
            <p>
              <i class="el-icon-message"></i>
              <label for="">联系邮箱:</label>
              {{teacher.email}}
            </p>
            <p>
              <i class="el-icon-position"></i>
              <label for="">联系地址:</label>
              {{teacher.addressName}}
            </p>
          </div>
          <el-button v-if="user.id&&user.userType=='2'" type="primary" class="contactBtn" @click="addContact">立即沟通</el-button>
        </div>
        <div class="jianli">
          <div class="title">
            <h3>身份认证</h3>
          </div>
          <div class="base">
            <p>
              <i class="el-icon-s-flag"></i>
              <label for="">认证状态:</label>
              <label 
              :style="(!teacherIdenty.result)?'color:gray':teacherIdenty.result==-1?'color:orange':teacherIdenty.result==-2?'color:red':'color:green'"> 
                {{(!teacherIdenty.result)?"未申请":teacherIdenty.result==-1?"认证中...":teacherIdenty.result==-2?'认证失败':"认证成功"}}
                </label>
             
            </p>
            <p>
              <i class="el-icon-postcard"></i>
              <label for="">教资证号:</label>
              {{teacherIdenty.applyId}}
            </p>
            <p>
              <i class="el-icon-date"></i>
              <label for="">证书开始日期:</label>
              {{teacherIdenty.applyStartdt}}
            </p>
            <p>
              <i class="el-icon-date"></i>
              <label for="">证书结束日期:</label>
              {{teacherIdenty.applyEnddt}}
            </p>
          </div>
        </div>
        <div class="jianli">
          <div class="title">附件简历</div>
          <div class="partContent">
            <div class="jianliContent" v-for="(jianli,idx) in jianliList" :key="idx">
                <label class="jianli-name" for="">
                  <i class="el-icon-document"></i>
                  {{jianli.name}}
                </label>
                <div class="jianliContent-edit">
                  <a class="edit" @click="showJianli(jianli)">
                    <i class="el-icon-edit"></i>
                    <label>查看</label>
                  </a>
                </div>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tablePage from '../../../components/common/table-page.vue'
export default {
  name: 'info-vol',
  data() {
    return {
      zhiweiList:[],
      jiaoyuList:[],
      zhengshu:{},
      jingliList:[],
      jianliList:[],
      teacher:{},
      selectData:{
        education:[{
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
      },
      // 身份认证
      teacherIdenty: {},
      user:{}
    }
  },
  props: {

  },
  components:{
  },
  created(){
    let teacherId=this.$route.query.id
    this.getUserInfo(teacherId)
    this.getExpectJobs(teacherId)
    this.getJiaoyuList(teacherId)
    this.getJingliList(teacherId)
    this.getZhengshuList(teacherId)
  },
  mounted() {
  },
  methods:{
    getUserInfo(dataId=this.teacher.userId){
      this.user = JSON.parse(sessionStorage.getItem('user'))||{};
      let _this=this
      this.$request.getVolunteer({userId:dataId}).then(
        res=>{
          _this.teacher=res.data
          _this.teacher.province=res.data.address.substring(0,2)
          _this.teacher.city=res.data.address.substring(0,4)
          _this.teacher.county=res.data.address
          _this.selectData.education.forEach(edu=>{
            if(edu.code==_this.teacher.education){
              _this.teacher.educationName=edu.name
            }
          })
          _this.teacher.checkPass = ""
          // 获取认证信息
          _this.$request.getLastVolIdenty({volId:dataId}).then(res=>{
            _this.teacherIdenty = {
              ...res.data
            }
          })
          _this.teacher={..._this.teacher}
        }
      )
    },
    getExpectJobs(dataId=this.teacher.userId){
      let _this = this
      _this.zhiweiList = []
      // 期望岗位
      _this.$request.selectExpectJobByCondition({userId:dataId}).then(
        res=>{
          if(res.data.length>0){
            res.data.forEach((item,itemIdx)=>{
              let addrsList = []
              for(let i=0;i<3;i++){
                addrsList.push({
                  province:"",
                  city:"",
                  county:"",
                })
              }
              let addrs = item.addrs.split(";")
              addrs.forEach((addr,addrIdx)=>{
                addrsList[addrIdx].province=addr.substr(0,2)
                addrsList[addrIdx].city=addr.substr(0,4)
                addrsList[addrIdx].county=addr
              })
              item.addrsList = addrsList
            })
          }
          _this.zhiweiList = res.data
        }
      )
    },
    getJiaoyuList(dataId=this.teacher.userId){
      let _this = this
      _this.jiaoyuList = []
      // 教育经历
      _this.$request.selectVolEduByCondition({userId:dataId}).then(
        res=>{
          res.data.forEach(item=>{
            if(item.endDt == "至今"){
              item.endDt=""
              item.endDtBak="至今"
            }else{
              if(item.endDt.indexOf("-")<0){
                let year = item.endDt.substring(0,4)
                let month = item.endDt.substring(4,6)
                let day = item.endDt.substring(6,8)
                item.endDt = year +"-"+month+"-"+day
              }
            }
            // console.log(item.endDt.substr(0,4),item.endDt.substr(4,6),item.endDt.substr(6,8))
          })
          _this.jiaoyuList=[...res.data]
        }
      )
    },
    getJingliList(dataId=this.teacher.userId){
      let _this = this
      _this.jingliList = []
      // 教育经历
      _this.$request.selectExperienceByCondition({userId:dataId}).then(
        res=>{
          res.data.forEach(item=>{
            if(item.endDt == "至今"){
              item.endDt=""
              item.endDtBak="至今"
            }else{
              if(item.endDt.indexOf("-")<0){
                let year = item.endDt.substring(0,4)
                let month = item.endDt.substring(4,6)
                let day = item.endDt.substring(6,8)
                item.endDt = year +"-"+month+"-"+day
              }
            }
            // console.log(item.endDt.substr(0,4),item.endDt.substr(4,6),item.endDt.substr(6,8))
          })
          _this.jingliList=[...res.data]
        }
      )
    },
    getZhengshuList(dataId=this.teacher.userId){
      let _this = this
      this.zhengshu = {}
      // 资格证书
      _this.$request.selectCertificateByCondition({userId:dataId}).then(
        res=>{
          if(res.data.length>0){
            _this.zhengshu = {...res.data[0]}
            _this.zhengshu.zhengshuList=(res.data[0].name||"").split(",")
          }
        }
      )
    },
    showJianli(jianli){
      let path = jianli.filepath
      path = path.split("static")
      console.log(path)
      // let path="../../../../static/files/"+jianli.name
      window.open("../../../../static/pdfjs/web/viewer.html?file=/static" + path[1]);
    },
    addContact(){
      this.user = JSON.parse(sessionStorage.getItem('user'))||{}; 
      let _this=this
      if(this.user.id){
        let param={
          fromId:this.user.id,
          toId:_this.teacher.userId,
          content:"你好！"
        }
        _this.$request.insertChat(param).then(
          res=>{
            if(this.user.userType=="1"){
              // _this.$router.push("/user/vol/chat",param)
            }
            if(this.user.userType=="2"){
              _this.$router.push("/user/recr/chat",param)
            }

          }
        )
      }else{
        this.$message.warning("请登录")
      }
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../../static/css/main';
.info-vol{
  margin-top: 1vh;
  margin-bottom: 1vh;
  .content{
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    .jingli{
      box-shadow: 0 0 6px 0 @sixthColor;
      background-color: #fff;
      width: 56%;
      padding: 3vh 3vw;
      margin-right: 1vw;
      .part{
        padding: 1vh 2vw;
        margin-bottom: 2vh;
        border-bottom: 1px solid #eee;
        .title{
          border-left: 0.3vw solid @secondColor;
          text-align: left;
          padding-left: 1vw;
          font-size: 2.3vh;
          font-weight: 500;
        }
        .partContent{
          // background-color: #aaa;
          margin: 1vh 0;
          // margin-bottom: 10px;
          text-align: left;
          font-size: 1.8vh;
          line-height: 1;
          // letter-spacing: 1px;
          color: @mainColor;
        }
      }
      .zhiwei{
        // height: 100px;
        .zhiweiContent{
          display: flex;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .zhiweiContent-part{
            padding: 1vh;
            position: relative;
            width: 100%;
            span{
              display: block;
              margin-right: 1vw;
              font-size: 1.8vh;
              line-height: 1.8;
            }

          }
        }
      }
      .shengya{
        .jingliContent{
          display: flex;
          position: relative;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .jingliContent-part{
            padding: 1vh;
            width: 100%;
            .gongsi,.zhiwei,.neirong,.yeji{
              padding: 1vh;
              font-size: 1.7vh;
              width: 100%;
              display: flex;
              label{
                width: 4vw;
                font-size: 1.5vh;
                color: #ccc;
                line-height: 1.5;
                vertical-align: middle;
              }
              span{
                // flex: 1;
                width: 85%;
                font-size: 1.9vh;
                word-wrap:break-word;
                white-space: pre-line;
              }
            }
            .gongsi{
              font-weight: bold;
              label{
                margin-left: 0.3vw;
                font-size: 2.2vh;
                color: @mainColor;
                line-height: 1;
                width: auto;
              }
              .time{
                display: inline-block;
                font-size: 1.4vh;
                margin-left: 1vw;
                font-weight: normal;
                color:#999;
                line-height: 1.5;
                width: 30%;
              }
            }
            .neirong,.yeji{
              font-size: 2vh;
              label{
                font-weight: bold;
              }
              span{
                display: block;
                line-height: 1.2;
                width: 80%;
              }
            }
          }
        }
      }
      .jiaoyu{
        .jiaoyuContent{
          display: flex;
          position: relative;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .jiaoyuContent-part{
            padding: 1vh;
            vertical-align: middle;
            .gongsi,.project,.degree,.neirong{
              padding: 1vh;
              font-size: 1.7vh;
              display: flex;
              label{
                width: 3vw;
                font-size: 1.5vh;
                color: #ccc;
                line-height: 1.5;
                vertical-align: middle;
              }
              span{
                flex: 1;
                width: 80%;
                font-size: 1.9vh;
                word-wrap:break-word;
                white-space: pre-line;
              }
            }
            .gongsi{
              font-weight: bold;
              label{
                margin-left: 0.3vw;
                font-size: 2.2vh;
                color: @mainColor;
                line-height: 1;
                width: auto;
              }
              .time{
                display: inline-block;
                font-size: 1.4vh;
                margin-left: 1vw;
                font-weight: normal;
                color:#999;
                line-height: 1.5;
              }
            }
            .neirong{
              font-size: 2vh;
              label{
                font-weight: bold;
              }
              span{
                line-height: 1.2;
              }
            }
          }
          &:hover{
            // border: 1px solid coral;
            .jiaoyuContent-edit{
              display: block;
            }
          }
        }
      }
      .zhengshu{
      }
      .license-checked{
        display: flex;
        overflow-x: auto;
        height: 6vh;
        &::-webkit-scrollbar-track {
          background-color: @sixthColor;
        }
        &::-webkit-scrollbar {
          width: 0.2vw;
          height: 0.2vw;
        }
        &::-webkit-scrollbar-thumb {
          background-color: @thirthColor;
        }
      }
      .license-tag{
        margin-left: 0.2vw;
        margin-bottom: 0.2vw;
      }
      .license-main{
        display: flex;
        flex-wrap: wrap;
        margin-left: 2vw;
        margin-top: 2vh;
        min-height: 65vh;
        max-height: 65vh;
        // overflow: auto;
        overflow-y: auto;
        &::-webkit-scrollbar-track {
          background-color: @sixthColor;
        }
        &::-webkit-scrollbar {
          width: 0.2vw;
        }
        &::-webkit-scrollbar-thumb {
          background-color: @thirthColor;
        }
        .license-item{
          width: 21vw;
          height: 7vh;
          font-size: 1.7vh;
          .license-sub{
            cursor: pointer;
            &:hover{
              font-size: 1.8vh;
            }
          }
        }
      }
    }
    .self,.jianli{
      box-shadow: 0 0 6px 0 @sixthColor;
      margin-bottom: 2vh;
      display: flex;
      flex-direction: column;
      padding: 2vh 3vh;
      background-color: #fff;
      
      .submit-button{
        height: 4vh;
        line-height: 4vh;
        font-size: 1.7vh;
        padding: 0 2vw;
      }
      .name{
        text-align: left;
        // margin-top: 20px;
        p,h2{
          display: inline-block;
        }
        .show{
          font-size: 3vh;
          font-weight: bold;
          line-height: 1;
          letter-spacing: 3px;
        }
      }
      .base{
        margin-top: 2vh;
        p{
          text-align: left;
          padding: 0.4vw 0;
          // height: 40px;
          // font-weight: 600;
          font-size: 1.8vh;
          label{
            color:#ccc;
            font-size: 1.7vh;
          }
        }
      }
      .contactBtn{
        background-color: @thirthColor;
        border: 0.1ch solid transparent;
        border-radius: 0;
        width: 100%;
        padding: 1.6vh 3vw;
        margin-top: 2vh;
        &:hover{
          background-color: @mainColor;
        }
      }
    }
    .self{
      padding: 4vh 3vh;
    }
    .jianli{
      .title{
        border-left: 0.3vw solid @secondColor;
        text-align: left;
        padding-left: 1vw;
        font-size: 2.3vh;
        font-weight: 500;
        display: flex;
      }
      .partContent{
        margin-top: 2vh;
        .jianliContent{
          position: relative;
          margin: 1vh 0;
          text-align: left;
          .jianliContent-edit{
            position: absolute;
            left: 70%;
            top:0;
            display: none;
            // width: 100%;
            a label{
              cursor: pointer;
            }
            a.edit{
              display: inline-block;
              // opacity: 0;
              font-size: 1.6vh;
              cursor: pointer;
              margin-left: 2vw;
              color: #aaa;
              &:hover{
                color: coral;
              }
              vertical-align: middle;
            }
          }
          &:hover{
            .jianliContent-edit{
              display: inline-block;
            }
          }
          label.jianli-name{
            width: 10vw;
            display: block;
            font-size: 1.7vh;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../../static/css/main';
.info-vol{
  .partContent{
    .el-textarea__inner{
      height: 300px;
    }
  }
  .jianli{
    .title{
      h3{
        font-size: 2.3vh;
        font-weight: 500;
      }
      .el-button{
        font-size: 1.7vh;
        cursor: pointer;
        margin-left: 1vw;
        padding: 0;
        color: #aaa;
        &:hover{
          color: coral;
        }

      }
    }
  }
}
</style>