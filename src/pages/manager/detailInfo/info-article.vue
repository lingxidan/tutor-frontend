<template>
  <div class="manager-article">
    <div class="info-article">
      <div class="name">
        {{article.title}}
      </div>
      <div class="base">
        <p><label for="">发布者:</label>{{author.name||""}}</p>
        <p><label for="">发布时间:</label>{{article.establishDt}}</p>
      </div>
      <div class="content-article">
        <div class="content-content">{{article.content}}</div>
        <div class="content-img" v-if="article.images&&article.images.length>0">
          <div class="image" v-for="img in article.images" :key="img" :style="'background-image:url('+img+')'">
            <img :src="img" alt="">
          </div>
        </div>
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
    article:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    author:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  components:{
  },
  created(){
    this.getCommentList()
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
    }
  },
 }
</script>

<style lang="less">
@import "../../../../static/css/main";
.manager-article{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .info-article{
    position: relative;
    background-color: #fff;
    width: 90%;
    // box-shadow: 0 0 10px 0 #eee;
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
          height: 20vh;
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