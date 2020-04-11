<template>
  <div class="article">
    <div class="menu">
      <ul>
        <li @click="addComment" style="color:green">
          <i class="el-icon-chat-line-round"></i>
          评论
        </li>
        <li v-if="!attention" @click="addAttention">
          <i class="el-icon-star-off"></i>
          收藏
        </li>
        <li v-else @click="deleteAttention" style="color:coral">
          <i class="el-icon-star-on"></i>
          取消收藏
        </li>
        <li v-if="!accuse" @click="addAccuse">
          <i class="el-icon-s-release"></i>
          <label>举报</label>
        </li>
        <li v-else @click="deleteAccuse" style="color:red">
          <i class="el-icon-s-order"></i>
          <label>取消举报</label>
        </li>
      </ul>
    </div>
    <div class="info-article" ref="infoArticle">
      <div class="name">
        {{article.title}}
      </div>
      <div class="base">
        <p><label for="">发布者:</label>{{author.name||""}}</p>
        <p><label for="">发布时间:</label>{{article.establishDt}}</p>
      </div>
      <div class="content-article">
        <div class="content-content">{{article.content}}</div>
        <div class="content-img" v-if="article.imgs&&article.imgs.length>0">
          <div class="image" v-for="img in article.imgs" :key="img" :style="'background-image:url('+img+')'">
            <img :src="img" alt="">
          </div>
        </div>
      </div>
      <div class="commentInput" v-if="addCommentFlag">
        <el-input type="textarea" v-model="comment.msg"></el-input>
        <el-button type="primary" @click="fabu">发表评论</el-button>
        <el-button @click="addCommentFlag=false">取消</el-button>
      </div>
    </div>
    <div class="comment">
      <template v-if="commentList.length>0">
        <div class="comment-info" v-for="comment,idx in commentList" :key="idx">
          <div class="author">{{comment.author.name||""}}</div>
          <div class="comment-single">
            <p>{{comment.dt}}</p>
            <p class="comment-content">{{comment.msg}}</p>
          </div>
        </div>
      </template>
      <label v-else>暂无评论</label>
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
        msg:""
      },
      article:{},
      author:{name:""},
      commentList:[],
      user:{},
      interest:{},
      attention: false,
      attentionRes: {},
      accuse: false,
      accuseRes: {},
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
    this.$request.selectArticleById({articleId}).then(
      res=>{
        this.article=res.data
        this.getCommentList()
        this.getAttention()
        this.getAccuse()
        if(this.article.imgs!="[]"){
          this.article.imgs = this.article.imgs
            .substr(1, this.article.imgs.length - 2)
            .split(",")
            .map(url => {
              return (
                "/" +
                url
                  .substr(
                    url.indexOf("static"),
                    url.length - url.indexOf("static")
                  )
                  .replace(/\\/g, "/")
              );
            });
        }else{
          this.article.imgs=[]
        }
        _this.$request.getUser({userId:this.article.authorId}).then(res=>{
          if(res.data.userType == 1){
            _this.$request.getVolunteer({userId:this.article.authorId}).then(res=>{
              _this.author=res.data
            })
          }
          if(res.data.userType == 2){
            _this.$request.getRecuriter({userId:this.article.authorId}).then(res=>{
              _this.author=res.data
            })
          }
        })
      }
    )
  },
  mounted() {
  },
  methods:{
    getCommentList(){
      this.$request.selectCommentByCondition({mainId:this.article.id,type:1}).then(res=>{
        if(res.data.length>0){
          res.data.forEach(data=>{
            data.author = {}
            this.$request.getUser({userId:data.userId}).then(userRes=>{
              data.author = userRes.data
            })
          })
        }
        this.commentList=res.data
      })
    },
    addComment(){
      if(this.user.id)
      {
        this.addCommentFlag=true
      }else{
        this.$message.warning("请登录")
      }
    },

    fabu(){
      let _this=this
      this.comment.userId = this.user.id
      this.comment.articleId = this.article.id
      this.$request.insertArticleComment(this.comment).then(res=>{
        _this.getCommentList()
        _this.comment.msg=""
        this.$refs.infoArticle.scrollTop = this.$refs.infoArticle.scrollHeight
      })
    },
    getAttention(){
      let _this=this
      if(_this.user.id){
        let param={
          userId:this.user.id,
          collectId:this.article.id,
          collectType:1,
        }
        _this.$request.selectAttentionByCondition(param).then(
          res=>{
            if(res.data.length>0){
              this.attention = true
              this.attentionRes = res.data[0]
            }else{
              this.attention = false
            }
          }
        )
      }else{
        // this.$message.warning("请登录")
      }
    },
    addAttention(){
      let _this=this
      if(_this.user.id){
        let param={
          userId:this.user.id,
          collectId:this.article.id,
          collectType:1,
        }
        _this.$request.insertAttention(param).then(
          res=>{
            _this.$message.success("收藏成功")
            _this.getAttention()
          }
        )
      }else{
        this.$message.warning("请登录")
      }
    },
    deleteAttention(){
      let _this=this
      _this.$request.deleteAttention({id:_this.attentionRes.id}).then(
        res=>{
          _this.$message.success("已取消收藏")
          _this.getAttention()

        }
      )
    },
    getAccuse(){
      let _this=this
      if(_this.user.id){
        let param={
          userId:this.user.id,
          accuseId:this.article.id,
          accuseType:1,
        }
        _this.$request.selectAccuseByCondition(param).then(
          res=>{
            if(res.data.length>0){
              this.accuse = true
              this.accuseRes = res.data[0]
            }else{
              this.accuse = false
            }
          }
        )
      }else{
        // this.$message.warning("请登录")
      }
    },
    addAccuse(){
      let _this=this
      if(_this.user.id){
        let param={
          userId:this.user.id,
          accuseId:this.article.id,
          accuseType:1,
        }
        _this.$request.insertAccuse(param).then(
          res=>{
            _this.$message.success("举报成功")
            _this.getAccuse()
          }
        )
      }else{
        this.$message.warning("请登录")
      }
    },
    deleteAccuse(){
      let _this=this
      _this.$request.deleteAccuse({id:_this.accuseRes.id}).then(
        res=>{
          _this.$message.success("已取消举报")
          _this.getAccuse()

        }
      )
    }

  },
 }
