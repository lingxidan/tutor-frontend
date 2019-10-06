<template>
  <div class="comment-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章评论" name="first">
        <comment v-for="(com,idx) in articleComments" :key="idx"
        :comment="com"></comment>
      </el-tab-pane>
      <el-tab-pane label="帖子评论" name="second">
        <div class="main-interest">
        <comment v-for="(com,idx) in postComments" :key="idx"
        :comment="com"></comment>
        </div>
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
      activeName:"first",
      articleComments:[{
        type:1,
        article:{
          title:"记支教XX县XX小学的趣事",
          img:"../../../static/img/panel_2.jpg",
          autor:"XXX",
          autor_img:"../../assets/logo_vue.png",
        },
        comment:{
          dt:"2019-09-01 08:00:30",
          content:"很赞"
        }
      },{
        type:1,
        article:{
          title:"记支教XX县XX小学的趣事",
          img:"../../../static/img/panel_2.jpg",
          autor:"XXX",
          autor_img:"../../assets/logo_vue.png",
        },
        comment:{
          dt:"2019-08-20 20:30:22",
          content:"再来看一遍"
        }
      }],
      
      postComments:[{
        type:2,
        disguss:{
          title:"志愿过程中会遇到什么不可预计的事情?",
          content:"志愿过程中，会有哪些需要预防的事情，有什么应急处理方法志愿过程中，会有哪些需要预防的事情，有什么应急处理方法志愿过程中，会有哪些需要预防的事情，有什么应急处理方法",
          img:"../../../static/img/panel_1.jpg",
          viewCnt:13000,
          disCnt:300
        },
        comment:{
          dt:"2019-09-01 08:00:30",
          content:"很赞"
        }
      },{
        type:2,
        disguss:{
          title:"志愿过程中的费用如何解决?",
          content:"当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取",
          img:"../../../static/img/panel_3.jpg",
          viewCnt:13000,
          disCnt:300
        },
        comment:{
          dt:"2019-08-20 20:30:22",
          content:"再来看一遍"
        }
      }]
    }
  },
  props: {

  },
  components:{
    comment
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
.comment-list{}
</style>