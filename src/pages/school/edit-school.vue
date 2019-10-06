<template>
  <div class="edit-school">
    <el-form ref="form" :model="school" label-width="80px">
      <el-form-item label="学校名称">
        <el-input v-model="school.name"></el-input>
      </el-form-item>
      <el-form-item label="成立日期">
        <el-date-picker
          v-model="school.establishDt"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="学校地址">
        <el-select v-model="school.province" style="width:180px;"
            placeholder="省"
            @change="changeCity">
          <el-option
            v-for="item in selectData.province"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <el-select v-model="school.city" style="width:180px;"
            placeholder="市"
            @change="changeCounty">
          <el-option
            v-for="item in selectData.city"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            placeholder="">
          </el-option>
        </el-select>
        <el-select v-model="school.county" style="width:180px;"
            placeholder="区县"
            @change="changeAddr">
          <el-option
            v-for="item in selectData.county"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            placeholder="">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校规模">
        <el-input v-model="school.scale"></el-input>
      </el-form-item>
      <el-form-item label="科目等级">
        <el-input v-model="school.education"></el-input>
      </el-form-item>
      <el-form-item label="学校介绍">
        <el-input type="textarea" v-model="school.descr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      <!-- <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'edit-school',
  data() { 
    return {
      school:{
        province:"",
        city:"",
        county:"",
      },
      selectData:{
        province:[],
        city:[],
        county:[],
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
    let _this=this

          this.$request.selectAddress({level:1,pcode:0}).then(res=>{
            _this.selectData.province=res.data
          })
    if(this.typeIdx!=-1){
      this.$request.selectSchoolById({schoolId:_this.typeIdx}).then(
        res=>{
          _this.school = res.data
          _this.school.province=_this.school.address.substring(0,2)
          _this.school.city=_this.school.address.substring(0,4)
          _this.school.county=_this.school.address.substring(0,6)
          this.$request.selectAddress({level:2,pcode:_this.school.province}).then(res=>{
            // console.log(res)
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.school.city}).then(res=>{
            _this.selectData.county=res.data
          })
          _this.school={..._this.school}
        }
      )
    }
  },
  methods:{
    changeCity(pcode){
      let _this=this
      _this.selectData.city=[]
      _this.selectData.county=[]
      _this.school.city=""
      _this.school.county=""
      _this.school.address=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
        _this.selectData.city=res.data
      })
    },
    changeCounty(pcode){
      let _this=this
      _this.selectData.county=[]
      _this.school.county=""
      _this.school.address=""
      this.$request.selectAddress({level:3,pcode:pcode}).then(res=>{
        _this.selectData.county=res.data
      })
    },
    changeAddr(code){
      let _this=this
      console.log(code)
      this.school.county=code
      this.school.address=code
    },
    cancel(){
      this.$emit("cancel")
    },
    onSubmit(){
      let _this=this
      console.log(_this.school)
      this.$emit("onSubmit",_this.school)
    }

  },
 }
</script>

<style lang="less">
.edit-school{
  width: 70%;
  background-color: rgba(250,250,250,.7);
  padding: 20px;
  .el-textarea__inner{
    height: 400px;
  }
}
</style>