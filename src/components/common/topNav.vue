<template>
  <div class="mainTopNav">
    <img class="logo" src="../../../static/img/logo.png" />
    <nav class="mainNav">
      <a href="/shizheFront" title="首页">首页</a>
      <template v-if="!!user.id">
        <a @click="toJob" v-if="user.userType=='1'" title="教职岗位" 
        :style="searchField=='job'?'background-color: rgba(255,255,255,.2);':''">教职岗位</a>
        <a @click="toSchool" v-if="user.userType=='1'" title="支教学校" 
        :style="searchField=='school'?'background-color: rgba(255,255,255,.2);':''">支教学校</a>
        <a @click="toVol" v-if="user.userType=='2'" title="支教志愿者" 
        :style="searchField=='vol'?'background-color: rgba(255,255,255,.2);':''">支教志愿者</a>

      </template>
      <template v-else>
        <a @click="toJob" title="教职岗位" 
        :style="searchField=='job'?'background-color: rgba(255,255,255,.2);':''">教职岗位</a>
        <a @click="toSchool" title="支教学校" 
        :style="searchField=='school'?'background-color: rgba(255,255,255,.2);':''">支教学校</a>
        <a @click="toVol" title="支教志愿者" 
        :style="searchField=='vol'?'background-color: rgba(255,255,255,.2);':''">支教志愿者</a>
      </template>
      <a @click="toArticlePost" title="心得交流" 
      :style="(searchField=='article'||searchField=='post')?'background-color: rgba(255,255,255,.2);':''">心得交流</a>
    </nav>
    <div v-if="!user||!user.id">
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
      <el-popover placement="bottom-end" width="50" trigger="hover">
        <el-button type="medium" @click="logout">登出</el-button>
        <div slot="reference" class="user">
          <!-- <button @click="registe">注册</button> -->
          <button @click="toSelfInfo">{{ user.name }}</button>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      searchField: ""
    };
  },
  created() {
    this.getUserInfo();
    this.getSearchField()
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$confirm("退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "wraning"
      }).then(() => {
        // 退出系统
        this.user = {};
        this.$store.commit("user", {});
        sessionStorage.clear();
        this.$router.push("/");
      });
    },
    login() {
      this.$emit("login");
    },
    registeSchool() {
      this.$emit("registe", "recruiter");
    },
    registeVolun() {
      this.$emit("registe", "volunteer");
    },
    toSelfInfo() {
      let user = JSON.parse(sessionStorage.getItem("user"));

      if (user.userType == 1) {
        this.$router.push("/user/vol/volunteer");
      }
      if (user.userType == 2) {
        this.$router.push("/user/recr/recruiter");
      }
    },
    getUserInfo() {
      this.user = JSON.parse(sessionStorage.getItem("user"))||{};
    },
    toArticlePost(){
      this.$router.push({
        path: '/search',
        query: {
          field: "article",
          text: "",
        }
      })
    },
    toJob(){
      this.$router.push({
        path: '/search',
        query: {
          field: "job",
          text: "",
        }
      })
    },
    toVol(){
      this.$router.push({
        path: '/search',
        query: {
          field: "vol",
          text: "",
        }
      })
    },
    toSchool(){
      this.$router.push({
        path: '/search',
        query: {
          field: "school",
          text: "",
        }
      })
    },
    getSearchField(){
      if(this.$route.path=='/search'){
        this.searchField=this.$route.query.field
      }else{
        this.searchField=""
      }
    }
  },
  watch: {
    '$route'(to,from) {
      this.getUserInfo()
      this.getSearchField()
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../../static/css/main.less";
a {
  cursor: pointer;
}
.mainTopNav {
  font-size: 1.7vh;
  // padding: 0.5vh;
  display: flex;
  align-items: center;
  img {
    height: 3.9vh;
    margin-left: 12vw;
    vertical-align: middle;
    padding: 0.7vh;
  }
  nav {
    display: inline-block;
    vertical-align: middle;
  }
  a {
    position: relative;
    text-align: center;
    letter-spacing: 1px;
  }
  nav.mainNav {
    margin-left: 1vw;
    a {
      color: whitesmoke;
      padding: 0.5vh 1vh;
      width: 5.8vw;
      font-size: 1.9vh;
    }
    a:hover {
      background-color: @thirthColor;
    }
  }
  nav.want {
    margin-left: 11.8vw;
    a {
      border-radius: 3px;
      color: #fff;
      margin-right: 5px;
      border-bottom: 1px solid #fff;
      padding: 0.4vh 1.3vw;
    }
    a:hover,a.active {
      background-color: @thirthColor;
    }
  }
  .user {
    display: inline-block;
    vertical-align: middle;
    button {
      cursor: pointer;
      position: relative;
      width: 7vw;
      margin-left: 2vw;
      // height: 25px;
      background-color: transparent;
      color: @sixthColor;
      letter-spacing: 2px;
      border: none;
      font-size: 1.8vh;
      height: 3vh;
    }
    button:hover {
      background-color: @thirthColor;
    }
  }
}
</style>
