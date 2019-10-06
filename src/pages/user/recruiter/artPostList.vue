<template>
  <div class="art-post-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我发表的文章" name="first">
        <div class="main-interest">
          <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
          :teacher="teacher"
          :interest="true"></teacher>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我发表的帖子" name="second">
        <div class="main-interest">
          <essay class="half article" v-for="(index, o) in 9" :key="index"></essay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我关注的帖子" name="third">
        <div class="main-interest">
          <disguss class="half" v-for="(index,o) in 5" :key="index" :disguss="disgussStar">
            <!-- <div slot="num"><div class="num"></div></div> -->
          </disguss>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'art-post-list',
  data() { 
    return {
      activeName:"first"
    }
  },
  props: {

  },
  components:{
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
.art-post-list{}
</style>