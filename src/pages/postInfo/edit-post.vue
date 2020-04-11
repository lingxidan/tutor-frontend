<template>
  <div class="edit-post">
    <el-form ref="form" :model="post" label-position="right" :rules="rules">
      <el-form-item label="帖子名称" prop="title">
        <el-input v-model="post.title"></el-input>
      </el-form-item>
      <el-form-item label="帖子描述" prop="content">
        <el-input type="textarea" v-model="post.content"></el-input>
      </el-form-item>
      <el-form-item label="相关照片">
        <div v-if="typeIdx != -1 && post.imgs && post.imgs.length > 0">
          <ul class="el-upload-list el-upload-list--picture-card">
            <li v-for="img in post.imgs" tabindex="0" class="el-upload-list__item is-ready">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="img"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemoveHis(img)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <el-upload
          ref="imgUpload"
          action="doUpload"
          list-type="picture-card"
          :on-change="handleChange"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'edit-post',
  data() { 
    return {
      post:{
      },
      postSrc:{},
      selectData:{
        province:[],
        city:[],
        county:[],
        school:[]
      },
      rules: {
        title:[
          {required: true, message: '不能为空'}
        ],
        content:[
          {required: true, message: '不能为空'}
        ],
      },
    }
  },
  props: {
    typeIdx:{
      default:-1
    }
  },
  components:{
  },
  mounted() {
    this.initData()
  },
  methods:{
    initData(){
      let _this = this;
      this.post= {}
      if (this.typeIdx != -1) {
        this.$request
          .selectPostById({
            postId: _this.typeIdx
          })
          .then(res => {
            _this.post = res.data;
            this.postSrc = {...res.data}
            if (_this.post.imgs != "[]") {
              _this.post.imgs = _this.post.imgs
                .substr(1, _this.post.imgs.length - 2)
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
            } else {
              _this.post.imgs = [];
            }
            _this.post = {
              ..._this.post
            };
          });
      }
    },
    cancel(){
      this.$emit("cancel")
    },
    onSubmit() {
      let _this = this;
      this.$refs.form.validate(valid=>{
        if(valid){
          let postAfter = {...this.post}
          if(this.typeIdx!=-1){
            if(this.postSrc.imgs!="[]"){
              let imgAfter = "["
              this.postSrc.imgs.substr(1, this.postSrc.imgs.length - 2).split(",").forEach(item=>{
                this.post.imgs.forEach(img=>{
                  img = img.replace(/\//g, "\\")
                  if(item.indexOf(img)>=0){
                    imgAfter+=item+","
                  }
                })
              })
              imgAfter = imgAfter.substr(0, imgAfter.length - 1)
              imgAfter += "]"
              postAfter.imgs = imgAfter
            }else{
              postAfter.imgs = "[]"
            }
          }
          this.$emit("onSubmit", postAfter);
        }
        else{
          return false
        }
      })
    },
    handleChange(file, fileList) {
      this.post.image = fileList;
    },
    // 删除文件
    handleRemove(file) {
      let fileList = this.post.image;
      fileList.splice(fileList.indexOf(file), 1);
      this.post.image = fileList;
    },
    handleRemoveHis(img){
      this.post.imgs.splice(this.post.imgs.indexOf(img), 1)
    }

  },
 }
</script>

<style lang="less">
.edit-post{
  width: 70%;
  background-color: rgba(250,250,250,.7);
  // padding: 20px;
  .el-textarea__inner{
    height: 40vh;
  }
}
@import "../../../static/css/main";

.edit-post {
  .el-form {
    width: 90%;

    .el-form-item {
      margin-bottom: 2.3vh;
      font-size: 2vh;
      line-height: 6vh;
      // height: 6vh;
      display: flex;

      .el-form-item__label {
        text-align: right;
        width: 8vw;
        height: 6vh;
        line-height: inherit;
        font-size: 1.6vh;
        padding: 0 1vw 0 0;
      }

      .el-form-item__content {
        flex: 1;
        // height: inherit;
        line-height: inherit;
        font-size: inherit;
        display: flex;

        label {
          font-size: 1.8vh;
        }

        .el-input {
          height: inherit;
          line-height: inherit;
          font-size: inherit;

          .el-input__inner {
            height: inherit;
            line-height: 2.7;
            font-size: inherit;
            padding: 0 1vw;
            border-color: #eee;
          }
        }

        .el-button {
          width: 100%;
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          padding: 0;
          background-color: @thirthColor;
          border: none;
          letter-spacing: 1px;
          margin-left: 3vw;
          color: #eee;

          &:hover {
            background-color: @secondColor;
          }
        }

        .el-form-item__error {
          font-size: 1.4vh;
          width: 100%;
          text-align: right;
        }

        .el-upload--picture-card {
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          line-height: 6vw;

          i {
            font-size: 3vh;
          }
        }

        .el-upload-list--picture-card .el-upload-list__item {
          border-radius: 2px;
          width: 6vw;
          height: 6vw;
          margin: 0 1vw 0 0;
          border-color: #eee;
        }

        .el-date-editor.el-input .el-input__inner {
          padding-left: 3vw;
        }
      }
    }

    .upload-images {
      display: flex;

      .el-form-item__content {
        display: flex;
      }

      .upload-image {
        width: 40%;
        height: auto;
        margin-right: 1vw;
        margin-bottom: 1vw;
        border: 1px solid #eee;
      }
    }
  }

  .el-dialog__title {
    line-height: 1;
    font-size: 3vh;
    font-weight: bolder;
  }

  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1vh 1vw;
  }
}
</style>