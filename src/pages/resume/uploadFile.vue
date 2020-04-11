<template>
  <div class="file">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="doUpload"
      :limit="1"
      :file-list="fileList"
      :before-upload="beforeUpload">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button size="small" type="primary" @click="submitUpload()">保存到服务器</el-button>
      <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
    </el-upload> 
  </div>
</template>

<script>
import request from '../../request/api.js'
import fileShow from './filesShow.vue'
export default {
  name: 'file',
  data() { 
    return {
      showUrl:"",
      fileId:0,
      filePath:"",
      fileName:"",
      fileList:[],
      fileRes:[]
    }
  },
  props: {

  },
  components:{
    fileShow
  },
  mounted() {
    // var url = "../../../static/pdf.pdf";
    // window.open("../../../static/pdfjs/web/viewer.html?file=" + url);
  },
  methods:{
    beforeUpload(file){
      // console.log(file,'文件');
      this.files = file;
      // 限制文件格式
      const extension3 = file.name.split('.')[1] === 'pdf'
      if ( !extension3) {
        this.$message.warning('请上传pdf格式简历!')
        return
      }
      this.fileName = file.name;
      return false // 返回false不会自动上传
    },
    submitUpload() {
      if(this.fileName == ""){
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      this.$emit("uploadFile",this.files, this.fileName)
    },
    fileBtn() {
      document.getElementById('file').click()
    },
    // upload() {
    //   var formData = new FormData();
    //   formData.append('userfile', this.$refs.file.files[0])
    //   console.log(formData)
    //   let img = document.getElementById('img')
    //   request.uploadFile(formData).then(
    //     res=>{
    //       console.log(res)
    //     }
    //   )
    // },
    show(idx){
      this.showUrl="../../../static/files/"+this.fileRes[idx].name
      var url = "../../../static/files/"+this.fileRes[idx].name;
      window.open("../../../static/pdfjs/web/viewer.html?file=" + url);

    },
    getFileList(){
      request.selectFileById({id:this.fileId}).then(
        res=>{
          console.log("selectFileById",res)
          this.fileRes.push(res.data)
        }
      )
    }
  },
 }
</script>

<style lang="less">
@import '../../../static/css/main.less';
.file{
  margin-top: 2vh;
  .el-upload-list__item-name {
    margin-top: 0.5vw;
    margin-right: 1vw;
    padding-left: 1vw;
    font-size: 1.7vh;
  }
  .el-button{
    background-color: @thirthColor;
    border: none;
    &:hover{
      background-color: @secondColor;
    }
  }
}
</style>