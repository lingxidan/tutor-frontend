<template>
  <div class="table">
    <h1>被举报文章</h1>
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
  name: 'articles',
  data() { 
    return {
      tableData:[{
        articleName:"记支教的那些趣事",
        articleAuthor:"曾老师",
        articleStatus:"已发表",
        articleReaders:"1000",
        articleComments:"100",
        articleDate:"2018年10月5日"
        },{
        articleName:"记支教的那些趣事",
        articleAuthor:"曾老师",
        articleStatus:"已删除",
        articleReaders:"1000",
        articleComments:"100",
        articleDate:"2018年10月5日"
        },{
        articleName:"记支教的那些趣事",
        articleAuthor:"曾老师",
        articleStatus:"已发表",
        articleReaders:"1000",
        articleComments:"100",
        articleDate:"2018年10月5日"
        }],
      tableTitles:[{
          prop: "articleName",
          label: "文章名",
          width: "170",
          fixed: true,
        },{
          prop: "articleAuthor",
          label: "发表者",
          width: "100"
        },{
          prop: "articleStatus",
          label: "文章状态",
          width: "100"
        },{
          prop: "articleReaders",
          label: "阅读数",
          width: "80"
        },{
          prop: "articleComments",
          label: "评论数",
          width: "80"
        },{
          prop: "articleDate",
          label: "发表日期",
          width: "170"
        },],
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
          placeholder: "文章名或发表者名",
          model: "schoolName",
          width: 170
        }],
      selectDataAddr: [
        {
          placeholder: "文章状态",
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
          options: [{
            name:"已发表",
            code:"1"
          },
          {
            name:"已删除",
            code:"-1"
          }]
        },
        {
          placeholder: "是否被举报",
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
          options: [{
            name:"正常",
            code:"1"
          },
          {
            name:"被举报",
            code:"-1"
          }]
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