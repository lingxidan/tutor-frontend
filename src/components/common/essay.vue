<template>
  <!-- <div class="main"> -->
    <el-col :span="6" class="elCol" @click="showArticle">
      <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
        <!-- {{essay.imgs+""+essay.image}} -->
        <img v-if="image" :src="image" class="image">
        <div v-else class="image none-image">
          <i class="el-icon-picture-outline"></i>
          <label>暂无照片</label>
        </div>
        <div class="bottom_text">
          {{essay.title.substr(0,10)+(essay.title.length>10?"...":"")}}
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
      image:''
    }
  },
  props: {
    essay:{
      type:Object,
      default:function () {
        return {}
      }
    }
  },
  components:{
  },
  created(){
  },
  mounted() {
    // console.log(this.essay.imgs,this.essay.images)
    if (this.essay.imgs && this.essay.imgs != "[]") {
      let images = this.essay.imgs
        .substr(1, this.essay.imgs.length - 2)
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
  },
  methods:{
    showArticle(){
      this.$router.push({path:'/article',query:{id:this.essay.id}})

    },
  },
  watch:{
    essay:{
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
  height: 20vh;
  display: block;
  border: 0.1vh solid @sixthColor;
}
.image.none-image{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i{
    font-size: 3vh;
    color: #ccc;
    margin-bottom: 2vh;
  }
  label{
    color: #ccc;
    font-size: 1.7vh;
  }
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
