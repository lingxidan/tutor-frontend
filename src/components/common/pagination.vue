<template>
  <div class="pagination-cont">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="paginationConf.sizes"
      :page-size="paginationConf.size"
      :total="paginationConf.total"
      layout="total, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'pagination',
  data() {
    return {
      // currentPage: 1
    };
  },
  props:{
    paginationConf:{
      default: () => { return new Object() }
    },
    currentPage:{
      default:1
    }
  },
  components:{
  },
  mounted() {
  },
  methods:{
    handleSizeChange(val) {
      this.$emit('pageSizesChange',val)
    },
    handleCurrentChange(val) {
      this.$emit('pageChange', val);
    }
  },
}
</script>

<style scoped lang="less">
  .pagination-cont{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
  }
</style>