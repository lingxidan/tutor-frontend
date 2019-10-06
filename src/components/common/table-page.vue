<template>
<div class="table-cont" ref="tableCont" v-loading="isLoading">
  <el-table ref="elTb" v-if="!isLoading" :data="tableData" 
  :stripe="tableConf.stripe" :border="tableConf.border" :cell-style="tableCellStyle" :header-cell-style="tableHeaderColor" 
  height="600"
  :span-method="tableConf.spanMethod">
    <el-table-column v-if="tableConf.expand" type="expand" fixed="left">
        <template v-if="tableConf.expand" slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
            <template v-for="(expand,expandIdx) in tableConf.expands" >
              <el-form-item v-if="props.row.hasOwnProperty(expand.prop)" :label="expand.label" :key="'expand'+expandIdx" 
              :label-width="18*expand.label.length+'px'">
                  <span>{{ props.row[expand.prop] }}</span>
              </el-form-item>
              <br v-if="(expandIdx+1)%3==0"/>
            </template>
          </el-form>
        </template>
    </el-table-column>
    <el-table-column
      type="index"
      label="序号"
      width="50"
      align="center"
      fixed="left">
    </el-table-column>
    <template v-for="(item, index) in tableTitles">
      <el-table-column v-if="item.childs" :key="'tableTitle'+index" :align="item.align?item.align:'center'" :fixed="item.fixed?item.fixed:false" :prop="item.prop" :label="item.label" :width="item.width?item.width:''">
        <template v-for="(child,childIndex) in item.childs">
          <el-table-column v-if="child.filter" :key="index + '-'+childIndex" :align="child.align?child.align:'center'" :fixed="child.fixed?child.fixed:false" :prop="child.prop" :label="child.label" :width="child.width?child.width:''" :filters="child.filters" :filter-method="child.filterMethod" filter-placement="bottom-end">
          </el-table-column>
          <el-table-column v-else :key="index + '-'+childIndex" :align="child.align?child.align:'center'" :fixed="child.fixed?child.fixed:false" :prop="child.prop" :label="child.label" :width="child.width?child.width:''">
          </el-table-column>
        </template>
      </el-table-column>
      <template v-else>
        <el-table-column 
        v-if="item.filter" 
        :key="'tableTitle'+index" 
        :align="item.align?item.align:'center'" 
        :fixed="item.fixed?item.fixed:false" 
        :prop="item.prop" 
        :label="item.label" 
        :width="item.width?item.width:''" 
        :filters="item.filters" 
        :filter-method="item.filterMethod" 
        filter-placement="bottom-end">
        </el-table-column>
        <el-table-column v-else :key="'tableTitle'+index" :align="item.align?item.align:'center'" :fixed="item.fixed?item.fixed:false" :prop="item.prop" :label="item.label" :width="item.width?item.width:''">
        </el-table-column>
      </template>

    </template>
    <el-table-column fixed="right" label="操作" v-if="tableConf.operation?tableConf.operation:false" class="btnCol" 
    :width="tableConf.operation?115*tableConf.btns.length:0">
      <template v-if="tableConf.operaHeader" slot="header" slot-scope="scope">
        <el-button :id="tableConf.operaHeader.id" @click="tableConf.operaHeader.click(scope.row)" :size="tableConf.operaHeader.size" :type="tableConf.operaHeader.type" plain>{{tableConf.operaHeader.text}}</el-button>
      </template>
      <template slot-scope="scope">
        <!-- <span :key="btn.id" > -->
          <el-button v-for="(btn,btnIdx) in tableConf.btns" :key="'btn'+btnIdx" :id="btn.id" @click="btn.click(scope.row)" :size="btn.size" :type="btn.type" plain>{{btn.text}}</el-button>
        <!-- </span> -->
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'tablePage',
  data() {
    return {
      panels: {},
      timer: '',
      tableHeight: 0,
      tableWidth: 0,
    };
  },
  props: {
    tableTitles: {
      default: () => {
        return new Array()
      }
    },
    tableData: {
      default: () => {
        return new Array()
      }
    },
    isLoading: {
      default: false
    },
    tableConf: {
      default: () => {
        return new Object()
      }
    },
    tableCellStyle: {
      default: () => {
        return () => {}
      }
    }
  },
  watch:{
    tableData(newVal,oldVal){
    }
  },
  components: {},
  mounted() {
    // let _this = this;
    // // this.timer = setTimeout(()=>{
    // //   _this.tableHeight= document.body.clientHeight - _this.$refs.tableCont.offsetTop - 70;
    // // } ,0)
    // this.tableWidth = document.body.clientWidth - 40;
    // // window.onresize = function(){
    // //   _this.tableHeight= document.body.clientHeight - _this.$refs.tableCont.offsetTop - 70;
    // //   _this.tableWidth= document.body.clientWidth - 40;
    // // }
    // _this.panels.elTb = this.$refs.elTb
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    examineTable(val) {
      this.$emit('examineTable', val);
    },
    ensureData(val) {
      this.$emit('ensure-data', val);
    },
    // 修改table header的背景色
    tableHeaderColor({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      return "height:50px;color:#666"
      // if (rowIndex === 0) {
      //   return 'background-color: #142871;color: #fff;font-weight: 800;border-bottom: 2px solid #9DC3E6'
      // }
    },
    filterTag(value, row, column) {
      if (column.property === "firstLabel") {
        if (value == 1) {
          return Math.abs(row.targetSigma) === 1 || Math.abs(row.targetSigma) === 2;
        } else {
          return Math.abs(row.targetSigma) === 3;
        }
      }
      if (column.property === "secondLabel") {
        if (value == 1) {
          return Math.abs(row.targetBox) === 1 || Math.abs(row.targetBox) === 2;
        } else {
          return Math.abs(row.targetBox) === 3;
        }
      }
      if (column.property === "thirdLabel") {
        if (value == 1) {
          return Math.abs(row.targetKmean) === 1 || Math.abs(row.targetKmean) === 2;
        } else {
          return Math.abs(row.targetKmean) === 3;
        }
      }
      if (column.property === "errTotal") {
        return Math.abs(row.errTotal) == value;
      }
    },
    changTableSize() {
      this.tableHeight = this.$refs.tableCont.clientHeight;
      this.tableWidth = document.body.clientWidth - 50;
    },
  },
}
</script>

<style lang="less" scoped>
.table-cont {
  // width: 60%;
  padding-left: 10px;
  // height: 600px;

  .el-table {
    border: 1px solid rgb(238, 238, 238);
    // background-color: #142D7E;
  }

  .btnCol {
    // el-button{
    //   display: inline;
    // }
    text-align: center;
  }

  // .btn{
  //   display: inline-block;
  //   height: 80%;
  //   // width: 40%;
  //   text-decoration: underline;
  //   color:#4474cf;
  // }
  .ensureDiv {
    position: relative;
    width: 100%;

    .moreBtn {
      // position: absolute;
      // z-index: 4;
      // transition: .5s;
      // left:0;
      // display: none;
    }

    &:hover {
      .moreBtn {
        display: inherit;
        // position: relative;
        // left:40px;
      }
    }
  }
}
</style>
<style lang="less">
.el-table .cell {
  white-space: pre-line;
}
  .demo-table-expand {
    font-size: 0;
    margin-left: 100px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    position: relative;
    margin-right: 15px;
    margin-bottom: 0;
    &::after{
      position: absolute;
      content:"";
      width: 2px;
      height: 18px;
      top: 10px;
      left:-5px;
      background-color: #ccc;
    }
    &:nth-of-type(3n+1)::after{
      width: 0;
    }
  }
</style>

