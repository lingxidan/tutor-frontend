<template>
  <div class="search-list">
    <!-- 搜索栏 -->
    <div class="search" ref="search">
      <el-select name="" id="" 
      v-model="searchMsg.select"
      class="searchSel">
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
      </el-select><el-input v-model="searchMsg.text"  placeholder="请输入内容" 
      class="input-with-select searchInput">
      </el-input><el-button icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="search-tab">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-if="!user.id">
          <el-tab-pane label="职位" name="job">
            <div class="main-search-post" v-if="teachers.length>0">
              <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
              :teacher="teacher"></teacher>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <template v-else>
          <el-tab-pane label="职位" v-if="user.userType=='1'" name="job">
            <div class="main-search-post" v-if="teachers.length>0">
              <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
              :teacher="teacher"></teacher>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <template v-if="!user.id">
          <el-tab-pane label="学校" name="school">
            <div class="main-search-post" v-if="schools.length>0">
              <school-info class="half" v-for="(school,index) in schools" :key="index" 
              :school="school"
              ></school-info>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <template v-else>
          <el-tab-pane label="学校" v-if="user.userType=='1'" name="school">
            <div class="main-search-post" v-if="schools.length>0">
              <school-info class="half" v-for="(school,index) in schools" :key="index"
              :school="school"></school-info>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <template v-if="!user.id">
          <el-tab-pane label="志愿者" name="vol">
            <div class="main-search-post" v-if="volunteers.length>0">
              <volunteer class="half" v-for="(volunteer,index) in volunteers" :key="index"
              :volunteer="volunteer"></volunteer>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <template v-else>
          <el-tab-pane label="志愿者" v-if="user.userType=='2'" name="vol">
            <div class="main-search-post" v-if="volunteers.length>0">
              <volunteer class="half" v-for="(volunteer,index) in volunteers" :key="index"
              :volunteer="volunteer"></volunteer>
            </div>
            <span v-else>无结果</span>
          </el-tab-pane>
        </template>
        <el-tab-pane label="文章" name="article">
          <div class="main-search" v-if="articles.length>0">
            <essay class="article" v-for="(article, index) in articles" :key="index"
            :essay="article"></essay>
          </div>
          <span v-else>无结果</span>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="post">
          <div class="main-search-post" v-if="posts.length>0">
            <disguss class="half" v-for="(post,index) in posts" :key="index" :disguss="post">
            </disguss>
          </div>
          <span v-else>无结果</span>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import teacher from '../../components/common/teacher'
import volunteer from '../../components/common/volunteer.vue'
import schoolInfo from '../../components/common/school.vue'
import essay from '../../components/common/essay'
import disguss from '../../components/common/disguss'
import inputSelect from '../../components/common/input-select.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'search-list',
  data() { 
    return {
      activeName:"job",
      posts:[],
      articles:[],
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
      searchMsg:{
        select: "",
        text:""
      },
      teachers:[],
      schools:[],
      volunteers:[],
      user:{}

    }
  },
  props: {

  },
  components:{
    inputSelect,
    pagination,
    teacher,
    volunteer,
    essay,
    disguss,
    schoolInfo
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    this.searchMsg.select = this.$route.query.field
    this.searchMsg.text = this.$route.query.text
    this.search()
  },
  mounted() {
  },
  methods:{
    search(){
      let _this=this
      if(this.searchMsg.select == 'total'||this.searchMsg.select == 'vol'){
        _this.$request.getVols({keyword:this.searchMsg.text}).then(
          res=>{
            this.volunteers=res.data
          }
        )
        this.activeName=this.searchMsg.select
      }
      if(this.searchMsg.select == 'total'||this.searchMsg.select == 'job'){
        _this.$request.selectJobByCondition({keyword:this.searchMsg.text}).then(
          res=>{
            this.teachers=res.data
          }
        )
        this.activeName=this.searchMsg.select
      }
      if(this.searchMsg.select == 'total'||this.searchMsg.select == 'school'){
        _this.$request.selectSchoolByCondition({keyword:this.searchMsg.text}).then(
          res=>{
            this.schools=res.data
          }
        )
        this.activeName=this.searchMsg.select
      }
      if(this.searchMsg.select == 'total'||this.searchMsg.select == 'article'){
        _this.$request.selectArticleByCondition({keyword:this.searchMsg.text}).then(
          res=>{
            this.articles=res.data
          }
        )
        this.activeName=this.searchMsg.select
      }
      if(this.searchMsg.select == 'total'||this.searchMsg.select == 'post'){
        _this.$request.selectPostByCondition({keyword:this.searchMsg.text}).then(
          res=>{
            this.posts=res.data
          }
        )
        this.activeName=this.searchMsg.select
      }
      if(this.searchMsg.select == 'total'){
        this.activeName=this.searchMsg.select
        if(this.user.id){
          if(this.user.userType==1){
            // 获取职位和学校
            this.activeName="job"
          }
          if(this.user.userType==2){
            this.activeName="vol"
          }
        }else{
          this.activeName="job"
        }
      }

      this.$router.push({
        path: '/search',
        query: {
          field: this.searchMsg.select,
          text: this.searchMsg.text,
        }
      })
    },
    tabClick(tag){
      this.$router.push({
        path: '/search',
        query: {
          field: tag.name,
          text: this.searchMsg.text,
        }
      })
    }
  },
  watch:{
    "$route"(to,from){
      this.searchMsg.select = this.$route.query.field
      this.searchMsg.text = this.$route.query.text
      this.search()
    }
  }
 }
</script>

<style lang="less" scoped>
.search-list{
  position: relative;
  width: 70%;
  background-color: #fff;
  margin: 0 auto;
  // margin-top: 20px;
  // margin-bottom: 20px;
  margin: 2vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search{
    width: 90%;
    padding: 10px;
    transition: .3s;
    padding: 20px;
  }
  .search-tab{
    width: 90%;
    padding: 2vh 2vw;
    min-height: 70vh;
    padding-bottom: 3vh;
    .main-search{
      // padding: 1vh;
      display: flex;
      flex-wrap: wrap;
      .article{
        width: 18vw;
        margin-left: 1vw;
      }
    }
    .main-search-post{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 1vh;
      .half{
        width: 90%;
        border-bottom: 0.1vh solid #ccc;
      }
    }
  }
}
</style>
<style lang="less">
.search-list{
  .el-tabs__item{
    width: 10vw;
  }
}
</style>