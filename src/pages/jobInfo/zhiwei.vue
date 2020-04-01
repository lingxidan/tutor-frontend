<template>
  <div class="table">
    <el-dialog title="职位管理" :visible.sync="editVisible" top="2vh" width="50%" :destroy-on-close="true">
      <editJob class="edit-school" @cancel="editVisible = false" @onSubmit="onSubmit"
      :typeIdx="typeIdx"></editJob>
    </el-dialog>
    <div class="table-school">
      <div class="schoolTop">
        <h1>职位信息</h1>
        <div class="feature">
          <el-button type="primary" @click="addJob" class="add-btn">添加职位</el-button>
        </div>
        <!-- <input-select ref="totalSel" :inputs="inputData" :selects="selectData" :searchBtn="true" @search="search"></input-select> -->

      </div>
      <tablePage ref="tbMain" :tableTitles="tableTitles"
        :tableData="tableData"
        :isLoading="false"
        :tableConf="tableConf" class="tablepage" :tableCellStyle="tableCellStyle"></tablePage>
      <!-- <pagination :paginationConf="paginationConf" :currentPage="paginationConf.currentPage" @pageChange="pageChange"></pagination> -->
    </div>
  </div>
</template>

<script>
import editJob from './edit-job.vue'
import inputSelect from '../../components/common/input-select.vue'
import tablePage from '../../components/common/table-page.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'zhiweiInfo',
  data() { 
    return {
      typeIdx:-1,
      editVisible: false,
      tableData:[],
      tableTitles:[{
          prop: "name",
          label: "职位名称",
          // width: "170"
        },{
          prop: "schoolName",
          label: "所属学校",
          width: "170"
        },{
          prop: "addressName",
          label: "地理位置",
          // width: "100"
        },{
          prop: "education",
          label: "科目等级",
          width: "170"
        },{
          prop: "statuName",
          label: "职位状态",
          width: "170"
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
            this.editVisible=true
          }
        },{
          id:"delete",
          text:"关闭职位",
          size:"medium",
          type:"text",
          click:(val)=>{
            val.status=-1
            let _this=this
            this.$request.updateJob(val).then(
              res=>{
                _this.$message.success("关闭成功")
                _this.initData()
              }
            )
          }
        },{
          id:"delete",
          text:"重新发布",
          size:"medium",
          type:"text",
          click:(val)=>{
            val.status=1
            let _this=this
            this.$request.updateJob(val).then(
              res=>{
                _this.$message.success("发布成功")
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
          placeholder: "职位名称",
          model: "zhiweiName",
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
          placeholder: "所属学校",
          model: "school",
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
      selectData:[]
    }
  },
  props: {

  },
  components:{
    tablePage,
    pagination,
    inputSelect,
    editJob
  },
  mounted() {
    this.selectData=this.selectDataAddr
    this.recruiter = JSON.parse(sessionStorage.getItem('user'));
    this.initData()
  },
  methods:{
    initData(){
      let _this=this
      _this.tableData=[]
          // 学校
      _this.$request.selectJobByCondition({userId:this.recruiter.id}).then(
        res=>{
          _this.tableData=res.data
          _this.tableData.forEach(data=>{
            let schoolId=data.schoolId
            _this.$request.selectSchoolById({schoolId}).then(
              res=>{
                data.schoolName=res.data.name
                data.addressName=res.data.addressName
                if(data.status==1){
                  data.statuName="正常"
                }
                if(data.status==-1){
                  data.statuName="已关闭"
                }
                _this.tableData=[..._this.tableData]
                // data={...data}
              }
            )
          })
        }
      )
    },
    addJob(){
      this.typeIdx=-1
      this.editVisible = true
    },
    onSubmit(job){
      let _this=this
      job.userId = this.recruiter.id
      let formData = new FormData();
      Object.keys(job).forEach(key=>{
        formData.append(key,job[key])
      })
      if(_this.typeIdx==-1){
        // 添加学校
        this.$request.insertJob(formData).then(
          res=>{
            this.editVisible=false
            _this.initData()
          }
        )
      }
      else{
        // school.userId=this.recruiter.userId
        this.$request.updateJob(formData).then(
          res=>{
            this.editVisible=false
            _this.initData()
          }
        )
      }
    },
    tableCellStyle(row){
      if(row.column.property == "statuName")
      switch(row.row.status){
        case -1:
          return "color:red"
        case 0:
          return "color:orange"
        case 1:
          return "color:green"
      }
    }

  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.table{
  width: 100%;
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
    width: 90vw;
    max-height: 90vh;
    overflow: auto;
    flex: 1;
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
