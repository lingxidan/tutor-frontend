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
  font-size: 1.7vh;
  // padding: 0.5vh;
  display: flex;
  align-items: center;
  img{
    height:3.9vh;
    margin-left: 12vw;
    vertical-align:middle;
    padding: 0.7vh;
  }
  nav{
    display:inline-block;
    vertical-align:middle;
  }
  a{
    position: relative;
    text-align: center;
    letter-spacing: 1px;
  }
  nav.mainNav{
    margin-left:1vw;
    a{
      color:whitesmoke;
      padding: 0.5vh 1vh;
      width: 5.8vw;
      font-size: 1.9vh;
    }
    a:hover{
      background-color: @thirthColor;
    }
  }
  nav.want{
    margin-left: 11.8vw;
    a{
      border-radius: 3px;
      color:#fff;
      margin-right: 5px;
      border-bottom: 1px solid #fff;
      padding: 0.4vh 1.3vw;
    }
    a:hover{
      background-color: @thirthColor;
    }
  }
  .user{
    display: inline-block;
    vertical-align:middle;
    button{
      cursor: pointer;
      position: relative;
      width: 7vw;
      margin-left: 2vw;
      // height: 25px;
      background-color: transparent;
      color: @sixthColor;
      letter-spacing: 2px;
      border:none;
      font-size: 1.8vh;
      height: 3vh;
    }
    button:hover{
      background-color: @thirthColor;
    }
  }
}
</style>