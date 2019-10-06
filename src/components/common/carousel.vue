<template>
<div>
  <div class="main" @mouseleave="play">
    <div class="show">
      <!-- {{'background-image:url(\'+imgList[idx].url+'\')'}} -->
      <div class="lunbo" ref="current" :style="'background-image:url(\''+imgList[idx].url+'\')'"></div>
      <div class="content" ref="content">
        <label for="">{{imgList[idx].title}}</label>
      </div>
    </div>
    <ul class="idxList">
      <li v-for="(info, index) in imgList" 
      :key="index" 
      :class="index == idx?'activeli':''"
      @click="change(index)"></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      idx: 0,
      imgList: [{
          url: "../../../static/img/panel_1.1.jpg",
          title: "通知一../../../static/img/panel_1.1.jpg",
        },
        {
          url: "../../../static/img/panel_2.1.jpg",
          title: "通知二../../../static/img/panel_2.1.jpg",
        },
        {
          url: "../../../static/img/panel_3.1.jpg",
          title: "通知三../../../static/img/panel_3.1.jpg",
        },
        {
          url: "../../../static/img/panel_4.1.jpg",
          title: "通知四../../../static/img/panel_4.1.jpg",
        },
        {
          url: "../../../static/img/panel_5.1.jpeg",
          title: "通知五../../../static/img/panel_5.1.jpg",
        },
        {
          url: "../../../static/img/panel_6.1.jpeg",
          title: "通知六../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg../../../static/img/panel_6.1.jpg",
        },
      ]
    }
  },
  // computes
  mounted() {
    this.play()
  },
  methods: {
    change(index){
      clearInterval(this.timer)
      this.idx = index
    },
    play() {
      if(this.timer){
        // console.log("clear")
        clearInterval(this.timer)
      }
      // if(!this.timer){
        this.timer = setInterval(() => {
          this.move()
        }, 2500)
      // }
    },
    move() {
      this.idx+=1
      if(this.idx>=this.imgList.length){
        this.idx = 0
      }
      // console.log(this.idx)
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/css/main.less';
.main {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .show{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.content{
  position: relative;
  display: inline-block;
  width: 45%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100px 10px 10px 100px;
  height: 200px;
  margin-right: 10%;
  padding: 20px;
  // padding-left: -50px;
  box-sizing: border-box;
  white-space:normal;
  word-break:break-all;
  word-wrap:break-word; 
  line-height: 30px;
  z-index: 5;
  text-align: left;
  label{
    margin-left:30px;
    text-align: left;
    text-indent: 2em;
    display: block;
  }
  &:first-letter{
    font-size:30px;
    font-weight: bolder;
  }
}

.lunbo {
  position: relative;
  background-position: center;
  background-size: auto 100%;
  background-repeat: no-repeat;
  width: 50%;
  height: 200px;
  display: inline-block;
  transition: 1s;
  margin-left: 10%;
}

.before,
.after {
  width: 300px;
  height: 150px;
  overflow: hidden;
}

.before .meng,
.after .meng {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.before {
  left: 50px;
}
.after {
  left: -50px;
}

.imgTitle {
  position: relative;
  padding: 5px;
  font-size: 15px;
  line-height: 15px;
  color: white;
  box-shadow: 0 0 30px rgba(255, 255, 255, 1);
  top: 83%;
  opacity: 1;
}

.idxList {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:15px;

  li {
    cursor: pointer;
    width: 5%;
    height: 3px;
    transition: 1s;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid @mainColor;
    border-left: 1px solid @mainColor;
    &:first-of-type{
      border-left: none;
    }
  }

  li.activeli {
    background-color: @secondColor;
  }
}
</style>
