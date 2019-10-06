<template>
  <div class="search-list">
    <!-- 搜索栏 -->
    <div class="search" ref="search">
      <el-select name="" id="" 
      v-model="searchMsg.select.value"
      class="searchSel">
        <el-option v-for="sel in searchSel" 
        :key="sel.id" :value="sel.value"
        :label="sel.label"></el-option>
      </el-select><el-input v-model="keyword"  placeholder="请输入内容" 
      class="input-with-select searchInput">
      </el-input><el-button icon="el-icon-search">搜索</el-button>
    </div>
    <!-- <input-select ref="totalSel" :inputs="inputData" :selects="selectData" :searchBtn="false" @search="search"></input-select> -->
    <div class="search-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="招聘职位" name="first">
          <div class="main-interest">
          <!-- <volunteer v-for="(volunteer,index) in volunteers" :key="index"
          :volunteer="volunteer"></volunteer> -->
            <teacher class="single-teacher" v-for="(teacher,index) in teachers" :key="index"
            :teacher="teacher"></teacher>
          
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="招募者" name="second">
          <div class="main-interest">
            <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
            :teacher="teacher"
            :interest="true"></teacher>
          </div>
        </el-tab-pane> -->
        <el-tab-pane label="文章" name="second">
          <div class="main-interest">
            <essay class="half article" v-for="(article, index) in articles" :key="index"
            :article="article"></essay>
          </div></el-tab-pane>
        <el-tab-pane label="帖子" name="third">
          <div class="main-interest">
            <disguss class="half" v-for="(post,index) in posts" :key="index" :disguss="post">
            </disguss>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import teacher from '../../components/common/teacher'
import volunteer from '../../components/common/volunteer.vue'
import essay from '../../components/common/essay'
import disguss from '../../components/common/disguss'
import inputSelect from '../../components/common/input-select.vue'
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'search-list',
  data() { 
    return {
      activeName:"first",
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
      searchMsg:{
        select: "",
        searchText:""
      },
      selectDataAddr: [{
          placeholder: "省",
          model: "province",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[0].clear()
            request.getCity({
                code: val,
                level: 2
              })
              .then(
                res => {
                  _this.selectDataAddr[1].options = res.data
                }
              )
          },
          clear: () => {
            let _this = this
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'city','')
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'town','')
            _this.selectDataAddr[1].options = []
            _this.selectDataAddr[2].options = []
          },
          options: []
        },
        {
          placeholder: "市",
          model: "city",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[1].clear()
            request.getCity({
                code: val,
                level: 3
              })
              .then(
                res => {
                  _this.selectDataAddr[2].options = res.data
                }
              )
          },
          clear: () => {
            let _this = this
            _this.$set(_this.$refs.totalSel.searchData.selectData,
              'town','')
            _this.selectDataAddr[2].options = []
          },
          options: []
        },
        {
          placeholder: "县/区",
          model: "town",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[2].clear()
          },
          clear: () => {},
          options: []
        },
        {
          placeholder: "学校规模",
          model: "scale",
          label: "name",
          value: "code",
          width: 170,
          change: (val) => {
            let _this = this
            if (!val) {
              return
            }
            _this.selectDataAddr[2].clear()
          },
          clear: () => {},
          options: []
        }
      ],
      selectData:[],
      teachers:[],
      articles:[],
      posts:[],

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
    disguss
  },
  created(){
    this.keyword=this.$route.query.keyword
    this.search()
  },
  mounted() {
    this.searchMsg.select = this.searchSel[0]
    this.selectData=this.selectDataAddr

  },
  methods:{
    search(){
      let _this=this
      _this.$request.selectJobByCondition({keyword:this.keyword}).then(
        res=>{
          console.log(res.data)
          this.teachers=res.data
        }
      )
      _this.$request.selectArticleByCondition({keyword:this.keyword}).then(
        res=>{
          console.log(res.data)
          this.articles=res.data
        }
      )
      _this.$request.selectPostByCondition({keyword:this.keyword}).then(
        res=>{
          console.log(res.data)
          this.posts=res.data
        }
      )

    }
  },
 }
</script>

<style lang="less" scoped>
.search-list{
  position: relative;
  width: 80%;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search{
    width: 90%;
    padding: 10px;
    transition: .3s;
    padding: 20px;
    // padding-bottom: 10px;
    // background-color: rgba(255,255,255,.5);
    // .searchSel{
    //   width: 10%;
    // }
    // .searchInput{
    //   width: 60%;
    // }
  }
  .search-tab{
    width: 80%;
    padding: 20px 30px;
    // background-color: #eee;
    border: 1px solid #eee;
    margin-bottom: 20px;
  }
}
</style>