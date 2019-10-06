<template>
  <div class="post-list">
    <editPost class="edit-school" v-if="addPostFlag" @cancel="cancel" @onSubmit="onSubmit"
    :typeIdx="typeIdx"></editPost>
    <div class="table-school" v-else>
      <h1>我发表的帖子</h1>
      <div class="postTop">
        <div class="feature">
          <el-button type="primary" @click="addPost">发表帖子</el-button>
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
import editPost from './edit-post.vue'
import inputSelect from '../../components/common/input-select.vue'
import tablePage from '../../components/common/table-page.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'post-list',
  data() { 
    return {
      addPostFlag:false,
      typeIdx:-1,
      tableData:[{
        postName:"光明小学",
        postAddr:"XX省XX市XX区XX镇XX村",
        postScale:"80人",
        postDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        postEstablish:"2000年10月10日",
        },{
        postName:"希望小学",
        postAddr:"XX省XX市XX区",
        postScale:"80人",
        postDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        postEstablish:"2000年10月10日",
        },{
        postName:"光明小学",
        postAddr:"XX省XX市XX县XX镇XX村",
        postScale:"80人",
        postDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        postEstablish:"2000年10月10日",
        }],
      tableTitles:[{
          prop: "title",
          label: "帖子名",
          width: "170",
          fixed: true,
        },{
          prop: "establishDt",
          label: "发表时间",
          width: "170"
        },{
          prop: "statusName",
          label: "帖子状态",
          width: "230"
        }],
      tableConf:{
        // 表格按钮操作列(是否需要，列头，操作按钮列表)
        operation:true,
        // operaHeader:{
        //   id:"edit",
        //   text:"修改信息",
        //   size:"medium",
        //   type:"primary",
        //   click:()=>{
        //     console.log(this.$refs.tbMain.$refs.elTb.tableData)
        //   }
        // },
        btns:[{
          id:"volunteer",
          text:"查看/修改帖子",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            this.addPostFlag=true
            this.typeIdx=val.id
          }
        },{
          id:"delete",
          text:"删除帖子",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            val.status=-1
            let _this=this
            _this.$request.updatePost(val).then(
              res=>{
                _this.$message.success("删除成功")
                _this.getUserInfo(_this.user.userId)
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
          model: "postName",
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
    editPost
  },
  mounted() {
    this.selectData=this.selectDataAddr
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getUserInfo(this.user.userId)
  },
  methods:{
    getUserInfo(dataId){
      let _this=this
      _this.tableData=[]
      // _this.$request.getRecuriter({userId:dataId}).then(
        // res=>{
          // _this.recruiter=res.data

          // 文章列表
          _this.$request.selectPostByCondition({userId:dataId}).then(
            res=>{
              console.log("getArticle",res.data)
              _this.tableData=res.data
              _this.tableData.forEach(data=>{
                data.articleId = data.id
                data.statusName=""
                if(data.status==0){
                  data.statusName="正常"

                }
                if(data.status==-1){
                  data.statusName="删除"

                }
                if(data.status==-2){
                  data.statusName="被举报"

                }
              })
              console.log(_this.tableData)
            }
          )
        // }
      // )
    },
    addPost(){
      this.typeIdx=-1
      this.addPostFlag=true
    },
    cancel(){
      this.addPostFlag=false
    },
    onSubmit(post){
      this.addPostFlag=false
      let _this=this
      console.log(post)
      // let _this=this
      if(_this.typeIdx==-1){
        // 添加学校
        post.authorId=this.user.userId
        this.$request.insertPost(post).then(
          res=>{
            console.log(res)
            _this.getUserInfo(_this.user.userId)
          }
        )
      }
      else{
        // school.userId=this.recruiter.userId
        
        this.$request.updatePost(post).then(
          res=>{
            _this.getUserInfo(_this.user.userId)
          }
        )
      }
    }

  },
 }
</script>

<style lang="less" scoped>
.post-list{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 20px;
  }
  .postTop{
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