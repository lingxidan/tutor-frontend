<template>
  <div class="school-main" @click="showSchool">
    <div class="mainInfo">
      <div class="name">学校名:<p :title="school.name">{{school.name.substr(0,10)+(school.name.length>10?"...":"")}}</p></div>
      <div class="require">
        <span>教育等级:{{school.education}}</span>
      </div>
    </div>
    <div class="schoolInfo">
      <div class="name"><p>{{school.addressName}}</p></div>
      <div class="require">
        成立日期:<span>{{school.establishDt}}</span>
      </div>
    </div>
    <div class="image">
      <img :src="image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'school-main',
  data() { 
    return {
      user:{},
      image:""
    }
  },
  props: {
    school:{
      type:Object,
      default:function () {
        return {}
      }
        
    }

  },
  components:{
  },
  created(){
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    this.getImage()
  },
  methods:{
    showSchool(){
      this.$router.push({path:'/school',query:{id:this.school.id}})
    },
    getImage(){
      if(this.school.imgs!="[]"){
        this.image = this.school.imgs
          .substr(1, this.school.imgs.length - 2)
          .split(",")
          .map(url => {
            return (
              "/" +
              url
                .substr(
                  url.indexOf("static"),
                  url.length - url.indexOf("static")
                )
                .replace(/\\/g, "/")
            );
          });
      }else{
        this.school.imgs=[]
      }
    }

  },
  watch:{
    school(newVal,oldVal){
      this.getImage()
    }
  }
 }
</script>

<style lang="less" scoped>
@import '../../../static/css/main';
.school-main{
  display: flex;
  width: 100%;
  border-top:none;
  background-color: #fff;
  padding: 1vh 0;
  transition: .3s;
  cursor: pointer;
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
    padding-left: 0.8vw;
    span{
      display: inline-block;
      // padding-left: 0.8vw;
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
    }
  }
  .image{ 
    flex: 1;
    height: 17vh;
    img{
      height: 100%;
      width: auto;
      border-radius: 2px;
    }
  }
}
.school-main:hover{
  z-index: 100;
  // box-shadow: 0 0 1px 0 @thirthColor;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  // &:hover{
  .mainInfo .name p{
    color: coral;
  }
}
</style>