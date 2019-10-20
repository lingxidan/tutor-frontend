<template>
  <div class="index">
    <!--导航栏以及轮播图-->
    <div class="show" ref="top">
      <!-- <carousel></carousel> -->
    </div>
    <!--左右导航-->
    <div class="rightNav" ref="rightNav">
      <ul>
        <li @click="login">登录</li>
        <el-popover placement="left" trigger="hover">
          <ul class="registe">
            <li @click="registe('school')">我想招募</li>
            <li @click="registe('volunteer')">我想支教</li>
          </ul>
          <li slot="reference" style="border-top:none;">注册</li>
          <!-- <li >传播分享</li> -->
        </el-popover>
        <!-- <li>我的信息</li> -->
        <li>聊天室</li>
        <el-popover placement="left" trigger="hover">
          <input type="text" id="copy_url" v-model="url" readonly/>
          <button ref="copyBtn" class="copyBtn"
          data-clipboard-target="#copy_url" @click="copy">
            复制网址
          </button>
          <li slot="reference" style="border-top:none;">传播分享</li>
        </el-popover>
      </ul>
    </div>
    <div class="leftNav" ref="leftNav">
      <ul>
        <li>招募信息</li>
        <li>文章</li>
        <li>交流区</li>
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
        <el-select name="" id="" 
        v-model="searchMsg.select.value"
        class="searchSel">
          <el-option v-for="sel in searchSel" 
          :key="sel.id" :value="sel.value"
          :label="sel.label"></el-option>
        </el-select><el-input v-model="searchMsg.searchText"  placeholder="请输入内容" 
        class="input-with-select searchInput">
        </el-input><el-button icon="el-icon-search" @click="searchByKeyword">搜索</el-button>
      </div>
      <!-- 日志文章 -->
      <div class="articles">
        <div class="title">日志文章</div>
        <el-row :gutter="10">
          <!-- <el-col :span="6"  class="el-col"> -->
            <!-- <essay v-for="(article, index) in articles" :key="index"
            :essay="article"></essay> -->
            <essay v-for="(article, index) in 9" :key="index" ></essay>
          <!-- </el-col> -->
          
        </el-row>
      </div>
      <!-- 招募职位、志愿者信息查看 -->
      <div class="info" ref="info">
        <div class="title">招募信息</div>
        <div class="teachers">
          <teacher class="single-teacher" v-for="(teacher,index) in teachers" :key="index"
          :teacher="teacher"></teacher>
        </div>
        <div class="volunteers">
          <volunteer class="single-volunteers" v-for="(volunteer,index) in volunteers" :key="index"
          :volunteer="volunteer"></volunteer>
        </div>
      </div>
      <!-- 热门帖子 -->
      <div class="postCard">
        <div class="title">讨论交流区</div>
        <!-- <disguss class="post-single" v-for="(post,index) in posts" :key="index" :disguss="post">
          <div slot="num"><div class="num"></div></div>
        </disguss> -->
        <disguss v-for="(index,o) in 4" :key="index" :disguss="disgussHot">
              <div slot="num"><div class="num">{{index}}</div></div>
            </disguss>
        <!-- <el-tabs tab-position="top" type="card" class="elTabs">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-self-hot"></i> 热榜</span>
            <disguss v-for="(index,o) in 4" :key="index" :disguss="disgussHot">
              <div slot="num"><div class="num">{{index}}</div></div>
            </disguss>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-star-on"></i> 关注</span>
            <disguss v-for="(index,o) in 5" :key="index" :disguss="disgussStar">
              <div slot="num"><div class="num"></div></div>
            </disguss>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
    <div class="login" ref="login">
        <login @cancel="cancel"></login>
    </div>

  </div>
</template>

<script>
import carousel from '../../components/common/carousel.vue'
import teacher from '../../components/common/teacher.vue'
import volunteer from '../../components/common/volunteer.vue'
import essay from '../../components/common/essay.vue'
import disguss from '../../components/common/disguss.vue'
import login from '../user/login.vue'
import Clipboard from 'clipboard'

