<template>
  <div class="post-main-manager">
    <div class="info-post" ref="infoPost">
      <div class="post">
        <div class="left">
          {{author.name}}
        </div>
        <div class="content">
          <div class="content-top">
            <p class="name">{{post.title}}</p>
            <div class="base">
              <p>{{post.establishDt}}</p>
            </div>
            <div class="content-content">{{post.content}}</div>
          </div>
          <div class="content-img" v-if="post.images&&post.images.length>0">
            <div class="image" v-for="img in post.images" :key="img" :style="'background-image:url('+img+')'">
              <img :src="img" alt="">
            </div>
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
  name: 'info-post',
  data() { 
    return {
      commentList:[]

    }
  },
  props: {
    post:{
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
      this.$request.selectCommentByCondition({mainId:this.post.id,type:2}).then(res=>{
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
  },
 }
</script>

<style lang="less">
@import "../../../../static/css/main";
.post-main-manager{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .info-post{
    position: relative;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 0 10px 0 #ddd;
    // margin: 3vh 1vh 0;
    // padding: 3vh 2vw;
    .post{
      display: flex;
      .left{
        margin: 1vh;
        padding: 1vh;
        padding-top: 3vh;
        width: 10%;
        border-right: 3px solid #eee;
        font-weight: bold;
        // vertical-align: middle;
        background-color: rgba(240,240,240,0.5);
        text-align: center;
      }
      .content{
        // margin: 1vw;
        width: 100%;
        display: flex;
        flex-direction: row;
        .content-top{
          width: 70%;
          // flex: 1;
          .name{
            font-weight: 900;
            font-size: 3vh;
            color: #333;
          }
          // margin-top: 10px;
          p{
            font-size: 1.4vh;
            color: #999;
            margin-bottom: 1vh;
          }
          .content-content{
            white-space: pre-line;
            padding: 1vh;
            font-size: 2.4vh;
            text-align: left;
          }

        }
        .content-img{
          margin-left: 1vw;
          // width: 20%;
          flex: 1;
          .image{
            min-height: 20vh;
            background-repeat: no-repeat;
            background-size: 100%;
            img{
              border: 1px solid #eee;
              width: 100%;
              // height: 100%;
              margin-bottom: 1vh;
            }
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
    // box-shadow: 0 0 10px 0 #eee;
    // margin-top: 2vh;
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
        text-align: center;
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