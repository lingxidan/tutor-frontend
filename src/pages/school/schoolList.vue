<template>
  <div class="table">
    <editSchool class="edit-school" v-if="addSchoolFlag" @cancel="cancel" @onSubmit="onSubmit"
    :typeIdx="typeIdx"></editSchool>
    <div class="table-school" v-else>
      <h1>学校信息</h1>
      <div class="schoolTop">
        <div class="feature">
          <el-button type="primary" @click="addSchool">添加学校</el-button>
        </div>
        <!-- <input-select ref="totalSel" :inputs="inputData" :selects="selectData" :searchBtn="true" @search="search"></input-select> -->

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
      addSchoolFlag:false,
      tableData:[{
        schoolName:"光明小学",
        schoolAddr:"XX省XX市XX区XX镇XX村",
        schoolScale:"80人",
        schoolDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        schoolEstablish:"2000年10月10日",
        },{
        schoolName:"希望小学",
        schoolAddr:"XX省XX市XX区",
        schoolScale:"80人",
        schoolDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        schoolEstablish:"2000年10月10日",
        },{
        schoolName:"光明小学",
        schoolAddr:"XX省XX市XX县XX镇XX村",
        schoolScale:"80人",
        schoolDesc:"2000年10月10日建立，学校学生由10人增加到80人",
        schoolEstablish:"2000年10月10日",
        }],
      tableTitles:[{
          prop: "name",
          label: "学校名称",
          width: "170",
          fixed: true,
        },{
          prop: "addressName",
          label: "学校地址",
          width: "170"
        },{
          prop: "scale",
          label: "学校规模",
          width: "100"
        },{
          prop: "establishDt",
          label: "创建时间",
          width: "180"
        },{
          prop: "descr",
          label: "学校简介",
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
            this.addSchoolFlag=true
          }
        },{
          id:"delete",
          text:"删除学校",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
            val.status=-1
            let _this=this
            this.$request.deleteSchoolById({schoolId:val.id}).then(
              res=>{
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
    this.getUserInfo(this.recruiter.userId)
    
  },
  methods:{
    getUserInfo(dataId){
      let _this=this
      _this.$request.getRecuriter({userId:dataId}).then(
        res=>{
          _this.recruiter=res.data
          // _this.recruiter.province=res.data.address.substring(0,2)
          // _this.recruiter.city=res.data.address.substring(0,4)
          // _this.recruiter.county=res.data.address
          // _this.recruiter.status=_this.recruiter.identify.substring(0,1)
          // let identyName=_this.recruiter.identify.substring(1,_this.recruiter.identify.length)
          // _this.recruiter.identyName=identyName

          // 学校
          _this.$request.selectSchoolByCondition({userId:dataId}).then(
            res=>{
              console.log("getSchool",res.data)
              _this.tableData=res.data
              // _this.tableData.forEach(data=>{
              //   let province=data.address.substring(0,2)
              //   let city=data.address.substring(0,4)
              //   let county=data.address.substring(0,6)

              // })
            }
          )
        }
      )
    },
    addSchool(){
      this.typeIdx=-1
      this.addSchoolFlag=true
    },
    cancel(){
      this.addSchoolFlag=false
    },
    onSubmit(school){
      this.addSchoolFlag=false
      let _this=this
      console.log(school)
      // let _this=this
      if(_this.typeIdx==-1){
        // 添加学校
        school.userId=this.recruiter.userId
        this.$request.insertSChool(school).then(
          res=>{
            console.log(res)
            _this.getUserInfo(_this.recruiter.userId)
          }
        )
      }
      else{
        // school.userId=this.recruiter.userId
        this.$request.updateSchool(school).then(
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
    font-size: 20px;
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