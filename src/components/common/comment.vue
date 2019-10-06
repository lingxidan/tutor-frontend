<template>
  <div class="comment-info">
    <div class="article">
      <div class="comment-main">
        <div class="comment-content">
          <p class="content-dt">{{comment.comment.dt}}
            <a class="delete">
              <i class="el-icon-delete"></i>
              删除评论
            </a>
          </p>
          <p class="content-content">{{comment.comment.content}}</p>
        </div>
        <div class="comment-parent">
          <essay class="parent article" v-if="comment.type==1" :article="comment.article"></essay>
          <disguss class="parent disguss" v-else :disguss="comment.disguss"></disguss>
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
  },
 }
</script>

<style lang="less" scoped>
.comment-info{
  .comment-main{
    width: 100%;
    border-bottom: 10px double #fce9c7;
    padding-bottom: 10px;
    text-align: left;
    margin-top: 10px;
    .comment-content{
      .content-dt{
        display: block;
        font-size: 12px;
        color:#aaa;
        a.delete{
          display: none;
          cursor: pointer;
          margin-left: 50px;
          &:hover{
            color: coral;
          }
        }
      }
      .content-content{
        color: #000;
        font-size: 18px;
        padding: 10px;
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
    // width: 98%;
    margin-left: 40px;
    // margin: 0 auto;
    height: 300px;
    background-color: #f3f3f3;
    padding: 8px;
    .parent{
    padding: 10px;
      background-color: #fff;
    }
    .disguss{
      width: 70%;
    }
  }
}
</style>