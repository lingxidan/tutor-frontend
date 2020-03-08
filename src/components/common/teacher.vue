<template>
  <div class="teacher" @click="showJob">
    <div class="mainInfo">
      <div class="name"><p>{{teacher.name}}</p></div>
      <div class="require">
        <span>学历:{{teacher.education}}</span>
        <!-- <span>{{teacher.during}}</span>
        <span>{{teacher.teacherCert?"要求教资":"不要求教资"}}</span> -->
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name"><p>{{teacher.schoolName}}</p></div>
      <div class="require">
        <span>{{teacher.schoolAddr}}</span>
      </div>
    </div>
    <div class="contactInfo">
      <div class="change">
        <span>{{teacher.contactPerson}}</span>
        <span>{{teacher.contactJob}}</span>
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

    }
  },
  props: {
    teacher:{
      type:Object,
      default:function () {
        return {
          id:4,
          name:"数学教师",
          during:"4-10年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"刘女士",
          contactJob:"教育局代表人",
        }
      }
        
    }
  },
  components:{
  },
  mounted() {
  },
  methods:{
    showJob(){
      console.log(this.teacher)
      // this.$router.push({name:'路由命名',params:{参数名:参数值,参数名:参数值}})
      this.$router.push({path:'/job',query:{id:this.teacher.id}})
    },
    addContact(){
      let _this=this
      console.log(_this.teacher)
      let param={
        fromId:24,
        toId:_this.teacher.userId,
        content:"你好，我对此岗位有兴趣"
      }
      _this.$request.insertChat(param).then(
        res=>{
          _this.$router.push("/user/vol/chat")

        }
      )
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
  padding: 0.2vh 0;
  cursor: pointer;
  .name{
    text-align: left;
    padding-left: 0.8vw;
    margin-top: 0.7vh;
    height: 45%;
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
    .name p{
      font-weight: bold;
      font-size: 2vh;
      color: @secondColor;
    }
  }
  .schoolInfo{
    width: 30%;
    padding: 1vh;
    overflow: hidden;
    .name p{
      font-size: 1.7vh;
      // margin-top: 1vh;
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
  // box-shadow: 0 0 1px 0 @thirthColor;
  background-color: @sixthColor;
  .mainInfo .name{
    color:@thirthColor;
  }
  .contactInfo .change{
    display: none;
  }
  .contactInfo .btnChange{
    display: block;
  }
}
</style>