<template>
  <div class="teacher" @click="showJob">
    <div class="mainInfo">
      <div class="name">{{teacher.name}}</div>
      <div class="require">
        <span>{{teacher.education}}</span>
        <!-- <span>{{teacher.during}}</span>
        <span>{{teacher.teacherCert?"要求教资":"不要求教资"}}</span> -->
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name">{{teacher.schoolName}}</div>
      <div class="require">
        <span>{{teacher.schoolAddr}}</span>
      </div>
    </div>
    <div class="contactInfo">
      <div class="change">
        <span>
          <img :src="teacher.contactImg" alt="" />
          </span>
        <span>{{teacher.contactPerson}}</span>
        <span>{{teacher.contactJob}}</span>
      </div>
      <el-button class="btnChange" @click="addContact">立即沟通</el-button>
      <el-button v-if="interest" class="btnChange" plain>取消关注</el-button>
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
        
    },
    interest:{
      type:Boolean,
      default:false
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
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
  .name{
    text-align: left;
    font-size: 20px;
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
      padding-right: 10px;
      padding-left: 10px;
      // width: 30%;
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
.teacher:hover{
  transform: translateZ(1px);
  box-shadow: 0 0 1px 0 @hoverColor;
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