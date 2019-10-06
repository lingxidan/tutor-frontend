<template>
  <div class="search-cont" ref="inputSelect">
    <el-input
      v-for="(item, index) in inputs"
      :key="'input'+index"
      :style="{width: item.width +'px'}"
      :placeholder="item.placeholder"
      :disabled="item.disabled?item.disabled:false"
      :clearable="item.clearable?item.clearable:false"
      :size="item.size?item.clearable:'medium'"
      v-model="searchData.inputData[item.model]"
      >
    </el-input>
    <el-select 
      v-for="(item, index) in selects"
      :key="'select'+index"
      v-model="searchData.selectData[item.model]" 
      :placeholder="item.placeholder"
      :style="{width: item.width +'px'}"
      :clearable=" typeof(item.clearable) == 'undefined'?true:item.clearable"
      :filterable="item.filterable?item.filterable:false"
      :disabled="item.disabled?item.disabled:false"
      :size="item.size?item.size:'medium'"
      @change="item.change?item.change($event):''"
      @clear="item.clear?item.clear():''">
      <el-option
        v-for="(option, index) in item.options"
        :key="'option'+index"
        :label="option[item.label]"
        :value="option[item.value]">
      </el-option>
    </el-select>
    <el-button 
      v-if="searchBtn"
      @click="search"
      icon="el-icon-search" 
      type="primary" 
      circle></el-button>
  </div>
</template>

<script>

export default {
  name: 'inputSelect',
  data() {
    return {
      searchData:{
        inputData: {},
        selectData: {},
      }
    };
  },
  props:{
    inputs:{
      default: () => {return new Array()}
    },
    selects:{
      default: () => {return new Array()}
    },
    searchBtn:{
      default:false
    }
  },
  components:{
  },
  mounted() {
  },
  methods:{
    search(){
      this.$emit('search', this.searchData)
    }
  },
}
</script>

<style lang="less">
  .search-cont{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
    .el-input, .el-select{
      margin: 5px 10px 5px 0;
      // .el-input__inner{
      //   background-color: #16255A;
      //   color: #ccc;
      //   border: 1px solid #16255A
      // }
    }
  }
  // .el-select-dropdown{
  //   background-color: #16255A;
  //   border: 1px solid #16255A;
  // }
  // .el-select-dropdown__item{
  //   color: #eee;
  // }
  // .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  //   background-color: #314576
  // }
  // .el-popper[x-placement^=bottom] .popper__arrow{
  //   border-bottom-color: #16255A
  // }
  // .el-popper[x-placement^=bottom] .popper__arrow::after{
  //   border-bottom-color: #16255A
  // }
</style>

