<template>
  <div class="info-job">
    <div class="job">
      <div class="name">
        <p>
          <h4>{{zhiwei.name}}</h4>
          <label class="date">{{zhiwei.establishDt}}</label>
        </p>
        <p><label for="">教授科目:</label>{{zhiwei.education}}</p>
        <p><label for="">教资要求:</label>{{zhiwei.teacherCert?"有":"没有"}}</p>
      </div>
      <div class="job-content">
        <p><label for="">职位要求</label>{{zhiwei.describe}}</p>
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
        <p><label for="">公司地址:</label>{{recruiter.address}}</p>
      </div>
      <div class="contact">
        <p><label for="">联系邮箱:</label>{{recruiter.email}}</p>
        <p><label for="">联系电话:</label>{{recruiter.phone}}</p>
      </div>
      <div class="fabu">
        <p><label for="">发布文章:</label>{{recruiter.schoolCnt}}篇</p>
        <p><label for="">发布帖子:</label>{{recruiter.schoolCnt}}个</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info-job',
  data() { 
    return {
      school:{
        name:"XXXX学校",
        address:"北京市北京市昌平区",
        education:"小学",
        describe:"成立于XX年，已有20年历史，由XXX捐资建立",
        establishDt:"2009年1月1日",
        scale:"100-500",
        jobCnt:10
      },
      zhiwei:{
        name:"数学教师",
        during:"4-10年",
        education:"本科",
        teacherCert:true,
        establishDt:"2018年10月10日",
        describe:"真诚善良",
      },
      recruiter:{
        name:"张XX",
        identiCard:"142729********20",
        phone:"1738200****",
        email:"ajoheobn@ss.com",
        password:"adsfa",
        address:"北京市朝阳区",
        reason:"s",
        identity:"简巨科技有限公司HR经理",
        schoolCnt:8,
        zhiwei:{
          cnt:10,
          opened:6,
          closed:4
        },
      },

    }
  },
  props: {

  },
  components:{
  },
  created(){
    let jobId=this.$route.query.id
    let _this=this
    this.$request.selectJobById({jobId}).then(
      res=>{
        _this.zhiwei=res.data
        let schoolId=_this.zhiwei.schoolId
        _this.$request.selectSchoolById({schoolId}).then(
          res=>{
            // debugger
            console.log(res.data)
            _this.school=res.data
            // let schoolId=_this.zhiwei.schoolId
            
          }
        )

      }
    )
  },
  mounted() {

  },
  methods:{
    showSchool(){
      this.$router.push({path:'/school',query:{id:this.zhiwei.schoolId}})
    }
  },
 }
</script>

<style lang="less" scoped>
.info-job{
  display: flex;
  // align-items: center;
  justify-content: center;
  margin: 20px;
  .job{
    width: 50%;
    background-color: #fff;
    box-shadow: 0 0 10px 0 #eee;
    padding: 10px 60px;
    padding-bottom: 30px;
      p{
        font-size: 16px;
        display: block;
        line-height: 30px;
        height: 30px;
        label{
          margin-right: 18px;
          display: inline-block;
          font-weight: 700;
        }
      }
    .name{
      text-align: left;
      margin-bottom: 10px;
      h4{
        font-size: 24px;
        font-weight: 700;
        display: inline-block;
        border-left: #fba400 7px solid;
        padding-left: 20px;
      }
      .date{
        font-size:13px;
        color: #666;
        margin-left: 200px;
      }
    }
    .job-content{
      border-top: 1px solid #eee;
      padding: 20px 0;
      text-align: left;
      p{
        label{}
      }
    }
    .school{
      cursor: pointer;
      border-top: 1px solid #eee;
      padding: 20px 0;
      box-shadow: 0 0 10px 0 #eee;
      display: flex;

      .school-name{
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        padding: 0px 50px;
      }
      p{
        margin-left: 100px;
      }
      &:hover{
        box-shadow: 0 0 10px 0 #fab83e;

      }
    }
  }
  .recr{
    border-top: #fba400 8px solid;
    box-shadow: 0 0 10px 0 #eee;
    margin-left: 10px;
    width: 20%;
    height: 100%;
    background-color: #fff;
    padding: 5px 10px;
    .name{
      font-size: 22px;
      font-weight: 700;
      text-align: left;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    p{
      text-align: left;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: black;
      label{
        margin-right: 8px;
        font-weight: 700;
        color: #666;
      }
    }
    p.identity{
      font-size: 16px;
      font-weight: 400;
    }
    .fabu{
      border-top: 6px solid #f6f6f8;
      padding-top: 5px;
      // padding-left: 10px;
      p{
        cursor: pointer;
        text-decoration: underline;
        label{
          text-decoration-line: 0px;
        }
        &:hover{
          color: coral;
        }
      }
    }
  }
}
</style>