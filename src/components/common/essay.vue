<template>
  <!-- <div class="main"> -->
    <el-col :span="6" class="elCol" @click="showArticle">
      <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
        <img :src="essay.img" class="image">
        <div class="bottom_text">
          {{essay.title}}
        </div>
        <p>
          发布时间:{{essay.establishDt}}
        </p>
        <div class="mask" @click="showArticle"></div>
      </el-card>
    </el-col>
    
  <!-- </div> -->
</template>

<script>
export default {
  name: 'essay',
  data() { 
    return {
    }
  },
  props: {
    essay:{
      type:Object,
      default:function () {
        return {
          title:"记支教XX县XX小学的趣事",
          img:"./../../../static/img/panel_2.jpg",
          autor:"XXX",
          autor_img:"./../../assets/logo_vue.png",
        }
      }
    }
  },
  components:{
  },
  mounted() {
  },
  methods:{
    showArticle(){
      this.$router.push({path:'/article',query:{id:this.essay.id}})

    }
  },
 }
</script>

<style lang="less" scoped>
@import url("../../../static/css/main");
.elCol{
  cursor: pointer;
}
.bottom_text {
  line-height: 2.2vh;
  font-weight: 600;
  padding: 1vh;
  text-align: left;
  font-size: 2vh;
  letter-spacing: 1px;
}

.image {
  width: 100%;
  display: block;
}
.mask {
  position: absolute;
  left: 0;
  width: 100%;
  color: #ffffff;
  transition: .3s;
}
.card{
  position: relative;
  margin-top:1vh;
  p{
    font-size: 1.5vh;
    text-align: right;
  }
}
.card:hover{
  .mask{
    top:0;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>
<style lang="less">
.elCol{
  .el-card.is-hover-shadow{
    border-radius: 0;
    // border: none;
    margin-bottom: 0.4vw;
    .el-card__body{
      margin: 0.7vw;
    }
  }
}
</style>
