<template>
  <div class="table">
    <h1>被举报职位</h1>
    <div class="schoolTop">
      <input-select ref="totalSel" :inputs="inputData" :selects="selectData" :searchBtn="true" @search="search"></input-select>

    </div>
    <tablePage ref="tbMain" :tableTitles="tableTitles"
      :tableData="tableData"
      :isLoading="false"
      :tableConf="tableConf" class="tablepage"></tablePage>
    <pagination :paginationConf="paginationConf" :currentPage="paginationConf.currentPage" @pageChange="pageChange"></pagination>
  </div>
</template>

<script>
import inputSelect from '../../../components/common/input-select.vue'
import tablePage from '../../../components/common/table-page.vue'
import pagination from '../../../components/common/pagination.vue'
export default {
  name: 'zhiweiManage',
  data() { 
    return {
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
          prop: "zhiweiName",
          label: "职位名称",
          width: "170",
          fixed: true,
        },{
          prop: "zhiweiSch",
          label: "所属学校",
          width: "170"
        },{
          prop: "zhiweiScale",
          label: "招募人数",
          width: "100"
        },{
          prop: "zhiweiDuring",
          label: "在职时间",
          width: "180"
        },{
          prop: "zhiweiDesc",
          label: "职位描述",
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
          id:"detail",
          text:"查看",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
          }
        },{
          id:"edit",
          text:"无误",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
          }
        },{
          id:"delete",
          text:"删除",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
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
    this.selectData=this.selectDataAddr
  },
  methods:{

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
    }
  }
  
  .tablepage{
    width: 100%;
  }

}
</style>