<template>
<div class="index">
  <!--左右导航-->
  <div class="rightNav" ref="rightNav">
    <ul>
      <li @click="login">登录</li>
      <el-popover placement="left" trigger="hover">
        <ul class="registe">
          <li @click="registe('recruiter')">我想招募</li>
          <li @click="registe('volunteer')">我想支教</li>
        </ul>
        <li slot="reference" style="border-top:none;">注册</li>
        <!-- <li >传播分享</li> -->
      </el-popover>
      <!-- <li>我的信息</li> -->
      <li>聊天室</li>
      <el-popover placement="left" trigger="hover">
        <input class="el-input__inner copy-input" type="text" id="copy_url" v-model="url" readonly />
        <button ref="copyBtn" class="copyBtn" data-clipboard-target="#copy_url" @click="copy">
          复制网址
        </button>
        <li slot="reference" style="border-top:none;">传播分享</li>
      </el-popover>
    </ul>
  </div>
  <div class="leftNav" ref="leftNav">
    <ul>
      <li><a href="#articles">日志文章</a></li>
      <li><a href="#info">招募信息</a></li>
      <li><a href="#postCard">讨论交流</a></li>
      <li class="top" @mouseenter.self="handleTopEnter" @mouseleave.self="handleTopLeave" @click="scrollTop">
        <p class="arrow" v-if="moveArrow">&lt;</p>
        <p v-else>返回顶部</p>
      </li>
    </ul>
  </div>
  <!-- 主板块显示 -->
  <div class="main">
    <!-- 搜索栏 -->
    <div class="search" ref="search">
      <el-select name="" id="" v-model="searchMsg.select" class="searchSel">
        <template v-if="!!user.id">
          <el-option v-for="sel in searchSel"
          v-if="user.userType=='1'&&sel.field!='vol'" 
          :key="sel.id" :value="sel.field" :label="sel.label"></el-option>
          <el-option v-for="sel in searchSel"
           v-if="user.userType=='2'&&(sel.field!='job'&&sel.field!='school')"
            :key="sel.id" :value="sel.field" :label="sel.label"></el-option>
        </template>
        <template v-else>
          <el-option v-for="sel in searchSel" :key="sel.id" :value="sel.field" :label="sel.label"></el-option>
        </template>
      </el-select>
      <el-input v-model="searchMsg.text" placeholder="请输入内容" class="input-with-select searchInput">
      </el-input>
      <el-button icon="el-icon-search" @click="searchByKeyword">搜索</el-button>
    </div>
    <!-- 日志文章 -->
    <div class="articles" id="articles" ref="info">
      <div class="title">
        <div class="name">日志文章</div>
        <div class="more" @click="toArticlePost">查看更多 >></div>
      </div>
      <el-row :gutter="10">
        <!-- <el-col :span="6"  class="el-col"> -->
        <!-- <essay v-for="(article, index) in articles" :key="index"
            :essay="article"></essay> -->
        <essay v-for="(article, index) in articles" :key="index" :essay="article"></essay>
        <!-- </el-col> -->

      </el-row>
    </div>
    <!-- 招募职位、志愿者信息查看 -->
    <div class="info" id="info">
      <div class="title">
        <div class="name">招募信息</div>
        <div class="more" @click="toZhaomu">查看更多 >></div>
      </div>
      <div class="teachers" v-if="user.id&&user.userType=='1'">
        <teacher class="single-teacher" v-for="(teacher,index) in teachers" :key="index" :teacher="teacher"></teacher>
      </div>
      <div class="volunteers" v-if="user.id&&user.userType=='2'">
        <volunteer class="single-volunteers" v-for="(volunteer,index) in volunteers" :key="index" :volunteer="volunteer"></volunteer>
      </div>
      <div class="teachers all" v-if="!user.id">
        <teacher class="single-teacher" v-for="(teacher,index) in teachers" :key="index" :teacher="teacher"></teacher>
      </div>
      <div class="volunteers all" v-if="!user.id">
        <volunteer class="single-volunteers" v-for="(volunteer,index) in volunteers" :key="index" :volunteer="volunteer"></volunteer>
      </div>
    </div>
    <!-- 热门帖子 -->
    <div class="postCard" id="postCard">
      <div class="title">
        <div class="name">讨论交流</div>
        <div class="more" @click="toPost">查看更多 >></div>
      </div>
      <!-- <disguss class="post-single" v-for="(post,index) in posts" :key="index" :disguss="post">
          <div slot="num"><div class="num"></div></div>
        </disguss> -->
      <div class="disgusses">
        <disguss v-for="(post,index) in posts" :key="index" :disguss="post" class="post-single">
        </disguss>
      </div>
    </div>
  </div>
  <div class="login" ref="login">
    <login @cancel="cancel"></login>
  </div>

</div>
</template>

<script>
import teacher from '../../components/common/teacher.vue'
import volunteer from '../../components/common/volunteer.vue'
import essay from '../../components/common/essay.vue'
import disguss from '../../components/common/disguss.vue'
import login from '../user/login.vue'
import Clipboard from 'clipboard'

