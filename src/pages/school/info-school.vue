<template>
  <div class="detail-school">
    <div class="school-info">
      <div class="name">{{school.name}}</div>
      <div class="info">
        <div class="base-info">
          <p><label for="">学校地址:</label>{{school.addressName}}</p>
          <p><label for="">科目等级:</label>{{school.education}}</p>
          <p><label for="">成立时间:</label>{{school.establishDt}}</p>
          <p><label for="">学校规模:</label>{{school.scale}}人</p>
        </div>
        <div class="content">
          <label for="">学校简介:</label>
          <p>{{school.describe}}</p>
        </div>
      </div>
    </div>
    <div class="zhiwei-recr">
      <div class="zhiwei">
        <div class="name">招聘职位</div>
        <zhiweiPart class="single-teacher" v-for="(teacher,index) in zhiwei" :key="index"
        :teacher="teacher"></zhiweiPart>
      </div>
      <!-- <div class="recr">
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
      </div> -->
    </div>
    <!-- <div class="menu">
      <ul>
        <li v-if="!interest.id" @click="addInterest">
          <i class="el-icon-star-off"></i>
          收藏
        </li>
        <li v-else @click="deleteInterest">
          <i class="el-icon-star-on"></i>
          取消收藏
        </li>
        <li @click="jubao">
          <i class="el-icon-s-release"></i>
          <label v-if="school.status==-2">已被举报</label>
          <label v-if="school.status==0">举报</label>
          <label v-if="school.status==-1">已被删除</label>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import zhiweiPart from '../../components/common/teacher.vue'
export default {
  name: 'detail-school',
  data() { 
    return {
      school:{
        name:"XXXX学校",
        address:"北京市北京市昌平区",
        education:"小学",
        describe:"成立于XX年，已有20年历史，由XXX捐资建立",
        establishDt:"2009年1月1日",
        scale:"100-500",
        status:0
      },
      zhiwei:[
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
        }
      ],
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
      user:{},
      interestList:[],
      interest:{}
    }
  },
  props: {

  },
  components:{
    zhiweiPart
  },
  created(){
    // this.user={}
    // this.user.name=""
    // this.user.userId=32
    this.user = JSON.parse(sessionStorage.getItem('user')); 
    // let user = JSON.parse(sessionStorage.getItem('user'))||{}
    // let postId=this.$route.query.id
    // this.comment={
    //     type:2,
    //     userId:user.userId||0,
    //     mainId:postId,
    //     msg:this.msg
    //   }
    let schoolId=this.$route.query.id
    let _this=this
    this.$request.selectSchoolById({schoolId}).then(
      res=>{
            _this.school=res.data
        _this.$request.selectJobByCondition({schoolId}).then(
          res=>{
            // console.log(res.data)
            _this.zhiwei=res.data
            // let schoolId=_this.zhiwei.schoolId
            
          }
        )

      }
    )

  },
  mounted() {
    this.getUserInfo()

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
    getUserInfo(){
      let _this=this
      _this.interest={}
      this.$request.selectSchoolById({schoolId:9}).then(res=>{
        // console.log(res)
        _this.school=res.data
        _this.getUser(_this.school.userId,(res)=>{
          _this.user=res.data
          _this.$request.selectJobByCondition({userId:_this.school.userId}).then(
            res=>{
              console.log(res)
              _this.zhiwei=res.data
              _this.zhiwei.forEach(data=>{
                data.schoolName=_this.school.name
                data.schoolAddr=_this.school.addressName
                data.userId=_this.user.userId
                data.contactPerson=_this.user.name
                data.contactJob=_this.user.identify
              })
            }
          )
        })
        _this.$request.selectInterestByCondition({userId:_this.school.userId,type:3}).then(
          res=>{
            // let interestList=[]
            res.data.forEach(data=>{
              // interestList.push(data.collectId)
              if(data.collectId == _this.school.id){
                _this.interest=data
              }
            })
            // _this.interestList=interestList
          }
        )
        // _this.$request.selectCommentByCondition(_this.comment).then(
        //   res=>{
        //     _this.commentList=res.data
        //     _this.commentList.forEach(data=>{
        //       data.author=""
        //       let userId = data.userId
        //       _this.getUser(userId,(res)=>{
        //         data.author = res.data.name
        //         data={...data}
        //         _this.commentList=[..._this.commentList]
        //       })
        //     })
        //     _this.commentList=[..._this.commentList]
        //   }
        // )
      })
    },
    addInterest(){
      let _this=this
      let param={
        userId:this.user.userId,
        collectId:this.school.id,
        type:3,
      }
      _this.$request.insertInterest(param).then(
        res=>{
          _this.$message.success("收藏成功")
          _this.getUserInfo()
        }
      )
    },
    deleteInterest(){
      let _this=this
      _this.$request.deleteInterest({interestId:_this.interest.id}).then(
        res=>{
          _this.$message.success("已取消收藏")
          _this.getUserInfo()

        }
      )
    },
    jubao(){
      let _this=this
      _this.school.status=-2
      _this.$request.updateSchool(_this.school).then(res=>{
          _this.$message.success("已举报")
          _this.getUserInfo()
        
      })

    }
  },
 }
</script>

<style lang="less" scoped>
.detail-school{
  position: relative;
  // margin: 20px 100px;
  // width: 70%;
  margin: 20px auto;
  // background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .school-info{
    width: 85%;
    height: 300px;
    // background-color: blue;
    box-shadow: 0 10px 10px 0 #eee;
    background: linear-gradient(60deg, #fba400 33.3%, #fab83e 0,#fab83e 67%,#fff 0); 
    color: white;
    .name{
      padding: 10px 0 5px 0;
      font-size: 24px;
      font-weight: 900;
      height: 40px;
      line-height: 40px;
      border-bottom: #fafafa 5px solid;
    }
    .info{
      padding: 10px 150px;
      text-align: left;
      display: flex;
      .base-info {
        width: 50%;
        p{
          margin-top: 5px;
        }
      }
      .content{
        margin-top: 8px;
        p{
          margin-top: 5px;
          color: #333;
          font-size: 16px;
        }
      }
      p{
        font-size: 18px;
      }
      label{
        color: #333;
        font-size: 16px;
        margin-right: 20px;
        font-weight: 600;
      }
    }
  }
  .zhiwei-recr{
    position: relative;
    top: -50px;
    width: 75%;
    // height: 900px;
    // background-color: yellow;
    display: flex;
    justify-content: center;
    .zhiwei{
      border-top: coral 8px solid;
      width: 79%;
      height: 100%;
      background-color: #fff;
      padding: 10px 20px;
      .name{
        font-weight: 700;
        font-size: 20px;
        text-align: left;
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        border-left: 6px solid #fba400;
        margin-bottom: 8px;
      }
    }
    .recr{
      border-top: #fba400 8px solid;
      box-shadow: 0 0 10px 0 #eee;
      margin-left: 10px;
      width: 20%;
      height: 100%;
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
  .menu{
    position: absolute;
    // left: -80px;
    top: 200px;
    left:150px;
    li{
      cursor: pointer;
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      margin-top: 10px;
      font-weight: 700;
      i{
        font-size: 18px;
        margin-bottom: 10px;
      }
      &:hover{
        color: coral;
        i{
          color: coral;
        }
      }
    }
  }
}
</style>