export default {
  components: {
    carousel,
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
      searchSel:[
        {
          id:0,
          field:"total",
          label:"全部",
          value:"全部"
        },
        {
          id:1,
          field:"school",
          label:"学校",
          value:"学校"
        },
        {
          id:2,
          field:"teacher",
          label:"教职",
          value:"教职"
        }
      ],
      teachers:[
        {
          name:"数学教师",
          during:"4-10年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"刘女士",
          contactJob:"教育局代表人",
        },
        {
          name:"语文教师",
          during:"1-5年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"张先生",
          contactJob:"校长",
        },
        {
          name:"语文教师",
          during:"1-5年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"张先生",
          contactJob:"校长",
        },
        {
          name:"语文教师",
          during:"1-5年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"张先生",
          contactJob:"校长",
        },
        {
          name:"语文教师",
          during:"1-5年",
          education:"本科",
          teacherCert:true,
          schoolName:"XXX小学",
          schoolAddr:"北京市 北京市 朝阳区",
          contactImg:"/src/assets/logo_vue.png",
          contactPerson:"张先生",
          contactJob:"校长",
        }],
      volunteers:[{
          name:"张老师",
          during:"4-10年经验",
          education:"本科",
          projects:["数学","英语","语文"],
        },
        {
          name:"曾老师",
          during:"3-5年经验",
          education:"研究生",
          projects:["数学","语文"],
        },
        {
          name:"曾老师",
          during:"3-5年经验",
          education:"研究生",
          projects:["数学","语文"],
        },
        {
          name:"曾老师",
          during:"3-5年经验",
          education:"研究生",
          projects:["数学","语文"],
        },
        {
          name:"曾老师",
          during:"3-5年经验",
          education:"研究生",
          projects:["数学","语文"],
        }],
      searchMsg:{
        select: "",
        searchText:""
      },
      disgussHot:{
        title:"志愿过程中的费用如何解决?",
        content:"当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取",
        img:"./../../../static/img/panel_3.jpg",
        viewCnt:13000,
        disCnt:300
      },
      disgussStar:{
        title:"志愿过程中会遇到什么不可预计的事情?",
        content:"志愿过程中，会有哪些需要预防的事情，有什么应急处理方法志愿过程中，会有哪些需要预防的事情，有什么应急处理方法志愿过程中，会有哪些需要预防的事情，有什么应急处理方法",
        img:"./../../../static/img/panel_1.jpg",
        viewCnt:13000,
        disCnt:300
      }
    }
  },
  mounted() {
    let _this=this
    this.panels.top = this.$refs.top
    this.panels.search = this.$refs.search
    this.panels.rightNav = this.$refs.rightNav
    this.panels.leftNav = this.$refs.leftNav
    this.panels.login = this.$refs.login
    this.panels.login.style.display = "none"

    this.panels.info = this.$refs.info
    this.handleScroll()
    this.searchMsg.select = this.searchSel[0]
    // 复制按钮
    // console.log(this.$refs)
    this.clipboard = new Clipboard(this.$refs.copyBtn)
    window.addEventListener('scroll', this.handleScroll, true); // 监听（绑定）滚轮滚动事件
    this.$request.selectJobByCondition({}).then(
      res=>{
        console.log(res.data)
        this.teachers=res.data.slice(0,6)
      }
    )
    this.$request.getUser().then(
      res=>{
        res.data=res.data.reverse()
        let userList=[]
        for(let i=0;i<res.data.length;i++){
          _this.getUser(res.data[i].id,(res)=>{
            if(userList.length<6){
              userList.push(res.data)
              console.log(userList)
              _this.volunteers=userList
            }
          })
        }
      }
    )
    this.$request.selectArticleByCondition({}).then(
      res=>{
        _this.articles=res.data
        // res.data=res.data.reverse()
        // let userList=[]
        // for(let i=0;i<res.data.length;i++){
        //   _this.getUser(res.data[i].id,(res)=>{
        //     if(userList.length<6){
        //       userList.push(res.data)
        //       console.log(userList)
        //       _this.volunteers=userList
        //     }
        //   })
        // }
      }
    )
    this.$request.selectPostByCondition({}).then(
      res=>{
        _this.posts=res.data
        // res.data=res.data.reverse()
        // let userList=[]
        // for(let i=0;i<res.data.length;i++){
        //   _this.getUser(res.data[i].id,(res)=>{
        //     if(userList.length<6){
        //       userList.push(res.data)
        //       console.log(userList)
        //       _this.volunteers=userList
        //     }
        //   })
        // }
      }
    )
  },
  methods: {
    getUser(userId,func){
      let _this=this
      _this.$request.getVolunteer({userId:userId}).then(
        res=>{
          func(res)
        },
        error=>{
          _this.$request.getRecuriter({userId:userId}).then(res=>{
            func(res)
          },)
        }
      )
    },
    // school(){
    //   this.$router.push('/registe/school')
    // },
    // volunteer(){
    //   this.$router.push('/registe/volunteer')
    // },
    registe(opt){
      console.log(opt)
      this.$router.push('/registe/'+opt)
    },
    login(){
      // let _login = this.panels.login
      // _login.style.display ="block"
      this.$router.push('/login')
    },
    cancel(){
      let _login = this.panels.login
      _login.style.display ="none"
      // this.$router.push('/login')
    },
    // 滚动条事件
    handleScroll() {
      let _top = this.panels.top
      let _search = this.panels.search
      let _rightNav = this.panels.rightNav
      let _leftNav = this.panels.leftNav
      let _info = this.panels.info

      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let topHeight = _top.clientHeight+80
      let searchHeight = _search.clientHeight
      let searchWidth = _search.clientWidth

      // console.log(scrollTop,topHeight)
      if (scrollTop > topHeight) {
        _search.style.position = "fixed"
        _search.style.top = "0px"
        _search.style.left = "0px"
        _search.style.right = "0px"
        _search.style.backgroundColor = "#fce9c7"
        _search.style.zIndex = "5"
        _rightNav.style.opacity = "1"
        _leftNav.style.opacity = "1"
        _rightNav.style.display = ""
        _leftNav.style.display = ""
        _info.style.marginTop = searchHeight + "px"
      } else {
        _search.style.position = "relative"
        _search.style.backgroundColor = "inherit"
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
      let clipboard = _this.clipboard
      clipboard.on('success', e => {
        // alert("复制成功")
        
        this.$message({
          message: '复制成功！非常感谢您的分享~',
          type: 'success',
          customClass:"el-self-message",
          iconClass:"el-icon-self-success",
        });
        // 释放内存  
        clipboard.destroy()
        _this.clipboard = new Clipboard(_this.$refs.copyBtn)
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({
          message: '复制失败了T_T，请您手动复制',
          type: 'error',
          customClass:"el-self-message",
        });
        // 释放内存  
        clipboard.destroy()
        _this.clipboard = new Clipboard(_this.$refs.copyBtn)
      })
    },
    searchByKeyword(){
      this.$router.push({path:'/search',query:{keyword:this.searchMsg.searchText}})
      // console.log()

    }
  }
}
</script>
<style lang="less">
@import '../../../static/css/main';
.el-message .el-message__content{
  color:@secondColor;
  display: inline-block;
  margin-left:30px;
}
.el-self-message{
  background-color: #fff;
  border-color: @mainColor;
}
</style>

