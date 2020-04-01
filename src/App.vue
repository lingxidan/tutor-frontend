<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>

<script>
// import topNav from './components/common/topNav.vue'
export default {
  name: 'App',
  components: {
    // topNav
  },
  methods:{
  }
  
}
</script>

<style lang="less">
@import '../static/css/main.less';
#app {
  width: 100%;
  font-family: @mainFont;
  // font-family: 'liukai';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f6f6f8;
}
.el-popover {
    position: absolute;
    background: #FFF;
    min-width: 2vw;
    border: 1px solid #EBEEF5;
    padding: 1vh;
    line-height: 1.4;
    text-align: justify;
    .el-button{
      padding: 1vh 1vw;
      font-size: 1.6vh;
    }
}
</style>
