<template>
  <div class="table">
    <editJob class="edit-school" v-if="addJobFlag" @cancel="cancel" @onSubmit="onSubmit"
    :typeIdx="typeIdx"></editJob>
    <div class="table-school" v-else>
      <h1>职位信息</h1>
      <div class="schoolTop">
        <div class="feature">
          <el-button type="primary" @click="addJob">添加职位</el-button>
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
import editJob from './edit-job.vue'
import inputSelect from '../../components/common/input-select.vue'
import tablePage from '../../components/common/table-page.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'zhiweiInfo',
  data() { 
    return {
      addJobFlag:false,
      tableData:[{
        zhiweiName:"数学教师",
        zhiweiSch:"光明小学",
        zhiweiScale:"10人",
        zhiweiDesc:"教授小学-初中数学课程",
        zhiweiDuring:"5年",
        },{
        zhiweiName:"语文教师",
        zhiweiSch:"希望小学",
        zhiweiScale:"5人",
        zhiweiDesc:"教授小学-初中语文课程",
        zhiweiDuring:"1年",
        },{
        zhiweiName:"体育教师",
        zhiweiSch:"光明小学",
        zhiweiScale:"3人",
        zhiweiDesc:"教授小学-初中体育课程",
        zhiweiDuring:"3年",
        }],
      tableTitles:[{
          prop: "name",
          label: "职位名称",
          width: "170",
          fixed: true,
        },{
          prop: "schoolName",
          label: "所属学校",
          width: "170"
        },{
          prop: "addressName",
          label: "所处位置",
          width: "100"
        },{
          prop: "education",
          label: "科目等级",
          width: "230"
        },{
          prop: "descr",
          label: "职位描述",
          width: "230"
        },{
          prop: "statusName",
          label: "职位状态",
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
          id:"edit",
          text:"修改信息",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            this.typeIdx=val.id
            this.addJobFlag=true
          }
        },{
          id:"delete",
          text:"关闭职位",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            val.status=-1
            let _this=this
            this.$request.updateJob(val).then(
              res=>{
                _this.$message.success("关闭成功")
                _this.getUserInfo(_this.recruiter.userId)
              }
            )
          }
        },{
          id:"delete",
          text:"重新发布",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            val.status=0
            let _this=this
            this.$request.updateJob(val).then(
              res=>{
                _this.$message.success("发布成功")
                _this.getUserInfo(_this.recruiter.userId)
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
      selectData:[],
      typeIdx:-1
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
    this.getUserInfo(this.recruiter.userId)
  },
  methods:{
    getUserInfo(dataId){
      let _this=this
      _this.tableData=[]
      _this.$request.getRecuriter({userId:dataId}).then(
        res=>{
          _this.recruiter=res.data

          // 学校
          _this.$request.selectJobByCondition({userId:dataId}).then(
            res=>{
              console.log("getSchool",res.data)
              _this.tableData=res.data
              _this.tableData.forEach(data=>{
                let schoolId=data.schoolId
                _this.$request.selectSchoolById({schoolId}).then(
                  res=>{
                    console.log("获取",res.data)
                    data.schoolName=res.data.name
                    data.addressName=res.data.addressName
                    if(data.status==0){
                      data.statusName="正常"
                    }
                    if(data.status==-1){
                      data.statusName="已关闭"
                    }
                    _this.tableData=[..._this.tableData]
                    // data={...data}
                  }
                )
                // data={...data}
                // let province=data.address.substring(0,2)
                // let city=data.address.substring(0,4)
                // let county=data.address.substring(0,6)
              })
              console.log(_this.tableData)
            }
          )
        }
      )
    },
    addJob(){
      this.typeIdx=-1
      this.addJobFlag=true
    },
    cancel(){
      this.addJobFlag=false
    },
    onSubmit(job){
      this.addJobFlag=false
      let _this=this
      console.log(job)
      // let _this=this
      if(_this.typeIdx==-1){
        // 添加学校
        job.userId=this.recruiter.userId
        this.$request.insertJob(job).then(
          res=>{
            console.log(res)
            _this.getUserInfo(_this.recruiter.userId)
          }
        )
      }
      else{
        // school.userId=this.recruiter.userId
        this.$request.updateJob(job).then(
          res=>{
            _this.getUserInfo(_this.recruiter.userId)
          }
        )
      }
    }

  },
 }
</script>

<style lang="less" scoped>
.table{
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 22px;
  }
  .schoolTop{
    width: 100%;
    display: flex;
    .feature{
      margin-left: 30px;
      width: 10%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
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