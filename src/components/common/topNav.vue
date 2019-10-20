<template>
  <div class="mainTopNav">
  	<img class="logo" src="../../../static/img/logo.png" />
    <nav class="mainNav">
      <a href="/" title="首页">首页</a>
      <a href="#nowhere" title="教职岗位">教职岗位</a>
      <a href="#nowhere" title="支教志愿者">支教志愿者</a>
      <a href="#nowhere" title="支教学校">支教学校</a>
      <a href="#nowhere" title="心得交流">心得交流</a>
    </nav>
    <div v-if="!user.name">
      <nav class="want">
        <a title="我想支教" @click="registeVolun">我想支教</a>
        <a title="招募教师" @click="registeSchool">招募教师</a>
      </nav>
      <div class="user">
        <!-- <button @click="registe">注册</button> -->
        <button @click="login">登录</button>
      </div>
    </div>
    <div v-else>
      <div class="user">
        <!-- <button @click="registe">注册</button> -->
        <button @click="toSelfInfo">{{user.name}}</button>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created(){
    this.user=this.$store.state.user
    // this.user.name="ASD"
  },
  mounted(){
    // console.log()
    // this.$store.commit('user', this.ruleForm);
    // console.log(this.$store.state.user)
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user)
    // if(userSession){
    //   this.$store.commit('user', this.ruleForm);

    // }
  },
  methods: {
    login(){
      this.$emit('login');
    },
    registeSchool(){
      this.$emit('registe', 'recruiter');
    },
    registeVolun(){
      this.$emit('registe', 'volunteer');
    },
    toSelfInfo(){

    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../static/css/main.less';
a{
  cursor: pointer;
}
.mainTopNav{
  font-size: 16px;
  // background-color: rgba(255, 255, 255, 0.6);
  // background-color: rgba(252,233,199);
  // background-color: rgba(231, 206, 158, 0.7);
  // border-bottom: 1px solid #fff;
  padding: 8px;
  // text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 40px;
  img{
  	// width:80px;
    height:4vh;
    // height:auto;
    vertical-align:middle;
    margin-right: 80px;
  }
  nav{
    display:inline-block;
    background-size:cover;
    padding-left: 25px;
    padding-right: 10px;
    // height: 30px;
    margin-left: 10px;
    vertical-align:middle;
  }
  a{
    position: relative;
    line-height:20px;
    height:20px;
    width: 90px;
    text-align: center;
    // font-size: 13px;
    padding: 3px 5px; 
  }
  nav.mainNav{
    background: url("../../../static/img/nav_bc.png") no-repeat;
    border-radius: 5px;
    margin-right: 40px;
    box-shadow: 0 0 8px 0 #fff;
    font-size: 18px;
    a{
      color:whitesmoke;
      border: 1px solid transparent;
      font-size: 14px;
    }
    a:hover{
      // box-shadow: 0 0 3px 2px white;
      background-color: rgba(240,240,240,0.3);
      // top: -1px;
      // box-shadow: 0 0 3px 2px #e0b36a;
    }
  }
  nav.want{
    a{
      box-shadow: 0 0 3px 2px white;
      // background-color: rgba(240,240,240,0.3);
      border-radius: 20px 0 20px 0;
      color:#fff;
      font-weight: bold;
      
      font-size: 14px;
      letter-spacing: 1px;
      margin-right: 5px;
      &:first-of-type{
        
      border-radius:  0 20px 0 20px;
      }
    }
    a:hover{
      box-shadow: 0 0 3px 0px white;
      // background-color: rgba(117,62,0,0.3);
      // color:whitesmoke;
      // box-shadow: 0 0 3px 2px #e0b36a;
    }
  }
  .user{
    display: inline-block;
    vertical-align:middle;
    button{
      cursor: pointer;
      position: relative;
      width: 80px;
      height: 25px;
      border:0;
      border-radius: 10px;
      line-height: 20px;
      // font-family: @ssecondFont;
      // border-bottom: 1px solid #753e00;
      background-color: transparent;
      color: #fff;
      // border-top: 0;
    }
    button:hover{
      // color:#753e00;
      color:@hoverColor;
      // border-bottom: 1px solid @hoverColor;
      // box-shadow: 0px 3px 1px rgba(117,62,0,0.3);
      // box-shadow: 0 0 3px 0px @hoverColor;
      // top:-1px;
      // left:-5px;
    }
  }
}
</style>