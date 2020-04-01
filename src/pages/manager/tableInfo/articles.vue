<template>
  <div class="article-accuse-table">
    <h1>文章举报处理</h1>
    <tablePage ref="tbMain" :tableTitles="tableTitles"
      :tableData="tableData"
      :isLoading="false"
      :tableConf="tableConf" class="tablepage">
    </tablePage>
    <el-dialog title="文章" :visible.sync="identityDialog" top="3vh" width="80%">
      <!-- <div class="identity-detail">
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
                <img v-for="image in currentIdentity.images" :src="image" alt="">
            </template>
            </div>
        </div>
      </div> -->
      <template slot="footer">
        <el-button type="success" @click="submitIdentity">信息正常</el-button>
        <el-button type="warning" @click="cancelIdentity">信息有误</el-button>
      </template>
      <articleInfo :article="currentIdentity.article" :author="currentIdentity.author"></articleInfo>
    </el-dialog>
  </div>
</template>

<script>
import inputSelect from '../../../components/common/input-select.vue'
import tablePage from '../../../components/common/table-page.vue'
import pagination from '../../../components/common/pagination.vue'
import articleInfo from '../detailInfo/info-article'
export default {
  name: 'recruiterIdentity',
  data() { 
    return {
      tableData:[],
      tableTitles:[{
          prop: "articleName",
          label: "文章名"
        },{
          prop: "articleDt",
          label: "发表日期"
        },{
          prop: "authorName",
          label: "发表人"
        },{
          prop: "accuseName",
          label: "举报人"
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
          text:"信息正常",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.currentIdentity = val
            this.submitIdentity()
          }
        },{
          id:"delete",
          text:"信息有误",
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
    inputSelect,
    articleInfo
  },
  mounted() {
    this.initData()
  },
  methods:{
    initData(){
      this.$request.selectAccuseByCondition({accuseType:1,accuseResult:0}).then(res=>{
        res.data.forEach(item=>{
          item.articleName = ""
          item.articleDt = ""
          item.authorName = ""
          item.accuseName = ""
          this.$request.selectArticleById({articleId:item.accuseId}).then(articleRes=>{
            item.articleName = articleRes.data.title
            item.articleDt = articleRes.data.establishDt
            if(articleRes.data.imgs!="[]"){
              articleRes.data.images = articleRes.data.imgs
                .substr(1, articleRes.data.imgs.length - 2)
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
              articleRes.data.images=[]
            }
            item.article = articleRes.data
            this.$request.getUser({userId:articleRes.data.authorId}).then(userRes=>{
              item.authorName = userRes.data.name
              // console.log(item,{userId:item.userId},userRes.data)
              if(userRes.data.userType == "1"){
                this.$request.getVolunteer({userId:articleRes.data.authorId}).then(authorRes=>{
                  item.author = authorRes.data
                })
              }
              if(userRes.data.userType == "2"){
                this.$request.getRecuriter({userId:articleRes.data.authorId}).then(authorRes=>{
                  item.author = authorRes.data
                })
              }
            })
          })
          this.$request.getUser({userId:item.userId}).then(userRes=>{
            item.accuseName = userRes.data.name
            // console.log(item,{userId:item.userId},userRes.data)
            if(userRes.data.userType == "1"){
              this.$request.getVolunteer({userId:item.userId}).then(accuseRes=>{
                item.accuse = accuseRes.data
              })
            }
            if(userRes.data.userType == "2"){
              this.$request.getRecuriter({userId:item.userId}).then(accuseRes=>{
                item.accuse = accuseRes.data
              })
            }
          })
        })
        this.tableData = res.data
      })
    },
    submitIdentity(){
      this.currentIdentity.result = 1
      this.$request.updateAccuse({id:this.currentIdentity.id,accuseRes:this.currentIdentity.result}).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    },
    cancelIdentity(){
      this.currentIdentity.result = -1
      this.$request.updateAccuse({id:this.currentIdentity.id,accuseRes:this.currentIdentity.result}).then(res=>{
        this.initData()
        this.identityDialog=false
        this.$message.success("处理成功")
      })
    }
  },
 }
</script>

<style lang="less" scoped>
.article-accuse-table{
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