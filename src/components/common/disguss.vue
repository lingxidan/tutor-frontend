<template>
  <div class="main" @click="showPost">
    <div class="inner">
      <slot name="num"></slot>
      <div class="title">
        <div class="name">{{disguss.title}}</div>
        <div class="content">{{disguss.content}}</div>
        <div class="bottom">
          <span>
            <i class="el-icon-self-taolunhui"></i>
            {{commentCnt}}个评论
          </span>
        </div>
      </div>
      <div class="image">
        <img :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disguss',
  data() { 
    return {
      image:"",
      commentCnt: 0
    }
  },
  props: {
    disguss:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  components:{
  },
  mounted() {
    if (this.disguss.imgs && this.disguss.imgs != "[]") {
      let images = this.disguss.imgs
        .substr(1, this.disguss.imgs.length - 2)
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
      this.image=images[0]
    }
    this.getCommentCnt()
  },
  methods:{
    showPost(){
      this.$router.push({path:'/post',query:{id:this.disguss.id}})
    },
    getCommentCnt(){
      this.$request.selectCommentByCondition({type:2,mainId:this.disguss.id}).then(res=>{
        this.commentCnt = res.data.length
      })
    }
  },
  watch:{
    disguss:{
      handler(newVal,old){
        if(newVal.imgs&&newVal.imgs!="[]"){
          let images = newVal.imgs
            .substr(1, newVal.imgs.length - 2)
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
          this.image=images[0]
        }
      }
    }
  }
 }
</script>

<style lang="less" scoped>
@import url('../../../static/css/main');
.main .inner{
  display: flex;
  cursor: pointer;
  padding: 1vw;
  .title{
    width: 60%;
    margin-right: 2vw;
    display: flex;
    flex-direction: column;
    .name{
      text-align: left;
      height: 10%;
      font-size: 2.5vh;
      line-height: 2.5vh;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .content{
      width: 100%;
      height: 30%;
      font-size: 1.6vh;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .bottom{
      width: 100%;
      height: 10%;
      padding-left:10%;
      line-height: 2vh;
      text-align: left;
      span{
        font-size: 1.8vh;
        color:rgb(192, 192, 192);
        display: inline-block;
        width: 30%;
      }
    }
  }
  .image{ 
    flex: 1;
    height: 17vh;
    img{
      height: 100%;
      width: auto;
      border-radius: 2px;
    }
  }
}
.main{
  transition: .3s;
}
.main:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>