<template>
  <div class="edit-job">
    <el-form ref="form" :model="job" label-width="80px">
      <el-form-item label="所属学校">
        <el-select v-model="job.schoolId" style="width:180px;"
            placeholder="所属学校">
          <el-option
            v-for="item in selectData.school"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称">
        <el-input v-model="job.name"></el-input>
      </el-form-item>
      <el-form-item label="科目等级">
        <el-input v-model="job.education"></el-input>
      </el-form-item>
      <el-form-item label="职位要求">
        <el-input type="textarea" v-model="job.descr"></el-input>
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
  name: 'edit-job',
  data() { 
    return {
      job:{
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

    this.$request.selectSchoolByCondition({userId:32}).then(res=>{
      _this.selectData.school=res.data
    })
    if(this.typeIdx!=-1){
      this.$request.selectJobById({jobId:_this.typeIdx}).then(
        res=>{
          _this.job = res.data
          _this.job.province=_this.job.address.substring(0,2)
          _this.job.city=_this.job.address.substring(0,4)
          _this.job.county=_this.job.address.substring(0,6)
          this.$request.selectAddress({level:2,pcode:_this.job.province}).then(res=>{
            // console.log(res)
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.job.city}).then(res=>{
            _this.selectData.county=res.data
          })
          _this.job={..._this.job}
        }
      )
    }
  },
  methods:{
    changeCity(pcode){
      let _this=this
      _this.selectData.city=[]
      _this.selectData.county=[]
      _this.job.city=""
      _this.job.county=""
      _this.job.address=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
        _this.selectData.city=res.data
      })
    },
    changeCounty(pcode){
      let _this=this
      _this.selectData.county=[]
      _this.job.county=""
      _this.job.address=""
      this.$request.selectAddress({level:3,pcode:pcode}).then(res=>{
        _this.selectData.county=res.data
      })
    },
    changeAddr(code){
      let _this=this
      console.log(code)
      this.job.county=code
      this.job.address=code
    },
    cancel(){
      this.$emit("cancel")
    },
    onSubmit(){
      let _this=this
      console.log(_this.job)
      _this.selectData.school.forEach(school=>{
        if(school.id=_this.job.schoolId){
          _this.job.address=school.address
        }
      })
      // job.address=
      this.$emit("onSubmit",_this.job)
    }

  },
 }
</script>

<style lang="less">
.edit-job{
  width: 70%;
  background-color: rgba(250,250,250,.7);
  padding: 20px;
  .el-textarea__inner{
    height: 400px;
  }
}
</style>