export default {
  components: {
    teacher,
    volunteer,
    essay,
    disguss,
    login
  },
  data() {
    return {
      url: "https://lingxidan.github.io/",
      panels: {},
      moveArrow: true,
      articles: [],
      searchSel: [{
          id: 0,
          field: "total",
          label: "全部"
        },
        {
          id: 1,
          field: "job",
          label: "职位"
        },
        {
          id: 2,
          field: "school",
          label: "学校"
        },
        {
          id: 3,
          field: "vol",
          label: "志愿者"
        },
        {
          id: 4,
          field: "article",
          label: "文章"
        },
        {
          id: 5,
          field: "post",
          label: "帖子"
        }
      ],
      teachers: [],
      volunteers: [],
      searchMsg: {
        select: "",
        text: ""
      },
      posts:[],
      user:{}
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    let _this = this
    this.panels.top = this.$parent.$refs.top
    this.panels.search = this.$refs.search
    this.panels.rightNav = this.$refs.rightNav
    this.panels.leftNav = this.$refs.leftNav
    this.panels.login = this.$refs.login
    this.panels.login.style.display = "none"

    this.panels.info = this.$refs.info
    this.handleScroll()
    this.searchMsg.select = this.searchSel[0].field
    // 复制按钮
    // console.log(this.$refs)
    window.addEventListener('scroll', this.handleScroll, true); // 监听（绑定）滚轮滚动事件
    this.$request.selectJobByCondition({}).then(
      res => {
        this.teachers = res.data.slice(0, 6)
        console.log(this.teachers)
      }
    )
    this.$request.getVols({}).then(
      res => {
        let userList = []
        for (let i = 0; i < res.data.length; i++) {
          userList.push(res.data[i])
        }
        _this.volunteers = userList.slice(0, 6)
      }
    )
    // this.$request.getRecrs({}).then(
    //   res => {
    //     let userList = []
    //     for (let i = 0; i < res.data.length; i++) {
    //       userList.push(res.data[i])
    //     }
    //     _this.teachers = userList.slice(0, 6)
    //   }
    // )
    this.$request.selectArticleByCondition({}).then(
      res => {
        _this.articles = res.data.slice(0, 8)
      }
    )
    this.$request.selectPostByCondition({}).then(
      res => {
        _this.posts = res.data.slice(0, 6)
      }
    )
  },
  methods: {
    registe(opt) {
      this.$router.push('/registe/' + opt)
    },
    login() {
      this.$router.push('/login')
    },
    cancel() {
      let _login = this.panels.login
      _login.style.display = "none"
    },
    // 滚动条事件
    handleScroll() {
      let _top = this.panels.top
      let _search = this.panels.search
      let _rightNav = this.panels.rightNav
      let _leftNav = this.panels.leftNav
      let _info = this.panels.info

      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let topHeight = _top.clientHeight + 80
      let searchHeight = _search.clientHeight
      let searchWidth = _search.clientWidth

      // console.log(scrollTop,topHeight)
      if (scrollTop > topHeight) {
        _search.style.position = "fixed"
        _search.style.top = "0px"
        _search.style.left = "0px"
        _search.style.right = "0px"
        _search.style.background = "linear-gradient(to bottom,rgb(105, 141, 116) 20%, transparent 80%)"
        _search.style.width = "80%"
        _search.style.padding = "1vh 10vw"
        _search.style.zIndex = "5"
        _rightNav.style.opacity = "1"
        _leftNav.style.opacity = "1"
        _rightNav.style.display = ""
        _leftNav.style.display = ""
        _info.style.marginTop = searchHeight + "px"
      } else {
        _search.style.position = "relative"
        _search.style.background = "inherit"
        _search.style.width = "100%"
        _search.style.padding = "1vh 0"
        _rightNav.style.display = "none"
        _leftNav.style.display = "none"
        _rightNav.style.opacity = "0"
        _leftNav.style.opacity = "0"
        _info.style.marginTop = "0px"
      }
    },
    // 回到顶部的鼠标移入移出
    handleTopEnter() {
      this.moveArrow = false
    },
    handleTopLeave() {
      this.moveArrow = true
    },
    // 回到页面顶部
    scrollTop() {
      let speed = 80
      let timer = setInterval(function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        window.scrollTo(0, scrollTop - speed)
        if (scrollTop <= 0) {
          clearInterval(timer)
        }
      }, 50)
      window.addEventListener('click', function () {
        clearInterval(timer)
      }, true);
    },
    // 复制网址分享
    copy() {
      let _this = this
      let clipboard = new Clipboard(this.$refs.copyBtn)
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功！非常感谢您的分享~',
          type: 'success',
          customClass: "el-self-message",
          iconClass: "el-icon-self-success"
        });
        // 释放内存  
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({
          message: '复制失败了T_T，请您手动复制',
          type: 'error',
          customClass: "el-self-message",
        });
        // 释放内存  
        clipboard.destroy()
      })
    },
    searchByKeyword() {
      this.$router.push({
        path: '/search',
        query: {
          field: this.searchMsg.select,
          text: this.searchMsg.text,
        }
      })
      // console.log()

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
    toZhaomu(){
      if(this.user.id){
        if(this.user.userType=="1"){
          this.$router.push({
            path: '/search',
            query: {
              field: "job",
              text: "",
            }
          })

        }
        if(this.user.userType=="2"){
          this.$router.push({
            path: '/search',
            query: {
              field: "vol",
              text: "",
            }
          })
        }
      }
    },
    toPost(){
      this.$router.push({
        path: '/search',
        query: {
          field: "post",
          text: "",
        }
      })

    }
  },
  watch: {
    '$route'(to,from) {
      this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    }
  },
}
</script>
<style lang="less" scoped>
@import '../../../static/css/main';

