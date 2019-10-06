<template>
  <div class="info-recr">
    <div class="left">
      <div class="recr">
        <div class="name">{{recruiter.name}}</div>
        <div class="base">
          <p class="identity">{{recruiter.identity}}</p>
          <p><label for="">公司地址:</label>{{recruiter.address}}</p>
        </div>
        <div class="contact">
          <p><label for="">联系邮箱:</label>{{recruiter.email}}</p>
          <p><label for="">联系电话:</label>{{recruiter.phone}}</p>
        </div>
        <div class="fabu">
          <p><label for="">发布文章:</label>{{recruiter.schoolCnt}}篇</p>
          <p><label for="">发布帖子:</label>{{recruiter.schoolCnt}}个</p>
        </div>
      </div>
    </div>
    <div class="info">
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="activeName" >
        <el-tab-pane label="岗位" name="first">
          <div class="main-interest">
            <teacher class="half" v-for="(teacher,index) in teachers" :key="index"
            :teacher="teacher"></teacher>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学校" name="second">
          <div class="main-interest">
            <div class="school" @click="showSchool" v-for="idx in 5" :key="idx">
              <div class="school-name">{{school.name}}</div>
              <p><label for="">学校地址:</label>{{school.address}}</p>
              <p><label for="">招聘职位:</label>{{school.jobCnt}}个</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文章" name="third">
          <div class="main-interest">
            <essay class="half article" v-for="(index, o) in 9" :key="index"></essay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="fourth">
          <div class="main-interest">
            <disguss class="half" v-for="(index,o) in 5" :key="index">
              <!-- <div slot="num"><div class="num"></div></div> -->
            </disguss>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import teacher from '../../../components/common/teacher'
import essay from '../../../components/common/essay'
import disguss from '../../../components/common/disguss'
export default {
  name: 'info-recr',
  data() { 
    return {
      activeName:"first",
      recruiter:{
        name:"张XX",
        identiCard:"142729********20",
        phone:"1738200****",
        email:"ajoheobn@ss.com",
        password:"adsfa",
        address:"北京市朝阳区",
        reason:"s",
        identity:"简巨科技有限公司HR经理",
        schoolCnt:8,
        zhiwei:{
          cnt:10,
          opened:6,
          closed:4
        },
      },
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
      
      school:{
        name:"XXXX学校",
        address:"北京市北京市昌平区",
        education:"小学",
        describe:"成立于XX年，已有20年历史，由XXX捐资建立",
        establishDt:"2009年1月1日",
        scale:"100-500",
        jobCnt:10
      },
      
    
    }
  },
  props: {

  },
  components:{
    teacher,
    essay,
    disguss,
  },
  mounted() {

  },
  methods:{
    showSchool(){
      this.$router.push("/school")
    }

  },
 }
</script>

<style lang="less" scoped>
.info-recr{
  width: 70%;
  margin: 20px auto;
  display: flex;
  .left{
    width: 28%;
    // background-color: #fff;
    margin-right: 20px;
    position: relative;
    // top: -50px;
    // width: 40%;
    // height: 900px;
    // background-color: yellow;
    display: flex;
    justify-content: center;
    .recr{
      border-top: #fba400 8px solid;
      box-shadow: 0 0 10px 0 #eee;
      margin-left: 10px;
      width: 100%;
      // height: 100%;
      background-color: #fff;
      padding: 5px 10px;
      .name{
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        margin-top: 10px;
        margin-bottom: 8px;
      }
      p{
        text-align: left;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: black;
        label{
          margin-right: 8px;
          font-weight: 700;
          color: #666;
        }
      }
      p.identity{
        font-size: 16px;
        font-weight: 400;
      }
      .fabu{
        border-top: 6px solid #f6f6f8;
        padding-top: 5px;
        // padding-left: 10px;
        p{
          cursor: pointer;
          text-decoration: underline;
          label{
            text-decoration-line: 0px;
          }
          &:hover{
            color: coral;
          }
        }
      }
    }
  }
  .info{
    width: 70%;
    padding: 20px;
    background-color: #fff;
  }
  
    .school{
      &:nth-of-type(1){
        border-top: 1px solid #eee;
      }
      cursor: pointer;
      border: 1px solid #eee;
      border-top: none;
      padding: 20px 0;
      // box-shadow: 0 0 10px 0 #eee;
      display: flex;

      .school-name{
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        padding: 0px 50px;
      }
      p{
        margin-left: 100px;
      }
      &:hover{
        box-shadow: 0 0 10px 0 #eee;

      }
    }
}
</style>