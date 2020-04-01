<template>
  <div class="edit-job">
    <el-form ref="form" :model="job" label-position="right" :rules="rules" >
      <el-form-item label="所属学校" prop="schoolId">
        <el-select v-model="job.schoolId"
            placeholder="所属学校">
          <el-option
            v-for="item in selectData.school"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="job.name"></el-input>
      </el-form-item>
      <el-form-item label="科目等级" prop="education">
        <el-input v-model="job.education"></el-input>
      </el-form-item>
      <el-form-item label="职位要求" prop="descr">
        <el-input type="textarea" v-model="job.descr"></el-input>
      </el-form-item>
      <el-form-item label="职位保险" prop="jobInsure">
        <el-input type="textarea" v-model="job.jobInsure"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'edit-job',
  data() { 
    return {
      job:{},
      selectData:{
        province:[],
        city:[],
        county:[],
        school:[]
      },
      
      rules: {
        schoolId:[
          {required: true, message: '不能为空'}
        ],
        name:[
          {required: true, message: '不能为空'}
        ],
        education:[
          {required: true, message: '不能为空'}
        ],
        descr:[
          {required: true, message: '不能为空'}
        ],
        jobInsure:[
          {required: true, message: '不能为空'}
        ]
      },
      recruiter:{}
    }
  },
  props: {
    typeIdx:{
      default:-1
    }
  },
  components:{
  },
  created(){
    this.recruiter = JSON.parse(sessionStorage.getItem('user'));
    this.$request.selectSchoolByCondition({userId:this.recruiter.id}).then(res=>{
      this.selectData.school=res.data
    })
  },
  mounted() {
    this.initData()
  },
  methods:{
    initData(){
      let _this = this;
      this.job= {}
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
    cancel(){
      this.$emit("cancel")
    },
    onSubmit(){
      let _this=this
      this.$refs.form.validate(valid=>{
        if(valid){
          _this.selectData.school.forEach(school=>{
            if(school.id==_this.job.schoolId){
              _this.job.address=school.address
            }
          })
          // job.address=
          this.$emit("onSubmit",_this.job)
        }
        else{
          return false
        }
      })
    }

  },
  watch:{
    typeIdx(oldVal, newVal){
      console.log(oldVal)
      this.initData()
    }
  }
 }
</script>

<style lang="less">
// .edit-job{
//   width: 70%;
//   background-color: rgba(250,250,250,.7);
//   padding: 20px;
//   .el-textarea__inner{
//     height: 400px;
//   }
// }
@import "../../../static/css/main";

.edit-job {
  .el-form {
    width: 90%;

    .el-form-item {
      margin-bottom: 2.3vh;
      font-size: 2vh;
      line-height: 6vh;
      // height: 6vh;
      display: flex;

      .el-form-item__label {
        text-align: right;
        width: 8vw;
        height: 6vh;
        line-height: inherit;
        font-size: 1.6vh;
        padding: 0 1vw 0 0;
      }

      .el-form-item__content {
        flex: 1;
        // height: inherit;
        line-height: inherit;
        font-size: inherit;
        display: flex;

        label {
          font-size: 1.8vh;
        }

        .el-input {
          height: inherit;
          line-height: inherit;
          font-size: inherit;

          .el-input__inner {
            height: inherit;
            line-height: 2.7;
            font-size: inherit;
            padding: 0 1vw;
            border-color: @sixthColor;
          }
        }

        .el-button {
          width: 100%;
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          padding: 0;
          background-color: @thirthColor;
          border: none;
          letter-spacing: 1px;
          margin-left: 3vw;
          color: @sixthColor;

          &:hover {
            background-color: @secondColor;
          }
        }

        .el-form-item__error {
          font-size: 1.4vh;
          width: 100%;
          text-align: right;
        }

        .el-upload--picture-card {
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          line-height: 6vw;

          i {
            font-size: 3vh;
          }
        }

        .el-upload-list--picture-card .el-upload-list__item {
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          margin: 0 1vw 0 0;
          border-color: @sixthColor;
        }

        .el-date-editor.el-input .el-input__inner {
          padding-left: 3vw;
        }
      }
    }

    .upload-images {
      display: flex;

      .el-form-item__content {
        display: flex;
      }

      .upload-image {
        width: 40%;
        height: auto;
        margin-right: 1vw;
        margin-bottom: 1vw;
        border: 1px solid @sixthColor;
      }
    }
  }

  .el-dialog__title {
    line-height: 1;
    font-size: 3vh;
    font-weight: bolder;
  }

  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1vh 1vw;
  }
}
</style>