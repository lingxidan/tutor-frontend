<template>
  <div class="teacher">
    <div class="mainInfo" @click="showJob">
      <div class="name">职位:<p :title="teacher.name">{{teacher.name.substr(0,5)+(teacher.name.length>5?"...":"")}}</p></div>
      <div class="require">
        <span>学历要求:{{teacher.education}}</span>
      </div>
    </div>
    <div class="schoolInfo" @click="showSchool">
      <div class="name">学校:<p :title="teacher.name">{{school.name}}</p></div>
      <div class="require">
        <span>{{school.addressName}}</span>
      </div>
    </div>
    <div class="contactInfo">
      <div class="change">
        <span>{{recruiter.name}}</span>
        <span>{{recruiter.email}}</span>
      </div>
      <el-button class="btnChange" @click="addContact">立即沟通</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      user: {},
      school:{},
      recruiter:{}
    }
  },
  props: {
    teacher:{
      type:Object,
      default:function () {
        return {}
      }
        
    }
  },
  components:{
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    this.$request.selectSchoolById({schoolId:this.teacher.schoolId}).then(res=>{
      this.school = res.data
    })
    this.$request.getRecuriter({userId:this.teacher.userId}).then(res=>{
      this.recruiter = res.data
    })
  },
  methods:{
    showJob(){
      this.$router.push({path:'/job',query:{id:this.teacher.id}})
    },
    showSchool(){
      this.$router.push({path:'/school',query:{id:this.school.id}})
    },
    addContact(){
      this.user = JSON.parse(sessionStorage.getItem('user'))||{}; 
      let _this=this
      if(this.user.id){
        let param={
          fromId:this.user.id,
          toId:_this.teacher.userId,
          content:"你好！我想应聘此职位："+this.school.name+"的"+this.teacher.name
        }
        _this.$request.insertChat(param).then(
          res=>{
            _this.$router.push("/user/vol/chat",param)

          }
        )
      }else{
        this.$message.warning("请登录")
      }
    }

  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.teacher{
  display: flex;
  width: 100%;
  border-top:none;
  background-color: #fff;
  padding: 1vh 0;
  transition: .3s;
  .name{
    text-align: left;
    padding-left: 0.8vw;
    margin-top: 0.7vh;
    height: 4vh;
    line-height: 3vh;
    overflow: hidden;
    label{
      font-size: 1.7vh;
    }
    p{
      font-size: 2.4vh;
      position: relative;
      bottom: 0;
    }
  }
  .require{
    color: #aaa;
    text-align: left;
    font-size: 1.4vh;
    line-height: 3vh;
    span{
      display: inline-block;
      padding-left: 0.8vw;
      text-align: center;
    }
    span:last-of-type{
      border-right:none;
    }
  }
  .mainInfo{
    width: 29%;
    overflow: hidden;
    padding: 1vh;
    font-size: 1.6vh;
    .name p{
      display: inline-block;
      font-weight: bold;
      font-size: 2vh;
      line-height: 3vh;
      margin-bottom: 1vh;
      width: 70%;
      color: @secondColor;
      cursor: pointer;
    }
    &:hover{
      .name p{
        color: coral;
      }
    }
  }
  .schoolInfo{
    width: 30%;
    padding: 1vh;
    overflow: hidden;
    font-size: 1.4vh;
    .name p{
      display: inline-block;
      font-size: 1.9vh;
      cursor: pointer;
      // margin-top: 1vh;
    }
    &:hover{
      .name p{
        color: coral;
      }
    }
  }
  .contactInfo{
    flex: 1;
    padding: 1vh;
    display: flex;
    align-items: center;
    justify-content: left;
    .change{
      position: relative;
      left: 0;
      span{
        display: inline-block;
        text-align: center;
        font-size: 1.5vh;
      }
      span:first-of-type{
        width: 4vw;
        height: 2vh;
        text-align: right;
        border-right: none;
        font-weight: bold;
        padding-right: 0.2vw;
      }
      span:last-of-type{
        border-right: none;
        border-left: 1px solid @fourthColor;
        padding-left: 0.5vw;
      }
    }
  }
  .btnChange{
    display: none;
    width: 65%;
    background-color: @secondColor;
    color:@sixthColor;
    font-size: 1.7vh;
    letter-spacing: 1px;
    margin-left: 2vw;
  }
  .btnChange:hover{
    background-color: @thirthColor;
  }
}
.teacher:hover{
  z-index: 100;
  // box-shadow: 0 0 1px 0 @thirthColor;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .contactInfo .change{
    display: none;
  }
  .contactInfo .btnChange{
    display: block;
  }
}
</style>