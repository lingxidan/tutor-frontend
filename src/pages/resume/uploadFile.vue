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
      <!-- <a href="./static/moban.xlsx" rel="external nofollow" download="模板"><el-button size="small" type="success">下载模板</el-button></a> -->
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
      <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div> -->
      <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
      </el-upload> 
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button> -->
        <el-button type="primary" @click="submitUpload()">确定</el-button>
      <!-- </span> -->
    <!-- <input ref="file" type="file" id="file" />
    <el-button size="small" type="primary" @click="upload()">点击上传</el-button> -->
    <!-- <el-input v-model="fileId"></el-input>
    <el-button size="small" type="primary" @click="getFileList">获取文件列表</el-button>

    <textarea ref="fileContent" id="div1" readonly>
      
    </textarea>
    <img :src="filePath" alt="" />
    <ul>
      <li v-for="(file,idx) in fileRes" ::key="idx" @click="show(idx)">
        {{file.name}}
        <p>{{file.upDt}}</p>
      </li>
    </ul> -->
    <!-- <iframe frameborder="0" id="frame" width="100%"
    src="../../../static/pdfjs/web/viewer.html?file=../../../static/files/转正申请书-张泽丹_1567833451113.pdf"></iframe> -->
    <!-- <iframe frameborder="0" id="frame" width="100%" height="100%"
     v-if="showUrl!=''" :src="'../../../static/pdfjs/web/viewer.html?file=' + showUrl"></iframe> -->
    <!-- <div v-if="showUrl!=''">
      <fileShow :url="showUrl"></fileShow>
    </div> -->

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
      const extension = file.name.split('.')[1] === 'doc'
      const extension2 = file.name.split('.')[1] === 'docx'
      const extension3 = file.name.split('.')[1] === 'pdf'
      if (!extension && !extension2 && !extension3) {
        this.$message.warning('上传模板只能是 doc、docx格式或者pdf格式!')
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
    upload() {
      var formData = new window.FormData()
      formData.append('userfile', this.$refs.file.files[0])
      console.log(formData)
      let img = document.getElementById('img')
      request.uploadFile(formData).then(
        res=>{
          console.log(res)
        }
      )
    },
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

<style lang="less" scoped>
.file{}
</style>