<template>
  <div class="volunteer">
    <div class="mainInfo">
      <div class="name"><p>{{volunteer.name}}</p></div>
      <div class="require">
        <span>{{volunteer.education}}</span>
        <span>{{volunteer.during}}</span>
        <!-- <span>{{volunteer.teacherCert?"要求教资":"不要求教资"}}</span> -->
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name"><p>教授科目</p></div>
      <div class="require">
        <span v-for="(pro, index) in volunteer.projects" :key="index">
          {{pro}}
        </span>
      </div>
    </div>
    <div class="contactInfo">
      <div class="change">
        <!-- <span>
          <img :src="volunteer.contactImg" alt="" />
          </span>
        <span>{{volunteer.contactPerson}}</span>
        <span>{{volunteer.contactJob}}</span> -->
        <!-- <div class="name">{{teacher.contactPerson}}</div>
        <div class="require">
          <span>{{teacher.contactJob}}</span>
        </div> -->
      </div>
      <el-button class="btnChange">立即沟通</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      contact:false
    }
  },
  props: {
    volunteer:{
      type:Object,
      default:function () {
        return {
          name:"X老师",
          during:"4-10年经验",
          education:"本科",
          projects:["数学","英语","语文"],
          // schoolAddr:"北京市 北京市 朝阳区",
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

  },
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.volunteer{
  display: flex;
  width: 100%;
  border-top:none;
  background-color: #fff;
  padding: 0.2vh 0;
  cursor: pointer;
  .name{
    text-align: left;
    padding-left: 0.6vw;
    margin-top: 0.7vh;
    height: 45%;
    p{
      text-align: left;
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
      padding: 0 0.6vw;
      border-right: 1px solid @fifthColor;
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
      font-size: 1.4vh;
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
    width: 80%;
    background-color: @secondColor;
    border:none;
    color:white;
  }
  .btnChange:hover{
    background-color: @thirthColor;
  }
}
.volunteer:hover{
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