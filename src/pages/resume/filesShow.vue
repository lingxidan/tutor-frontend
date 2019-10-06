<template>
  <div class="fileShow">
    <iframe :src="'../../../static/pdfjs/web/viewer.html?file=' + url"></iframe>
  </div>
</template>

<script>
export default {
  name: 'fileShow',
  data() { 
    return {

    }
  },
  props: {
    "url":{
      default:''
    }
  },
  components:{
  },
  mounted() {
      // let url = "../../../static/files/"+this.url;
      // window.open("../../../static/pdfjs/web/viewer.html?file=" + url);

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
.fileShow{}
</style>