<style lang="less" scoped>
@import '../../../static/css/main';
.login{
  position: absolute;
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 200;
  background-color: rgba(252,233,199,0.6);
  // background-color: rgba(250,184,62,0.5);
  // background-color: rgba(251,164,0,0.6);
  // background-color: rgba(255,255,255,.5);
  // opacity: .7;
}
ul.registe{
  li{
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color:@secondColor;
    color: #fff;
    cursor: pointer;
    border-radius: 10px 0 10px 0;
    margin-top: 5px;
    font-size: 13px;
    &:first-of-type{
      margin: 0px;
    }
    &:hover{
      color:white;
      background-color: @hoverColor;
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
  .show {
    width: 100%;
    margin: 10px 80px;
  }
}
.index>.main {
  position: relative;
  padding: 3px;
  width: 70%;
  margin: 20px;
  margin-top: 0px;
  display: flex;
  flex-direction: column !important;
  // height: 1000px;
  .search{
    width: 100%;
    padding: 10px;
    transition: .3s;
    // padding-bottom: 10px;
    // background-color: rgba(255,255,255,.5);
    // .searchSel{
    //   width: 10%;
    // }
    // .searchInput{
    //   width: 60%;
    // }
  }
  .info{
    position: relative;
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .teachers{
      border-top: 5px solid @secondColor;
      display: inline-block;
      width: 50%;
      .single-teacher{
        height: 70px;

      }
      
    }
    .volunteers{
      border-top: 5px solid @secondColor;
      display: inline-block;
      width: 50%;
      .single-volunteers{
        height: 70px;
      }
    }
  }
}

.leftNav,
.rightNav {
  cursor: pointer;
  position: fixed;
  width: 5%;
  top: 50%;
  transform: translate(0, -50%);
  opacity: 0;
  transition: opacity .5s ease;
  li {
    width: 100%;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
    border: 1px solid #fbeedc;
    border-top: 0;
    padding: 5px;
    text-align: center;
    overflow: hidden;
  }

  li:first-child {
    border-top: 5px solid @secondColor;
  }
  li:hover{
    background-color:@hoverColor;
    color: #fff;
  }
}

.leftNav {
  left: 0;
  li.top {
    background-color:@secondColor;
    p.arrow {
      display: block;
      color: white;
      transform: rotate(90deg) scaleX(3) scaleY(8);
      margin-left: -10px;
    }
  }
  li.top:hover{
    background-color:@hoverColor;
    color:white;
  }
}
.rightNav{
  right: 0;
}

#copy_url{
  display: inline-block;
  background-color: rgb(252, 252, 252);
  border:none;
  border: 1px solid @secondColor;
  margin-bottom: 5px;
  padding: 5px;
  padding-bottom: 3px;
  text-align: center;
}
.copyBtn{
  display: inline-block;
  background-color: @secondColor;
  color: #f7f7f7;
  border: none;
  padding: 5px 10px;
  border-radius: 10px 0px 10px 0px;
}
.copyBtn:hover{
  background-color: @hoverColor;
  color:white;
}
.info,.articles,.postCard{
  .title{
    position: relative;
    width:100%;
    margin-top:30px;
    margin-bottom:20px;
    letter-spacing: 20px;
    font-size: 25px;
    background: url('../../../static/img/nav_bc.png') no-repeat center;
    // color: rgb(255,255,255,1);
    font-family: @secondFont;
    color:#f7f7f7;
    // border-radius: 5px;
  }
  .post-single{
    margin: 5px;
  background-color: #fff;
  }
  // .title:before{
  //   content: "";
  //   position: absolute;
  //   left:0;
  //   width:100%;
  //   height: 100%;
  //   background-color: rgba(255,255,255,.2);
  // }
  // .title:hover{
  //   color:@mainColor;
  // }
}
.postCard{
  // background-color: #fff;
}
.elTabs{
  background-color: #fff;
}
.single-teacher{
  border: 1px solid #fbeedc;
}

</style>
