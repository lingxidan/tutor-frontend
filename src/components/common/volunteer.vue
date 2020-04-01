<template>
  <div class="volunteer">
    <div class="mainInfo" @click="showVolunteer">
      <div class="name"><p>{{volunteer.name}}</p></div>
      <div class="require">
        <span>{{volunteer.educationName}}</span>
        <!-- <span>{{volunteer.during}}</span> -->
        <!-- <span>{{volunteer.teacherCert?"要求教资":"不要求教资"}}</span> -->
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name"><p>现居地</p></div>
      <div class="require">
        <span>
          {{volunteer.addressName}}
        </span>
      </div>
    </div>
    <div class="contactInfo">
      <el-button class="btnChange" @click="addContact">立即沟通</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
      contact:false,
      user:{},
      
    }
  },
  props: {
    volunteer:{
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
    let education = [{
              name:"高中及以下",
              code:"1"
            },{
              name:"高中",
              code:"2"
            },{
              name:"大专",
              code:"3"
            },{
              name:"本科",
              code:"4"
            },{
              name:"硕士研究生",
              code:"5"
            },{
              name:"博士研究生",
              code:"6"
            },]
    this.volunteer.educationName = education.filter(a=>a.code == this.volunteer.education)[0].name
  },
  methods:{
    addContact(){
      this.user = JSON.parse(sessionStorage.getItem('user'))||{}; 
      let _this=this
      if(this.user.id){
        let param={
          fromId:this.user.id,
          toId:_this.volunteer.userId,
          content:"你好！有兴趣交流一下吗？"
        }
        _this.$request.insertChat(param).then(
          res=>{
            _this.$router.push("/user/recr/chat",param)

          }
        )
      }else{
        this.$message.warning("请登录")
      }
    },
    showVolunteer(){
      this.$router.push({path:'/volunteer',query:{id:this.volunteer.userId}})
    }
  },
  watch:{
    volunteer(newVal,oldVal){
      let education = [{
                name:"高中及以下",
                code:"1"
              },{
                name:"高中",
                code:"2"
              },{
                name:"大专",
                code:"3"
              },{
                name:"本科",
                code:"4"
              },{
                name:"硕士研究生",
                code:"5"
              },{
                name:"博士研究生",
                code:"6"
              },]
      newVal.educationName = education.filter(a=>a.code == newVal.education)[0].name
    }
  }
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.volunteer{
  display: flex;
  width: 100%;
  border-top:none;
  background-color: #fff;
  padding: 1vh 0;
  cursor: pointer;
  .name{
    text-align: left;
    padding-left: 0.6vw;
    margin-top: 0.7vh;
    height: 5vh;
    line-height: 5vh;
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
  transition: .3s;
}
.volunteer:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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