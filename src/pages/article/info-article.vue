<template>
  <div class="info-article">
    <div class="name">
      {{article.title}}
    </div>
    <div class="base">
      <p><label for="">发布者:</label>{{article.author}}</p>
      <p><label for="">发布时间:</label>{{article.establishDt}}</p>
    </div>
    <div class="content-article">
      <p>{{article.content}}</p>
    </div>
    <div class="comment">
      <div class="comment-info" v-for="comment,idx in commentList" :key="idx">
        <div class="author">{{comment.author}}</div>
        <div class="comment-single">
          <p>{{comment.dt}}</p>
          <p class="content">{{comment.msg}}</p>
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
          <label v-if="article.status==-2">已被举报</label>
          <label v-if="article.status==0">举报</label>
          <label v-if="article.status==-1">已被删除</label>
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
  name: 'info-article',
  data() { 
    return {
      addCommentFlag:false,
      comment:{
        type:2,
        userId:32,
        mainId:3,
        msg:this.msg
      },
      article:{
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
    let articleId=this.$route.query.id
    let _this=this
    this.user = JSON.parse(sessionStorage.getItem('user'))||{}
    this.comment={
        type:1,
        userId:this.user.userId||0,
        mainId:articleId,
        msg:this.msg
      }
    // this.$request.selectArticleById({articleId}).then(
    //   res=>{
    //     this.article=res.data
    //     _this.getUser(this.article.authorId,(res)=>{
    //       console.log(res)
    //       _this.article.author=res.data.name
    //       _this.article={..._this.article}
    //     })
    //   }
    // )
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
      this.$request.selectArticleById({articleId:_this.comment.mainId}).then(res=>{
        console.log(res)
        _this.article=res.data
        _this.getUser(_this.article.authorId,(res)=>{
          console.log("author")
          _this.article.authorName=res.data.name
        })
        if(_this.user.userId!=0){
          _this.$request.selectInterestByCondition({userId:_this.user.userId,type:3}).then(
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
        _this.$request.selectCommentByCondition({postId:_this.comment.mainId,type:1}).then(
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
        _this.article.status=-2
        _this.$request.updateArticle(_this.article).then(res=>{
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

<style lang="less" scoped>
.info-article{
  position: relative;
  background-color: #fff;
  width: 70%;
  box-shadow: 0 0 10px 0 #eee;
  margin: 20px auto;
  padding: 20px 40px;
  .menu{
    position: absolute;
    left: -120px;
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
  .name{
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .base{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    p{
      width: 30%;
    }
  }
  .content-article{
    border: 1px solid #eee;
    box-shadow: 0 0 5px 0 #eee;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    p{
      font-size: 16px;
      text-align: left;

    }
  }
  .content{
    width: 70%;
    margin: 0 auto;
    p{
      font-size: 16px;
      text-align: left;

    }
  }
  .comment{
    background-color: #fafafa;
    box-shadow: 0 0 10px 0 #eee;
    margin-top: 20px;
    .comment-info{
      display: flex;
      border: 1px solid #fff;
      position: relative;
      .author{
        width: 20%;
        font-weight: 700;
        font-size: 18px;
        margin-top: 20px;
      }
      .comment-single{
        // width: 30%;
        width: 70%;
        text-align: left;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        p{
          color: #ababab;
        }
        p.content{
          color:#111;
          font-size: 16px;
          margin-left:0;
          margin-top: 5px;
        }
      }
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 20%;
        width: 5px;
        height: 100%;
        background-color: #fff;
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