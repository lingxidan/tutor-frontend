<template>
  <div class="info-job">
    <div class="job">
      <div class="name">
        <p>
          <h4>{{zhiwei.name}}</h4>
          <!-- <label class="date">{{zhiwei.establishDt}}</label> -->
        </p>
        <p><label for="">教授科目:</label>{{zhiwei.education}}</p>
        <!-- <p><label for="">教资要求:</label>{{zhiwei.teacherCert?"有":"没有"}}</p> -->
      </div>
      <div class="job-content">
        <div class="content-span"><label for="">职位要求:</label><span>{{zhiwei.descr}}</span></div>
        <div class="content-span"><label for="">职位保险:</label><span>{{zhiwei.jobInsure}}</span></div>
      </div>
      <div class="school" @click="showSchool">
        <div class="school-name">{{school.name}}</div>
        <p><label for="">学校地址:</label>{{school.addressName}}</p>
        <!-- <p><label for="">招聘职位:</label>{{school.jobCnt}}个</p> -->
      </div>
    </div>
    <div class="recr">
      <div class="name">{{recruiter.name}}</div>
      <div class="base">
        <p class="identity">{{recruiter.identity}}</p>
        <!-- <p><label for="">公司名称:</label>{{recruiter.address}}</p> -->
      </div>
      <div class="contact">
        <p><label for="">联系邮箱:</label>{{recruiter.email}}</p>
        <p><label for="">联系电话:</label>{{recruiter.phone}}</p>
      </div>
      <div class="fabu">
        <p><label for="">发布学校:</label>{{recruiter.schoolCnt}}</p>
        <p><label for="">发布岗位:</label>{{recruiter.jobCnt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info-job',
  data() { 
    return {
      school:{},
      zhiwei:{},
      recruiter:{},
      user:{}
    }
  },
  props: {

  },
  components:{
  },
  created(){
    this.initData()
  },
  mounted() {

  },
  methods:{
    initData(){
      this.user = JSON.parse(sessionStorage.getItem('user'))||{};
      let jobId=this.$route.query.id
      this.$request.selectJobById({jobId}).then(
        res=>{
          this.zhiwei=res.data
          this.$request.selectSchoolById({schoolId:this.zhiwei.schoolId}).then(res=>{
            this.school = res.data
          })
          this.$request.getRecuriter({userId:this.zhiwei.userId}).then(res=>{
            this.recruiter = res.data
            this.$request.selectJobByCondition({userId:this.zhiwei.userId}).then(res=>{
              // this.recruiter.jobCnt=res.data.length
              this.$set(this.recruiter,"jobCnt",res.data.length)
            })
            this.$request.selectSchoolByCondition({userId:this.zhiwei.userId}).then(res=>{
              // this.recruiter.jobCnt=res.data.length
              this.$set(this.recruiter,"schoolCnt",res.data.length)
            })
          })
        }
      )
    },
    showSchool(){
      this.$router.push({path:'/school',query:{id:this.school.id}})
    }
  },
 }
</script>

<style lang="less" scoped>
@import "../../../static/css/main";
.info-job{
  display: flex;
  // align-items: center;
  justify-content: center;
  margin: 2vh;
  .job{
    width: 50%;
    background-color: #fff;
    box-shadow: 0 0 10px 0 #eee;
    padding: 1vh 2vw;
    padding-bottom: 2vh;
    p{
      font-size: 2vh;
      display: block;
      line-height: 4vh;
      height: 4vh;
      label{
        margin-right: 1.8vh;
        display: inline-block;
        font-weight: 700;
      }
    }
    .name{
      text-align: left;
      margin-bottom: 1vh;
      h4{
        font-size: 4vh;
        font-weight: 700;
        display: inline-block;
        border-left: @mainColor 0.5vw solid;
        padding-left: 2vw;
      }
    }
    .date{
      margin-left: 3vw;
      font-size: 1.6vh;
      color: #aaa;
    }
    .job-content{
      border-top: 1px solid #eee;
      padding: 1vw 0;
      text-align: left;
      display: flex;
      flex-direction: column;
      .content-span{
        display: flex;
        margin-bottom: 1vh;
        padding-bottom: 2vh;
        border-bottom: 0.2vh solid #eee;
        label{
          font-size: 2vh;
          width: 6vw;
          font-weight: 700;
        }
        span{
          font-size: 1.8vh;
          flex: 1;
          white-space: pre-line;
        }
      }
    }
    .school{
      cursor: pointer;
      // border-top: 1px solid #eee;
      padding: 2vh 0;
      box-shadow: 0 0 2px 0 rgba(0,0,0,.2);
      border-left: 0.5vw solid coral;
      display: flex;

      .school-name{
        text-align: left;
        font-size: 3vh;
        font-weight: 600;
        padding: 0px 5vw;
      }
      p{
        margin-left: 4vw;
      }
      &:hover{
        box-shadow: 0 0 2px 0 @fifthColor;

      }
    }
  }
  .recr{
    border-top: coral 1vh solid;
    // box-shadow: 0 0 10px 0 #eee;
    margin-left: 0.5vw;
    width: 15%;
    height: 100%;
    background-color: #fff;
    padding: 1vh 1vw;
    .name{
      font-size: 3.5vh;
      font-weight: 700;
      text-align: left;
      margin-top: 0.5vh;
      // margin-bottom: 1vh;
    }
    p{
      text-align: left;
      height: 4vh;
      line-height: 4vh;
      font-size: 2vh;
      color: black;
      label{
        margin-right: 1vw;
        color: #aaa;
        font-size: 1.6vh;
      }
    }
    .fabu{
      border-top: 0.2vh solid #f6f6f8;
      padding-top: 0.3vh;
    }
  }
}
</style>