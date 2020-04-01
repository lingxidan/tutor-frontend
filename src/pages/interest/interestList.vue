<template>
  <div class="interest-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我关注的文章" name="first">
        <div class="interest-content">
          <div class="main-interest" v-for="(article, index) in articleAttentions">
            <essay :key="index" :essay="article"></essay>
            <div class="delete-interest">
              <i class="el-icon-star-on"></i>
              <label @click="deleteArticleAttention(article)">取消收藏</label>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我关注的帖子" name="second">
        <div class="interest-content-post">
          <div class="main-interest-post" v-for="(post,index) in postAttentions">
            <disguss :key="index" :disguss="post"></disguss>
            <div class="delete-interest">
              <i class="el-icon-star-on"></i>
              <label @click="deletePostAttention(post)">取消收藏</label>
            </div>
          </div>
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
      teachers:[],
      articleAttentions:[],
      postAttentions:[],
      articleList:[],
      postList:[]

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
    this.getPostAttentionList()
    this.getArticleAttentionList()
  },
  methods:{
    getPostAttentionList(){
      this.postAttentions = []
      this.$request.selectAttentionByCondition({userId:this.user.id,collectType:2}).then(res=>{
        res.data.forEach(data=>{
          this.$request.selectPostById({postId:data.collectId}).then(sourceRes=>{
            sourceRes.data.attention = data
            this.postAttentions.push(sourceRes.data)
          })
        })
      })
    },
    getArticleAttentionList(){
      this.articleAttentions = []
      this.$request.selectAttentionByCondition({userId:this.user.id,collectType:1}).then(res=>{
        res.data.forEach(data=>{
          this.$request.selectArticleById({articleId:data.collectId}).then(sourceRes=>{
            sourceRes.data.attention = data
            this.articleAttentions.push(sourceRes.data)
          })
        })
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    deleteArticleAttention(article){
      this.$request.deleteAttention({id:article.attention.id}).then(
        res=>{
          this.$message.success("已取消收藏")
          this.getArticleAttentionList()

        }
      )
      
    },
    deletePostAttention(post){
      this.$request.deleteAttention({id:post.attention.id}).then(
        res=>{
          this.$message.success("已取消收藏")
          this.getPostAttentionList()

        }
      )
    },
  },
 }
</script>

<style lang="less" >
.interest-list{
  padding: 1vh 2vw;
  background-color: #fff;
  min-height: 90vh;
  .interest-content{
    display: flex;
    flex-wrap: wrap;
    .main-interest{
      position: relative;
      margin: 0.5vw;
      margin-top: 0;
      width: 25%;
      &:hover{
        .delete-interest{
          opacity: 1;
        }
      }
      .el-col-6{
        width: 100%;
      }
    }
  }
  .interest-content-post{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5vw;
    padding-bottom: 1vh;
  }
  .main-interest-post{
    position: relative;
    width: 80vw;
    transition: .3s;
    border-bottom: 0.1px solid #ccc;
    &:hover{
      .delete-interest{
        opacity: 1;
      }
    }
  }
  .delete-interest{
    cursor: pointer;
    position: absolute;
    z-index: 100;
    top: 0;
    opacity: 0;
    transition: .3s;
    width: 100%;
    font-size: 2vh;
    text-decoration: underline;
    box-sizing: border-box;
    padding: 1vh 0 0 0;
    height: 30%;
    color: rgb(255, 127, 80);
    background: linear-gradient(to bottom,rgba(255, 127, 80,0.1),transparent);
    i,label{
      cursor: pointer;
    }
    label:hover{
      color: rgba(255, 127, 80, 0.8);
    }
  }
  .el-tabs__header{
    margin-bottom: 1vh;
  }
}
</style>