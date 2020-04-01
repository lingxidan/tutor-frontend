<template>
  <div class="comment-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章评论" name="first">
        <template v-if="articleComments.length>0">
          <comment v-for="(com,idx) in articleComments" :key="idx"
          :comment="com" @initComment="getArticleCommentList"></comment>
        </template>
        <label v-else>暂无评论</label>
      </el-tab-pane>
      <el-tab-pane label="帖子评论" name="second">
        <template v-if="postComments.length>0">
          <comment v-for="(com,idx) in postComments" :key="idx"
          :comment="com" @initComment="getPostCommentList"></comment>
        </template>
        <label v-else>暂无评论</label>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import comment from '../../components/common/comment'
export default {
  name: 'comment-list',
  data() { 
    return {
      user: {},
      activeName:"first",
      articleComments:[],
      postComments:[]
    }
  },
  props: {

  },
  components:{
    comment
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'))||{}
    this.getPostCommentList()
    this.getArticleCommentList()
  },
  mounted() {

  },
  methods:{
    getPostCommentList(){
      this.$request.selectCommentByCondition({userId:this.user.id,type:2}).then(res=>{
        res.data.forEach(data=>{
          data.type=2
          data.post = {}
          this.$request.selectPostById({postId:data.postId}).then(sourceRes=>{
            data.post = sourceRes.data
          })
        })
        this.postComments = res.data
      })
    },
    getArticleCommentList(){
      this.$request.selectCommentByCondition({userId:this.user.id,type:1}).then(res=>{
        res.data.forEach(data=>{
          data.type=1
          data.article = {}
          this.$request.selectArticleById({articleId:data.articleId}).then(sourceRes=>{
            data.article = sourceRes.data
          })
        })
        this.articleComments = res.data
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    }
  },
 }
</script>

<style lang="less" scoped>
.comment-list{
  padding: 1vh 2vw;
  background-color: #fff;
  min-height: 90vh;
}
</style>