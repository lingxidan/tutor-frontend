<template>
  <div class="article-list">
    <el-dialog title="文章管理" :visible.sync="editVisible" top="2vh" width="50%" :destroy-on-close="true">
      <editArticle class="edit-school" @cancel="editVisible = false" @onSubmit="onSubmit"
      :typeIdx="typeIdx"></editArticle>
    </el-dialog>
    <div class="table-school">
      <div class="articleTop">
      <h1>我发表的文章</h1>
        <div class="feature">
          <el-button type="primary" @click="addArticle" class="add-btn">发表文章</el-button>
        </div>
        <!-- <input-select ref="totalSel" :inputs="inputData" :selects="selectData" :searchBtn="true" @search="search"></input-select> -->

      </div>
      <tablePage ref="tbMain" :tableTitles="tableTitles"
        :tableData="tableData"
        :isLoading="false"
        :tableConf="tableConf" class="tablepage"></tablePage>
      <!-- <pagination :paginationConf="paginationConf" :currentPage="paginationConf.currentPage" @pageChange="pageChange"></pagination> -->
    </div>
  </div>
</template>

<script>
import editArticle from './edit-article.vue'
import inputSelect from '../../components/common/input-select.vue'
import tablePage from '../../components/common/table-page.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'article-list',
  data() { 
    return {
      editVisible:false,
      typeIdx:-1,
      tableData:[],
      tableTitles:[{
          prop: "title",
          label: "文章名"
        },{
          prop: "establishDt",
          label: "发表时间"
        },{
          prop: "msgCount",
          label: "评论数",
          width: "170"
        },{
          prop: "attentionCount",
          label: "收藏数",
          width: "170"
        }],
      tableConf:{
        // 表格按钮操作列(是否需要，列头，操作按钮列表)
        operation:true,
        btns:[{
          id:"volunteer",
          text:"查看",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.$router.push({path:'/article',query:{id:val.id}})
          }
        },{
          id:"volunteer",
          text:"修改文章",
          size:"medium",
          type:"text",
          click:(val)=>{
            // console.log(val)
            this.editVisible=true
            this.typeIdx=val.id
          }
        },{
          id:"delete",
          text:"删除文章",
          size:"medium",
          type:"text",
          click:(val)=>{
            // console.log(val)
            val.status=-1
            let _this=this
            _this.$request.deleteArticle({articleId:val.id}).then(
              res=>{
                _this.$message.success("删除成功")
                _this.initData()
              }
            )
          }
        }]
      },
      paginationConf:{
        sizes: [10, 20, 50, 100],
        size: 20,
        total: 500,
      },
      inputData:[{
          placeholder: "学校名称",
          model: "articleName",
          width: 170
        }],
      selectDataAddr: [{
          placeholder: "省",
          model: "province",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[0].clear()
            request.getCity({
                code: val,
                level: 2
              })
              .then(
                res => {
                  _this.selectDataAddr[1].options = res.data
                }
              )
          },
          clear: () => {
            let _this = this
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'city','')
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'town','')
            _this.selectDataAddr[1].options = []
            _this.selectDataAddr[2].options = []
          },
          options: []
        },
        {
          placeholder: "市",
          model: "city",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[1].clear()
            request.getCity({
                code: val,
                level: 3
              })
              .then(
                res => {
                  _this.selectDataAddr[2].options = res.data
                }
              )
          },
          clear: () => {
            let _this = this
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'town','')
            _this.selectDataAddr[2].options = []
          },
          options: []
        },
        {
          placeholder: "县/区",
          model: "town",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[2].clear()
          },
          clear: () => {},
          options: []
        },
        {
          placeholder: "学校规模",
          model: "scale",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[2].clear()
          },
          clear: () => {},
          options: []
        }
      ],
      selectData:[],

    }
  },
  props: {

  },
  components:{
    tablePage,
    pagination,
    inputSelect,
    editArticle
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.initData()
  },
  mounted() {
  },
  methods:{
    initData(){
      let _this=this
      _this.tableData=[]
      // 文章列表
      _this.$request.selectArticleByCondition({userId:this.user.id}).then(
        res=>{
          res.data.forEach(data=>{
            data.msgCount = 0
            data.attentionCount = 0
            this.$request.selectCommentByCondition({type:1,mainId:data.id}).then(res=>{
              data.msgCount = res.data.length
            })
            this.$request.selectAttentionByCondition({collectType:1,userId:this.user.id,collectId:data.id}).then(res=>{
              data.attentionCount = res.data.length
            })
          })
          _this.tableData=res.data
        }
      )
    },
    addArticle(){
      this.typeIdx=-1
      this.editVisible=true
    },
    onSubmit(article){
      let _this=this
      article.authorId=this.user.id
      let formData = new FormData();
      console.log(article, formData)
      let image = (article.image||[]).map(item=>item.raw)
      image.forEach(item=>{formData.append('image', item)})
      formData.append("image", image)
      formData.append("title", article.title)
      formData.append("content", article.content)
      formData.append("authorId", article.authorId)
      formData.append("frontPath", this.$rootPath)
      console.log(article, formData)
      if(_this.typeIdx==-1){
        // 添加学校
        this.$request.insertArticle(formData).then(
          res=>{
            // console.log(res)
            this.editVisible=false
            _this.initData()
          }
        )
      }
      else{
        formData.append("imgs", article.imgs)
        formData.append("id", article.id)
        this.$request.updateArticle(formData).then(
          res=>{
            this.editVisible=false
            _this.initData()
          }
        )
      }
    }

  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.article-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  h1{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 3vh;
    padding-left: 3.5vw;
    line-height: 1.4;
  }
  .articleTop{
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: center;
    margin-top: 1vh;
    margin-bottom: 1vh;
    .feature{
      margin-left: 5vw;
      padding: 1vh;
      .add-btn{
        background-color: @thirthColor;
        border-color: @sixthColor;
        padding: 1.4vh 1vw;
        font-size: 1.6vh;
        border-radius: 4px;
        &:hover{
          background: none;
          color: @secondColor;
          border-color: @sixthColor;
        }
      }
    }
  }
  .tablepage{
    width: 100%;
    max-height: 90vh;
    overflow: auto;
    // margin-bottom: 2vh;
  }
  .table-school{
    width: 100%;
  }
  .edit-school{
    width: 100%;
    // position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 100;
  }

}
</style>
<style lang="less">
.table{
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
  }
}
</style>