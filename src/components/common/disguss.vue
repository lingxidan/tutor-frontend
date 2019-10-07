<template>
  <div class="main" @click="showPost">
    <div class="inner">
      <slot name="num"></slot>
      <div class="title">
        <div class="name">{{disguss.title}}</div>
        <div class="content">{{disguss.content}}</div>
        <div class="bottom">
          <span>
            <i class="el-icon-self-yuedu"></i>
            {{disguss.viewCnt}}次阅读
          </span>
          <span>
            <i class="el-icon-self-taolunhui"></i>
            {{disguss.disCnt}}个讨论
          </span>
        </div>
      </div>
      <div class="image">
        <img :src="disguss.img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disguss',
  data() { 
    return {

    }
  },
  props: {
    disguss:{
      type:Object,
      default:function(){
        return {
          title:"志愿过程中的费用如何解决?",
          content:"当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取当志愿教师的过程中的衣食住行的费用来自哪里，如何获取",
          img:"./../../../static/img/panel_3.jpg",
          viewCnt:13000,
          disCnt:300
        }
      }
    }
  },
  components:{
  },
  mounted() {
    console.log(this.disguss)
  },
  methods:{
    showPost(){
      this.$router.push({path:'/post',query:{id:this.disguss.id}})
      
    }
  },
 }
</script>

<style lang="less" scoped>
@import url('../../../static/css/main');
.main .inner{
  display: flex;
  border-bottom: 1px solid @mainColor;
  margin-left: 20px;
  margin-right: 20px;
  padding: 13px;
  cursor: pointer;
  .num{
    font-size: 35px;
    width: 100px;
    color:@secondColor;
    font-family: @secondFont;
    font-weight: bold;
    transition: .2s;
  }
  .title{
    width: 60%;
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    .name{
      text-align: left;
      height: 30px;
      font-size:18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .content{
      width: 100%;
      height: 100px;
      font-size: 14px;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .bottom{
      width: 100%;
      height: 20px;
      padding-left:10%;
      line-height: 20px;
      text-align: left;
      span{
        font-size: 14px;
        color:rgb(192, 192, 192);
        display: inline-block;
        width: 30%;
      }
    }
  }
  .image{ 
     width: 40%;
    img{
      width: 100%;
      // height: 100px;
      // height: 100%;
      border-radius: 5px;
    }
  }

}
.inner:hover{
  .num{
    font-size: 40px;
    text-shadow: 0 0 3px @mainColor;
    transform: translateY(5px); 
  }
  .name{
    color:@hoverColor;
  }
}
</style>