<template>
  <div class="edit-post">
    <el-form ref="form" :model="post" label-width="80px">
      <el-form-item label="帖子名称">
        <el-input v-model="post.title"></el-input>
      </el-form-item>
      <el-form-item label="帖子描述">
        <el-input type="textarea" v-model="post.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      <!-- <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'edit-post',
  data() { 
    return {
      post:{
      },
      selectData:{
        province:[],
        city:[],
        county:[],
        school:[]
      },
    }
  },
  props: {
    typeIdx:{
      default:-1
    }
  },
  components:{
  },
  mounted() {
    let _this=this
    if(this.typeIdx!=-1){
      console.log(this.typeIdx)
      this.$request.selectPostById({postId:_this.typeIdx}).then(
        res=>{
          _this.post = res.data
          _this.post={..._this.post}
        }
      )
    }
  },
  methods:{
    cancel(){
      this.$emit("cancel")
    },
    onSubmit(){
      let _this=this
      console.log(_this.post)
      // post.address=
      this.$emit("onSubmit",_this.post)
    }

  },
 }
</script>

<style lang="less">
.edit-post{
  width: 70%;
  background-color: rgba(250,250,250,.7);
  padding: 20px;
  .el-textarea__inner{
    height: 400px;
  }
}
</style>