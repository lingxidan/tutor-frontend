<template>
  <div class="table">
    <h1>招募者认证</h1>
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
  name: 'rescruiter',
  data() { 
    return {
      tableData:[{
        rescruiterName:"曾X",
        rescruiterAddr:"XX省XX市XX区XX镇XX村",
        rescruiterPhone:"239847",
        rescruiterIdentify:"教育局人士",
        rescruiterIdCard:"12876118845978x",
        rescruiterDate:"2000年10月10日",
        rescruiterDesc:"热情开朗，欢迎各位有识之士",
        },{
        rescruiterName:"王ee",
        rescruiterAddr:"XX省XX市XX区",
        rescruiterPhone:"10337465",
        rescruiterIdentify:"校长",
        rescruiterIdCard:"12876123445978x",
        rescruiterDate:"2000年10月10日",
        rescruiterDesc:"热情开朗，欢迎各位有识之士",
        },{
        rescruiterName:"张KK",
        rescruiterAddr:"XX省XX市XX县XX镇XX村",
        rescruiterPhone:"1023857563",
        rescruiterIdentify:"副校长",
        rescruiterIdCard:"12876118823978x",
        rescruiterDate:"2000年10月10日",
        rescruiterDesc:"热情开朗，欢迎各位有识之士",
        }],
      tableTitles:[{
          prop: "rescruiterName",
          label: "招募者",
          width: "170",
          fixed: true,
        },{
          prop: "rescruiterIdentify",
          label: "身份",
          width: "170"
        },{
          prop: "rescruiterIdCard",
          label: "证件号码",
          width: "170"
        },{
          prop: "rescruiterAddr",
          label: "联系地址",
          width: "170"
        },{
          prop: "rescruiterPhone",
          label: "联系电话",
          width: "180"
        },{
          prop: "rescruiterDate",
          label: "申请时间",
          width: "180"
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
          text:"通过",
          size:"medium",
          type:"primary",
          click:(val)=>{
            console.log(val)
          }
        },{
          id:"delete",
          text:"驳回",
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
          placeholder: "招募者名称",
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
    }
  }
  .tablepage{
    width: 100%;
  }

}
</style>