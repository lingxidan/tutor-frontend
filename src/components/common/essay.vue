<template>
  <!-- <div class="main"> -->
    <el-col :span="8" class="elCol" @click="showArticle">
      <el-card :body-style="{ padding: '0px' }" class="card">
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
    console.log(this.essay)
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
  // margin-top: 13px;
  line-height: 13px;
  padding: 12px;
  text-align: left;
  font-family: @thirdFont;
  font-size: 18px;
}

.image {
  width: 100%;
  display: block;
}
.mask {
  position: absolute;
  // top: -height;
  left: 0;
  width: 100%;
  color: #ffffff;
  transition: .3s;
}
.card{
  position: relative;
  margin-top:5px;
  padding-bottom: 8px;
}
.card:hover{
  // transform: translateZ(1px) scale(1.01,1.01);
  .mask{
    // border-top:5px solid @secondColor;
    top:0;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
<style lang="less">
.elCol{
  .el-card.is-always-shadow{
    box-shadow: none;
    border: none;
  }
}
</style>
