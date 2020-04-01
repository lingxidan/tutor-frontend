<template>
  <div class="edit-school">
    <el-form ref="form" :model="school" label-position="right" :rules="rules" >
      <el-form-item label="学校名称" prop="name">
        <el-input v-model="school.name"></el-input>
      </el-form-item>
      <el-form-item label="成立日期" prop="establishDt">
        <el-date-picker
          v-model="school.establishDt"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="学校地址" prop="county">
        <el-select
          v-model="school.province"
          placeholder="省"
          @change="changeCity"
        >
          <el-option
            v-for="item in selectData.province"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="school.city"
          placeholder="市"
          @change="changeCounty"
        >
          <el-option
            v-for="item in selectData.city"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            placeholder=""
          >
          </el-option>
        </el-select>
        <el-select
          v-model="school.county"
          placeholder="区县"
          @change="changeAddr"
        >
          <el-option
            v-for="item in selectData.county"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            placeholder=""
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校教育" prop="education">
        <el-input v-model="school.education"></el-input>
      </el-form-item>
      <el-form-item label="学校介绍" prop="descr">
        <el-input type="textarea" v-model="school.descr"></el-input>
      </el-form-item>
      <el-form-item label="相关照片">
        <div v-if="typeIdx != -1 && school.imgs && school.imgs.length > 0">
          <ul class="el-upload-list el-upload-list--picture-card">
            <li v-for="img in school.imgs" tabindex="0" class="el-upload-list__item is-ready">
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
  name: "edit-school",
  data() {
    return {
      schoolSrc: {},
      school: {},
      selectData: {
        province: [],
        city: [],
        county: []
      },
      
      rules: {
        name:[
          {required: true, message: '不能为空'}
        ],
        county:[
          {required: true, message: '不能为空'}
        ],
        establishDt:[
          {required: true, message: '不能为空'}
        ],
        education:[
          {required: true, message: '不能为空'}
        ],
        descr:[
          {required: true, message: '不能为空'}
        ],
      },
    };
  },
  props: {
    typeIdx: {
      default: -1
    }
  },
  components: {},
  created(){
  },
  mounted() {
      this.initData()
  },
  methods: {
    initData(){
      let _this = this;
      this.school= {
        province: "",
        city: "",
        county: "",
        imgs: [],
        establishDt: "2000-01-01"
      }
      this.$request
        .selectAddress({
          level: 1,
          pcode: 0
        })
        .then(res => {
          _this.selectData.province = res.data;
        });
      if (this.typeIdx != -1) {
        this.$request
          .selectSchoolById({
            schoolId: _this.typeIdx
          })
          .then(res => {
            _this.school = res.data;
            this.schoolSrc = {...res.data}
            if (_this.school.imgs != "[]") {
              _this.school.imgs = _this.school.imgs
                .substr(1, _this.school.imgs.length - 2)
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
              _this.school.imgs = [];
            }
            _this.school.province = _this.school.address.substring(0, 2);
            _this.school.city = _this.school.address.substring(0, 4);
            _this.school.county = _this.school.address.substring(0, 6);
            this.$request
              .selectAddress({
                level: 2,
                pcode: _this.school.province
              })
              .then(res => {
                // console.log(res)
                _this.selectData.city = res.data;
              });
            this.$request
              .selectAddress({
                level: 3,
                pcode: _this.school.city
              })
              .then(res => {
                _this.selectData.county = res.data;
              });
            _this.school = {
              ..._this.school
            };
          });
      }
    },
    changeCity(pcode) {
      let _this = this;
      _this.selectData.city = [];
      _this.selectData.county = [];
      _this.school.city = "";
      _this.school.county = "";
      _this.school.address = "";
      this.$request
        .selectAddress({
          level: 2,
          pcode: pcode
        })
        .then(res => {
          _this.selectData.city = res.data;
        });
    },
    changeCounty(pcode) {
      let _this = this;
      _this.selectData.county = [];
      _this.school.county = "";
      _this.school.address = "";
      this.$request
        .selectAddress({
          level: 3,
          pcode: pcode
        })
        .then(res => {
          _this.selectData.county = res.data;
        });
    },
    changeAddr(code) {
      let _this = this;
      this.school.county = code;
      this.school.address = code;
    },
    cancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      let _this = this;
      this.$refs.form.validate(valid=>{
        if(valid){
          let schoolAfter = {...this.school}
          if(this.typeIdx!=-1){
            if(this.schoolSrc.imgs!="[]"){
              let imgAfter = "["
              this.schoolSrc.imgs.substr(1, this.schoolSrc.imgs.length - 2).split(",").forEach(item=>{
                this.school.imgs.forEach(img=>{
                  img = img.replace(/\//g, "\\")
                  if(item.indexOf(img)>=0){
                    imgAfter+=item+","
                  }
                })
              })
              imgAfter = imgAfter.substr(0, imgAfter.length - 1)
              imgAfter += "]"
              schoolAfter.imgs = imgAfter
            }else{
              schoolAfter.imgs = "[]"
            }
          }
          this.$emit("onSubmit", schoolAfter);
        }
        else{
          return false
        }
      })
    },
    handleChange(file, fileList) {
      this.school.image = fileList;
    },
    // 删除文件
    handleRemove(file) {
      let fileList = this.school.image;
      fileList.splice(fileList.indexOf(file), 1);
      this.school.image = fileList;
    },
    handleRemoveHis(img){
      this.school.imgs.splice(this.school.imgs.indexOf(img), 1)
    }
  },
  watch:{
    typeIdx(oldVal, newVal){
      this.initData()
    }
  }
};
</script>

<style lang="less">
@import "../../../static/css/main";

.edit-school {
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
            border-color: @sixthColor;
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
          color: @sixthColor;

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
          border-color: @sixthColor;
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
        border: 1px solid @sixthColor;
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
