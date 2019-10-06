<template>
  <div class="interest-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="我关注的志愿者" name="first">
        <div class="main-interest">
          <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
          :teacher="teacher"
          :interest="true"></teacher>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="我关注的文章" name="first">
        <div class="main-interest">
          <essay class="half article" v-for="(article, idx) in articleList" :key="index"
          :article="article"></essay>
        </div></el-tab-pane>
      <el-tab-pane label="我关注的帖子" name="second">
        <div class="main-interest">
          <disguss class="half" v-for="(index,o) in 5" :key="index" :disguss="disgussStar">
          </disguss>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import teacher from '../../components/common/teacher'
import essay from '../../components/common/essay'
import disguss from '../../components/common/disguss'
export default {
  name: 'interest-list',
  data() { 
    return {
      activeName: 'first',
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
      
      // articleInterests:[{
      //   name:"文章",

      // }]
    }
  },
  props: {

  },
  components:{
    essay,
    disguss,
    teacher
  },
  mounted() {
    let _this=this
    this.user = JSON.parse(sessionStorage.getItem('user')); 
    // if(this.user.education){
    //   console.log("志愿者")
    // }
    // if(this.user.identify){
    //   console.log("招募者")
    // }
    this.$request.selectInterestByCondition({userId:this.user.userId,type:3}).then(
      res=>{
        console.log(res.data)
        _this.articleList = res.data
      }
    )
    this.$request.selectInterestByCondition({userId:this.user.userId,type:4}).then(
      res=>{
        console.log(res.data)
        _this.postList = res.data
      }
    )
  },
  methods:{
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
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
 }
</script>

<style lang="less" scoped>
.interest-list{
  .main-interest{
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;
  }
  .half{
    width: 45%;;
    &:nth-child(2n){
      position: relative;
      &::before{
        content: "";
        position: absolute;
        width: 2px;
        height: 100px;
        background-color: #fce9c7;
        left:0;
        top:50%;
        transform: translateY(-50%);
      }
    }
  }
  .article{
    margin-left: 10px;
    width: 30%;
  }
}
</style>