.login {
  position: absolute;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(252, 233, 199, 0.6);
}

ul.registe {
  width: 8vw;
  li {
    // width: 8vw;
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    background-color: @secondColor;
    color: #fff;
    cursor: pointer;
    border-radius: 1vw 0 1vw 0;
    margin-top: 0.5vh;
    font-size: 1.6vh;
    letter-spacing: 1px;

    &:first-of-type {
      margin: 0px;
    }

    &:hover {
      color: white;
      background-color: @thirthColor;
    }
  }
}

.index {
  display: flex;
  flex-direction: column !important;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.index>.main {
  position: relative;
  padding: 1vh 2vw 4vh;
  width: 75%;
  // margin: 2vh;
  // margin-top: 1vh;
  display: flex;
  flex-direction: column !important;
  background-color: #fff;
  box-shadow: 0 0 3px 0 #bbb;

  // height: 1000px;
  .search {
    width: 100%;
    padding: 1vh 0;
    transition: .3s;
  }

  .info {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .teachers,.volunteers {
      border-top: 5px solid @thirthColor;
      display: inline-block;
      width: 100%;
      .single-teacher,.single-volunteers {
        height: 10vh;
        border-bottom: 1px solid @sixthColor;
      }
      .single-volunteers {
        border-left: 1px solid @sixthColor;
      }

    }
    .all{
      width: 50%;
    }
  }
}

.leftNav,
.rightNav {
  cursor: pointer;
  position: fixed;
  width: 6%;
  top: 50%;
  transform: translate(0, -80%);
  opacity: 0;
  ul{
    width: 100%;
  }
  li {
    position: relative;
    width: 100%;
    line-height: 6vh;
    font-size: 1.8vh;
    border: 1px solid @sixthColor;
    border-top: none;
    text-align: center;
    // padding: 0 0.4vw;
    color: @mainColor;
    overflow: hidden;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -1vh;
    width: 102%;
    height: 1vh;
    background-color: @thirthColor;
  }

  li:hover {
    background-color: @fourthColor;
      color: white;
    a{
      color: white;
    }
  }
  
}

.leftNav {
  left: 0;
  li{
    border-left: none;
  }
  li.top {
    p.arrow {
      display: block;
      color: @fifthColor;
      transform: rotate(90deg) scaleX(3) scaleY(8);
      font-size: 2vh;
    }
  }

  li.top:hover {
    background-color: @thirthColor;
    a{
      color: white;
    }
  }
}

.rightNav {
  right: 0;
  li{
    border-right: none;
  }
}


.el-popover {
  font-size: 2vh;
  padding: 2vh;
  min-width: 5vw;
}
.copyBtn {
  display: inline-block;
  background-color: @secondColor;
  color: #f7f7f7;
  border: none;
  height: 4vh;
  line-height: 4vh;
  padding: 0 1vw;
  font-size: 1.6vh;
  letter-spacing: 1px;
}

.copyBtn:hover {
  background-color: @thirthColor;
  color: white;
}

.info,
.articles,
.postCard {
  .title {
    position: relative;
    width: 100%;
    margin: 2.5vh 0 1vh;
    border-left: 0.5vw solid @mainColor;
    padding: 0.8vh;
    padding-left: 1.3vw;
    background: linear-gradient(to right,@secondColor 5%, transparent 50%);
    color: #f7f7f7;
    display: flex;
    .name{
      width: 30%;
      letter-spacing: 0.5vw;
      font-size: 3vh;
      font-weight: bold;
      text-align: left;
    }
    .more{
      cursor: pointer;
      position: absolute;
      text-decoration: underline;
      bottom: 1vh;
      left: 25%;
      letter-spacing: 1px;
      font-size: 1.5vh;
      &:hover{
        color: @mainColor;
      }
    }
  }
  .disgusses{
    // border-top: 5px solid @thirthColor;
  }
  .post-single {
    margin: 0.6vw;
    border-bottom: 1px solid @sixthColor;
    transition: .3s;
    // &:hover{
    //   box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    // }
  }
}
.articles{
  .title{
    margin-top: 1.2vh;
  }
}
</style>