<template>
  <div class="volunteer">
    <div class="mainInfo">
      <div class="name">{{volunteer.name}}</div>
      <div class="require">
        <span>{{volunteer.education}}</span>
        <span>{{volunteer.during}}</span>
        <!-- <span>{{volunteer.teacherCert?"要求教资":"不要求教资"}}</span> -->
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name">教授科目</div>
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
  border: 1px solid @mainColor;
  border-top:none;
  background-color: #fff;
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
  .name{
    text-align: left;
    font-size: 18px;
    padding-left: 10px;
    margin-bottom: 5px;
    height: 50%;
    line-height: 26px;
    // font-family: @thirdFont;
  }
  .require{
    color: #aaa;
    white-space: nowrap;
    display:flex;
    align-items: left;
    margin-bottom: 5px;
    font-size: 12px;
    span{
      display: inline-block;
      // width: 30%;
      padding-right: 10px;
      padding-left: 10px;
      border-right: 1px solid @mainColor;
      text-align: center;
    }
    span:last-of-type{
      border-right:none;
    }
  }
  .mainInfo{
    width: 38%;
    overflow: hidden;
    padding: 10px;
    .name{
      color: @secondColor;
    }
  }
  .schoolInfo{
    width: 32%;
    padding: 10px;
    overflow: hidden;
    .name{
      font-size: 16px;
    }
  }
  .contactInfo{
    width: 30%;
    padding: 10px;
    overflow: hidden;
    display:flex;
    align-items: center;
    span{
      display: inline-block;
      text-align: center;
      font-size: 12px;
    }
    span:first-of-type{
      width: 20px;
      height: 20px;
      border-right: none;
    }
    span:last-of-type{
      border-right: none;
      border-left: 1px solid @mainColor;
      padding-left: 5px;
    }
    span img{
      width: 100%;
      vertical-align: middle;
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
    background-color: @hoverColor;
  }
}
.volunteer:hover{
  transform: translateZ(1px);
  box-shadow: 0 0 10px 0 @mainColor;
  .mainInfo .name{
    color:@hoverColor;
  }
  .contactInfo .change{
    display: none;
  }
  .contactInfo .btnChange{
    display: block;
  }
}
</style>