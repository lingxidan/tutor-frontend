<template>
  <div class="table">
    <el-dialog title="学校管理" :visible.sync="editVisible" top="2vh" width="50%" :destroy-on-close="true">
      <editSchool class="edit-school" @cancel="editVisible = false" @onSubmit="onSubmit"
      :typeIdx="typeIdx"></editSchool>
    </el-dialog>
    <div class="table-school">
      <div class="schoolTop">
          <h1>学校信息</h1>
        <div class="feature">
          <el-button type="primary" @click="addSchool" class="add-btn">添加学校</el-button>
        </div>
      </div>
      <tablePage ref="tbMain" :tableTitles="tableTitles"
        :tableData="tableData"
        :isLoading="false"
        :tableConf="tableConf" class="tablepage"></tablePage>
      <!-- <pagination :paginationConf="paginationConf" :currentPage="paginationConf.currentPage"></pagination> -->
    </div>
  </div>
</template>

<script>
import editSchool from './edit-school.vue'
import inputSelect from '../../components/common/input-select.vue'
import tablePage from '../../components/common/table-page.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'schInfo',
  data() { 
    return {
      typeIdx:-1,
      editVisible: false,
      tableData:[],
      tableTitles:[{
          prop: "name",
          label: "学校名称",
        },{
          prop: "addressName",
          label: "学校地址",
        },{
          prop: "education",
          label: "学校教育",
        },{
          prop: "establishDt",
          label: "创建时间",
        }],
      tableConf:{
        // 表格按钮操作列(是否需要，列头，操作按钮列表)
        operation:true,
        btns:[{
          id:"edit",
          text:"修改信息",
          size:"medium",
          type:"text",
          click:(val)=>{
            this.typeIdx=val.id
            this.editVisible = true
          }
        },{
          id:"delete",
          text:"删除学校",
          size:"medium",
          type:"text",
          click:(val)=>{
            val.status=-1
            let _this=this
            this.$request.deleteSchoolById({schoolId:val.id}).then(
              res=>{
                _this.getSchoolList(_this.recruiter.userId)
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
          model: "schoolName",
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
    editSchool
  },
  mounted() {
    this.selectData=this.selectDataAddr
    this.recruiter = JSON.parse(sessionStorage.getItem('user'));
    this.getSchoolList()
  },
  methods:{
    getSchoolList(){
      let _this=this
      // 学校
      _this.$request.selectSchoolByCondition({userId:this.recruiter.id}).then(
        res=>{
          _this.tableData=res.data
        }
      )
    },
    addSchool(){
      this.typeIdx=-1
      this.editVisible = true
    },
    onSubmit(school){
      let _this=this
      let formData = new FormData();
      let image = (school.image||[]).map(item=>item.raw)
      image.forEach(item=>{formData.append('image', item)})
      formData.append("image", image)
      formData.append("name", school.name)
      formData.append("address", school.address)
      formData.append("establishDt", school.establishDt.replace(/-/g, ""))
      formData.append("education", school.education)
      formData.append("userId", this.recruiter.id)
      formData.append("descr", school.descr)
      formData.append("frontPath", this.$rootPath)
      if(_this.typeIdx==-1){
        // 添加学校
        this.$request.insertSchool(formData).then(
          res=>{
            _this.getSchoolList()
            _this.editVisible = false
          }
        )
      }
      else{
        formData.append("imgs", school.imgs)
        formData.append("id", school.id)
        formData.append("addressName", school.addressName)
        formData.append("status", school.status)
        // school.userId=this.recruiter.userId
        this.$request.updateSchool(formData).then(
          res=>{
            _this.getSchoolList()
            _this.editVisible = false
          }
        )
      }
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.table{
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 3vh;
    padding-left: 3.5vw;
    line-height: 1.4;
  }
  .schoolTop{
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
