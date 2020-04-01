<template>
  <div class="comment-info">
    <div class="article">
      <div class="comment-main">
        <div class="comment-content">
          <p class="content-dt">{{comment.dt}}
            <a class="delete" @click="deleteComment">
              <i class="el-icon-delete"></i>
              删除评论
            </a>
          </p>
          <p class="content-content">{{comment.msg}}</p>
        </div>
        <div class="comment-parent">
          <essay class="parent article" v-if="comment.type==1" :essay="comment.article"></essay>
          <disguss class="parent disguss" v-else :disguss="comment.post"></disguss>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import essay from './essay'
import disguss from './disguss'
export default {
  name: 'comment-info',
  data() { 
    return {

    }
  },
  props: {
    commentType:{
      default:1
    },
    comment:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  components:{
    essay,
    disguss
  },
  mounted() {

  },
  methods:{
    deleteComment(){
      this.$request.deleteComment(this.comment).then(res=>{
        this.$emit("initComment")
      })
    }
  },
 }
</script>

<style lang="less" scoped>
.comment-info{
  padding: 1vh 1vw;
  border: 0.1vh solid #eee;
  .comment-main{
    width: 100%;
    text-align: left;
    .comment-content{
      .content-dt{
        position: relative;
        display: block;
        font-size: 1.6vh;
        margin-top: 0.2vh;
        color:#aaa;
        a.delete{
          text-decoration: underline;
          position: absolute;
          display: none;
          cursor: pointer;
          margin-left: 3vw;
          &:hover{
            color: coral;
          }
        }
      }
      .content-content{
        white-space: pre-line;
        color: #000;
        font-size: 2.2vh;
        padding: 0.4vw;
        font-family: "黑体";
        font-weight: 300;
      }
      &:hover{
        a.delete{
          display: inline-block;
        }
      }
    }
  }
  .comment-parent{
    margin-left: 2vw;
    background-color: #f3f3f3;
    padding: 1vh;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    .disguss{
      width: 70vw;
      margin: 1vh 0;
      background-color: #fff;
      transition: .3s;
      &:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }
    }
  }
}
</style>
<style lang="less">
  .comment-list{
    .el-tabs__item{
      width: 10vw;
    }
  }
</style>