</script>

<style lang="less">
@import "../../../static/css/main";
.article{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu{
    z-index: 100;
    position: fixed;
    left: 7vw;
    top: 8vh;
    li{
      cursor: pointer;
      width: 13vh;
      height: 13vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: 0 0 5px 0 #eee;
      margin-top: 1vh;
      font-weight: 700;
      font-size: 2vh;
      label{
        cursor: pointer;
      }
      i{
        cursor: pointer;
        margin-bottom: 1vh;
        font-size: 3vh;
      }
      &:hover{
        color: coral;
        i{
          color: coral;
        }
      }
    }
  }
  .info-article{
    position: relative;
    background-color: #fff;
    width: 70%;
    box-shadow: 0 0 10px 0 #eee;
    margin: 3vh auto 0;
    padding: 3vh 0;
    .name{
      font-size: 4vh;
      line-height: 5vh;
      font-weight: 800;
      margin-bottom: 3vh;
    }
    .base{
      display: flex;
      justify-content: center;
      margin-bottom: 2vh;
      label{
        font-size: 1.5vh;
        color: #aaa;
        margin-right: 0.3vw;
      }
      p{
        width: 30%;
        font-size: 2vh;
      }
    }
    .content-article{
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      .content-content{
        white-space: pre-line;
        padding: 1vh;
        width: 70%;
        font-size: 2.4vh;
        text-align: left;
        // border: 1px solid #eee;
        // box-shadow: 0 0 5px 0 #eee;
      }
      .content-img{
        margin-left: 1vw;
        flex: 1;
        .image{
          min-height: 20vh;
          background-repeat: no-repeat;
          background-size: 100%;
          img{
            border: 1px solid #eee;
            width: 100%;
            margin-bottom: 1vh;
          }
        }
      }
    }
    
    .commentInput{
      width: 70%;
      position: fixed;
      bottom: 2vh;
      // height: 10%;
      background-color: @fifthColor;
      border: 0.1vh solid #ccc;
      padding: 1vh;
      .el-textarea__inner{
        margin-bottom: 1vh;
        height: 10vh;
        border: none;
        border-radius: 0;
      }
      .el-textarea__inner:focus{
        outline: none;
      }
      .el-button{
        border-radius: 1px;
        padding: 1vh 2vw;
        font-size: 1.8vh;
        line-height: 2vh;
        border: none;
        background-color: @thirthColor;
        &:hover{
          background-color: @secondColor;
        }
      }
      .el-button+.el-button{
        background-color: #eee;
      }
    }
  }
  .comment{
    width: 70%;
    background-color: #fff;
    border:0.1vh solid @sixthColor;
    margin-bottom: 3vh;
    margin-top: 1vh;
    label{
      height: 7vh;
      font-size: 2.5vh;
      color: #aaa;
      line-height: 7vh;
    }
    .comment-info{
      display: flex;
      // border: 1px solid #fff;
      position: relative;
      border-bottom: 0.1vh solid #eee;
      background-color: rgba(240,240,240,0.2);
      .author{
        // height: 80%;
        width: 15%;
        font-weight: 700;
        font-size: 2.3vh;
        padding-top: 2vh;
        border-right: 0.1vh solid #eee;
      }
      .comment-single{
        // width: 30%;
        width: 70%;
        text-align: left;
        margin-left: 2vw;
        display: flex;
        flex-direction: column;
        padding: 1vh 0;
        p{
          color: #ababab;
          font-size: 1.5vh;
        }
        p.comment-content{
          color:#111;
          font-size: 1.9vh;
          margin-left:0;
          white-space: pre-line;
          margin-top: 1vh;
        }
      }
    }
  }
}
</style>