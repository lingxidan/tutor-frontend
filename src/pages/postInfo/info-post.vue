<template>
  <div class="info-post">
    <div class="post">
      <div class="left">
        {{post.authorName}}
      </div>
      <div class="content">
        <p class="name">{{post.title}}</p>
        <div class="base">
          <p>{{post.establishDt}}</p>
        </div>
        <p class="content-info">{{post.content}}</p>
      </div>
    </div>
    <div class="comment">
      <div class="post" v-for="(comment,idx) in commentList">
        <div class="left">
          {{comment.author?comment.author:"已注销"}}
        </div>
        <div class="content">
          <p>{{comment.dt}}</p>
          <p class="content-info">{{comment.msg}}</p>
        </div>
      </div>
    </div>
    <div class="menu">
      <ul>
        <li @click="addComment">
          <i class="el-icon-chat-round"></i>
          评论
        </li>
        <li v-if="!interest.id" @click="addInterest">
          <!-- {{interestList.indexOf(comment.mainId)>=0}} -->
          <i class="el-icon-star-off"></i>
          收藏
        </li>
        <li v-else @click="deleteInterest">
          <!-- {{interestList.indexOf(comment.mainId)>=0}} -->
          <i class="el-icon-star-on"></i>
          取消收藏
        </li>
        <li @click="jubao">
          <i class="el-icon-s-release"></i>
          <label v-if="post.status==-2">已被举报</label>
          <label v-if="post.status==0">举报</label>
          <label v-if="post.status==-1">已被删除</label>
        </li>
      </ul>
    </div>
    <div class="commentInput" v-if="addCommentFlag">
      <el-input type="textarea" v-model="comment.msg"></el-input>
      <el-button type="primary" plain @click="fabu">发表评论</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info-post',
  data() { 
    return {
      addCommentFlag:false,
      comment:{
        type:2,
        userId:32,
        mainId:3,
        msg:this.msg
      },
      post:{
          title:"记支教XX县XX小学的趣事",
          img:"../../../static/img/panel_2.jpg",
          autor:"XXX",
          establishDt:"2018年1月1日",
          content:"成立于XX年，已有20年历史，由XXX捐资建立"
        },
      commentList:[{
          author:"王老师",
          dt:"2019-08-20 20:30:22",
          content:"再来看一遍"
        },{
          author:"陈先生",
          dt:"2019-09-01 08:00:30",
          content:"很赞"
        }],
        user:{},
        interestList:[],
        interest:{}

    }
  },
  props: {

  },
  components:{
  },
  created(){
    let _this=this
    this.user = JSON.parse(sessionStorage.getItem('user'))||{}
    let postId=this.$route.query.id
    this.comment={
        type:2,
        userId:this.user.userId||0,
        mainId:postId,
        msg:this.msg
      }
    // this.$request.selectPostById({postId}).then(
    //   res=>{
    //     _this.post=res.data
    //     // let schoolId=_this.zhiwei.schoolId
    //     _this.$request.selectCommentByCondition({mainId:postId,type:2}).then(
    //       res=>{
    //         _this.commentList==res.data
    //         // console.log("comment",res.data)
    //         // _this.getUser(_this.comment.userId,(res)=>{
    //         //   _this.user=res.data
    //         // })
    //         // debugger
    //         // console.log(res.data)
    //         // _this.school=res.data
    //         // let schoolId=_this.zhiwei.schoolId
            
    //       }
    //     )

    //   }
    // )
    // this.user={}
    // this.user.name=""
    // this.user.userId=32

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
      this.$request.selectPostById({postId:_this.comment.mainId}).then(res=>{
        console.log(res)
        _this.post=res.data
        _this.getUser(_this.post.authorId,(res)=>{
          console.log("author")
          _this.post.authorName=res.data.name
        })
        if(_this.user.userId!=0){
          _this.$request.selectInterestByCondition({userId:_this.user.userId,type:4}).then(
            res=>{
              // let interestList=[]
              res.data.forEach(data=>{
                // interestList.push(data.collectId)
                if(data.collectId == _this.comment.mainId){
                  _this.interest=data
                }
              })
              // _this.interestList=interestList
            }
          )
        }
        _this.$request.selectCommentByCondition({postId:_this.comment.mainId,type:2}).then(
          res=>{
            console.log("comment",res.data)
            _this.commentList=res.data
            _this.commentList.forEach(data=>{
              data.author=""
              let userId = data.userId
              _this.getUser(userId,(res)=>{
                data.author = res.data.name
                data={...data}
                _this.commentList=[..._this.commentList]
              })
            })
            _this.commentList=[..._this.commentList]
          }
        )
      })
    },
    addComment(){
      if(this.comment.userId!=0)
      {
        this.addCommentFlag=true
      }else{
        this.$message.warning("请登录")
      }
    },
    cancel(){
      this.addCommentFlag=false
    },

    fabu(){
      let _this=this
      this.$request.insertComment(this.comment).then(res=>{
        _this.getUserInfo()
        _this.comment.msg=""
      })
    },
    addInterest(){
      let _this=this
      if(_this.comment.userId!=0){
        let param={
          userId:this.comment.userId,
          collectId:this.comment.mainId,
          type:4,
        }
        _this.$request.insertInterest(param).then(
          res=>{
            _this.$message.success("收藏成功")
            _this.getUserInfo()
          }
        )
      }else{
        this.$message.warning("请登录")
      }
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
      if(_this.comment.userId!=0){
        _this.post.status=-2
        _this.$request.updatePost(_this.post).then(res=>{
            _this.$message.success("已举报")
            _this.getUserInfo()
          
        })
      }else{
        this.$message.warning("请登录")
      }

    }

  },
 }
</script>

<style lang="less">
.info-post{
  position: relative;
  // padding: 20px;
  margin: 20px auto;
  width: 70%;
  .menu{
    position: absolute;
    // left: -80px;
    top: 0;
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
  .post{
    width: 80%;
    background-color: #fff;
    display: flex;
    margin: 10px auto;
    .left{
      margin: 20px;
      padding-top: 20px;
      width: 16%;
      border-right: 3px solid #eee;
      vertical-align: middle;
    }
    .content{
      margin-left: 30px;
      margin: 20px;
      width: 100%;
      text-align: left;
      .name{
        font-weight: 900;
        font-size: 24px;
        color: #333;
      }
      // margin-top: 10px;
      p{
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      p.content-info{
        width: 90%;
        background-color: #fafafa;
        padding: 20px;
      }
    }
  }
  .commentInput{
    width: 70%;
    position: fixed;
    bottom:20px;
    // height: 10%;
    background-color: coral;
    padding: 10px;
    .el-textarea__inner{
      margin-bottom: 10px;
      height: 100px;
    }
  }
}
</style>