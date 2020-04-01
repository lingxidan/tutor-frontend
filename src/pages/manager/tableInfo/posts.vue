<template>
  <div class="post-accuse-table">
    <h1>文章举报处理</h1>
    <tablePage ref="tbMain" :tableTitles="tableTitles"
      :tableData="tableData"
      :isLoading="false"
      :tableConf="tableConf" class="tablepage">
    </tablePage>
    <el-dialog title="文章" :visible.sync="identityDialog" top="3vh" width="80%">
      <template slot="footer">
        <el-button type="success" @click="submitIdentity">信息正常</el-button>
        <el-button type="warning" @click="cancelIdentity">信息有误</el-button>
      </template>
      <postInfo :post="currentIdentity.post" :author="currentIdentity.author"></postInfo>
    </el-dialog>
  </div>
</template>

<script>
import inputSelect from '../../../components/common/input-select.vue'
import tablePage from '../../../components/common/table-page.vue'
import pagination from '../../../components/common/pagination.vue'
import postInfo from '../detailInfo/info-post'
export default {
  name: 'recruiterIdentity',
  data() { 
    return {
      tableData:[],
      tableTitles:[{
          prop: "postName",
          label: "文章名"
        },{
          prop: "postDt",
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
    postInfo
  },
  mounted() {
    this.initData()
  },
  methods:{
    initData(){
      this.$request.selectAccuseByCondition({accuseType:2,accuseResult:0}).then(res=>{
        res.data.forEach(item=>{
          item.postName = ""
          item.postDt = ""
          item.authorName = ""
          item.accuseName = ""
          this.$request.selectPostById({postId:item.accuseId}).then(postRes=>{
            item.postName = postRes.data.title
            item.postDt = postRes.data.establishDt
            if(postRes.data.imgs!="[]"){
              postRes.data.images = postRes.data.imgs
                .substr(1, postRes.data.imgs.length - 2)
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
              postRes.data.images=[]
            }
            item.post = postRes.data
            this.$request.getUser({userId:postRes.data.authorId}).then(userRes=>{
              item.authorName = userRes.data.name
              // console.log(item,{userId:item.userId},userRes.data)
              if(userRes.data.userType == "1"){
                this.$request.getVolunteer({userId:postRes.data.authorId}).then(authorRes=>{
                  item.author = authorRes.data
                })
              }
              if(userRes.data.userType == "2"){
                this.$request.getRecuriter({userId:postRes.data.authorId}).then(authorRes=>{
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
.post-accuse-table{
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