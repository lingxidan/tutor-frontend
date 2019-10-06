<template>
  <div class="volInfo">
    <div class="content">
      <div class="jingli">
        <div class="part selfInfo" :style="edit.describe?'background-color:#fafafa':'background-color:inherit'">
          <div class="title">个人优势
            <a class="edit" @click="editData('describe',-1)" v-if="!edit.describe">
              <i class="el-icon-edit"></i>
              <label>编辑</label>
              <!-- <label v-else>取消</label> -->
            </a>
            <el-button class="submit-button" v-if="edit.describe" type="primary" @click="submit('describe',-1)">提交</el-button>
          </div>
          <div v-if="!edit.describe" class="partContent">{{teacher.descr}}</div>
          <el-input type="textarea" v v-else class="partContent" v-model="teacher.descr"></el-input>
        </div>
        <div class="part zhiwei">
          <div class="title">期望岗位
            <!-- {{teacher.zhiwei.length}} -->
          </div>
          <div class="partContent">
            <div class="zhiweiContent" v-for="(zhiwei,idx) in teacher.zhiwei" :key="idx"
             :style="edit.zhiwei[idx]?'background-color:#fafafa':'background-color:inherit'">
              <div v-if="!edit.zhiwei[idx]">
                <span>
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{zhiwei.name}}
                </span>
                <span>
                  <i class="el-icon-self-dingwei"></i>
                  <label v-for="(addr,addrIdx) in zhiwei.addrNames" :key="addrIdx">
                    {{addr}}
                  </label>
                </span>
              </div>
              <div v-else class="edit-zhiwei">
                <el-input v-model="zhiwei.name">
                  <label slot="prepend">职位名称</label>
                </el-input>
                <div v-for="(addr,addrIdx) in zhiwei.addrsList" :key="addrIdx" class="addr-input">
                  <label for="">期望地址{{addrIdx+1}}</label>
                  
                  <el-select v-model="addr.province" style="width:180px;"
                      placeholder="省"
                      @change="changeCity">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="addr.city" style="width:180px;"
                      placeholder="市"
                      @change="changeCounty">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="addr.address" style="width:180px;"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <!-- <el-select v-model="addr.province" style="width:150px">
                  </el-select>
                  <el-select v-model="addr.city" style="width:150px">
                  </el-select>
                  <el-select v-model="addr.county" style="width:150px">
                  </el-select> -->
                </div>
              </div>
              <a class="edit" @click="editData('zhiwei',idx)" v-if="!edit.zhiwei[idx]">
                <i class="el-icon-edit"></i>
                <label>编辑</label>
                <!-- <label v-else>取消</label> -->
              </a>
              <a class="edit" @click="deleteExpectJob(idx)" v-if="!edit.zhiwei[idx]">
                <i class="el-icon-delete"></i>
                <label >删除</label>
              </a>
              <el-button class="submit-button" v-if="edit.zhiwei[idx]" type="primary">提交</el-button>
              
            </div>
            <div class="zhiweiContent" style="background-color:#fafafa">
              <div class="edit-zhiwei">
                <el-input v-model="zhiwei.name">
                  <label slot="prepend">职位名称</label>
                </el-input>
                <div v-for="(addr,addrIdx) in zhiwei.city" :key="addrIdx" class="addr-input">
                  <label for="">期望地址{{addrIdx+1}}</label>
                  <el-select v-model="addr.province" style="width:180px;"
                      placeholder="省"
                      @change="changeExpectCity(addrIdx)">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="addr.city" style="width:180px;"
                      placeholder="市"
                      @change="changeExpectCounty(addrIdx)">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="addr.address" style="width:180px;"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.expectJob[addrIdx].county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <el-button class="submit-button" type="primary" @click="addExpectJob">提交</el-button>
              
            </div>
          </div>
        
        </div>
        <div class="part jiaoyu">
          <div class="title">教育经历</div>
          <div class="partContent">
            <div class="jiaoyuContent" v-for="(jiaoyu,idx) in teacher.jiaoyu" :key="idx"
            :style="edit.jiaoyu[idx]?'background-color:#fafafa':'background-color:inherit'">
              <div v-if="!edit.jiaoyu[idx]">
                <div class="gongsi">
                  <i class="el-icon-self-edu"></i>
                  {{jiaoyu.schoolName}}
                  <span class="time">{{jiaoyu.startDt+"-"+jiaoyu.endDt}}</span>
                </div>
                <div class="zhiwei">
                  <span>{{jiaoyu.project}}</span>
                  <span v-if="jiaoyu.degree">{{jiaoyu.degree}}</span>
                </div>
                <div class="neirong">
                  <label>内容：</label><span>{{jiaoyu.content}}</span>
                </div>
              </div>
              <div v-else class="edit-zhiwei">
                <el-input v-model="jiaoyu.schoolName">
                  <label slot="prepend">学校名称</label>
                </el-input>
                <el-input v-model="jiaoyu.project">
                  <label slot="prepend">专业名称</label>
                </el-input>
                <el-input v-model="jiaoyu.degree">
                  <label slot="prepend">专业学历</label>
                </el-input>
                <p>
                  <label for="">开始日期</label>
                  <el-date-picker
                    v-model="jiaoyu.startDt"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <label for="">结束日期</label>
                  <el-date-picker
                    v-model="jiaoyu.endDt"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </p>
                <p>
                  <label>学校经历</label>
                  <el-input type="textarea" v-model="jiaoyu.content">
                  </el-input>
                </p>
              </div>
              <a class="edit" @click="editData('jiaoyu',idx)"  v-if="!edit.jiaoyu[idx]">
                <i class="el-icon-edit"></i>
                <label>编辑</label>
                <!-- <label v-else>取消</label> -->
              </a>
              <a class="edit" @click="deleteJiaoyu(idx)" v-if="!edit.jiaoyu[idx]">
                <i class="el-icon-delete"></i>
                <label >删除</label>
              </a>
              <el-button class="submit-button" v-if="edit.jiaoyu[idx]" type="primary">提交</el-button>
            </div>
            <div class="jiaoyuContent" style="background-color:#fafafa">
              <div class="edit-zhiwei">
                <el-input v-model="jiaoyu.schoolName">
                  <label slot="prepend">学校名称</label>
                </el-input>
                <el-input v-model="jiaoyu.project">
                  <label slot="prepend">专业名称</label>
                </el-input>
                <el-input v-model="jiaoyu.degree">
                  <label slot="prepend">专业学历</label>
                </el-input>
                <p>
                  <label for="">开始日期</label>
                  <el-date-picker
                    v-model="jiaoyu.startDt"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <label for="">结束日期</label>
                  <el-date-picker
                    v-model="jiaoyu.endDt"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </p>
                <p>
                  <label>学校经历</label>
                  <el-input type="textarea" v-model="jiaoyu.content">
                  </el-input>
                </p>
              </div>
              <el-button class="submit-button" type="primary" @click="addJiaoyu">提交</el-button>
            </div>
          </div>
        </div>
        <div class="part zhengshu">
          <div class="title">资格证书
            <a class="edit" @click="editData('zhengshu',-1)" v-if="!edit.zhengshu">
              <i class="el-icon-edit"></i>
              <label>编辑</label>
              <!-- <label v-else>取消</label> -->
            </a>
            <el-button class="submit-button" v-if="edit.zhengshu" type="primary" @click="editZhengshu">提交</el-button>
          </div>
          <div class="partContent">
            <div v-if="!edit.zhengshu">
              <div class="zhengshuContent" v-for="(zhengshu,idx) in teacher.zhengshuList" :key="idx">
                  {{zhengshu}}
              </div>
            </div>
            <div v-else>
              <el-input type="textarea" v-model="teacher.zhengshu">
              </el-input>
            </div>
          </div>
        </div>
        <div class="part shengya">
          <div class="title">工作经历</div>
          <div class="partContent">
            <div class="jingliContent" v-for="(jingli,idx) in teacher.jingli" :key="idx"
          :style="edit.jingli[idx]?'background-color:#fafafa':'background-color:inherit'">
              <div v-if="!edit.jingli[idx]">
                <div class="gongsi">
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{jingli.companyName}}
                  <span class="time">{{jingli.startDt+"-"+jingli.endDt}}</span>
                </div>
                <div class="zhiwei">
                  <span v-if="jingli.departName">{{jingli.departName}}</span>
                  <span>{{jingli.jobName}}</span>
                </div>
                <div class="neirong">
                  <label>内容：</label><span>{{jingli.task}}</span>
                </div>
                <div class="yeji" v-if="jingli.performance">
                  <label>业绩：</label><span>{{jingli.performance}}</span>
                </div>
              </div>
              <div v-else>
                <el-input v-model="jingli.companyName">
                  <label slot="prepend">公司名称</label>
                </el-input>
                <el-input v-model="jingli.departName">
                  <label slot="prepend">部门名称</label>
                </el-input>
                <el-input v-model="jingli.jobName">
                  <label slot="prepend">职位名称</label>
                </el-input>
                <p>
                  <label for="">开始日期</label>
                  <el-date-picker
                    v-model="jingli.startDt"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <label for="">结束日期</label>
                  <el-date-picker
                    v-model="jingli.endDt"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </p>
                <p>
                  <label>工作内容</label>
                  <el-input type="textarea" v-model="jingli.task">
                  </el-input>
                </p>
                <p>
                  <label>工作业绩</label>
                  <el-input type="textarea" v-model="jingli.performance">
                  </el-input>
                </p>
              </div>
              <a class="edit" @click="editData('jingli',idx)" v-if="!edit.jingli[idx]">
                <i class="el-icon-edit"></i>
                <label>编辑</label>
                <!-- <label v-else>取消</label> -->
              </a>
              <a class="edit" @click="deleteJingli(idx)" v-if="!edit.jingli[idx]">
                <i class="el-icon-delete"></i>
                <label >删除</label>
              </a>
              <el-button class="submit-button" v-if="edit.jingli[idx]" type="primary">提交</el-button>
            </div>
            <div class="jingliContent" style="background-color:#fafafa">
              <div>
                <el-input v-model="jingli.companyName">
                  <label slot="prepend">公司名称</label>
                </el-input>
                <el-input v-model="jingli.departName">
                  <label slot="prepend">部门名称</label>
                </el-input>
                <el-input v-model="jingli.jobName">
                  <label slot="prepend">职位名称</label>
                </el-input>
                <p>
                  <label for="">开始日期</label>
                  <el-date-picker
                    v-model="jingli.startDt"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <label for="">结束日期</label>
                  <el-date-picker
                    v-model="jingli.endDt"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </p>
                <p>
                  <label>工作内容</label>
                  <el-input type="textarea" v-model="jingli.task">
                  </el-input>
                </p>
                <p>
                  <label>工作业绩</label>
                  <el-input type="textarea" v-model="jingli.performance">
                  </el-input>
                </p>
              </div>
              <el-button class="submit-button" type="primary" @click="addJingli">提交</el-button>
            </div>
          </div>
        </div>
        <div class="part shejiao">
          <div class="title">社交主页

            <a class="edit" @click="editData('shejiao',-1)" v-if="!edit.shejiao">
              <i class="el-icon-edit"></i>
              <label>编辑</label>
              <!-- <label v-else>取消</label> -->
            </a>
            <el-button class="submit-button" v-if="edit.shejiao" type="primary" @click="addShejiao">提交</el-button>
          </div>
          <div class="partContent">
            <div v-if="!edit.shejiao">
              <div class="zhengshuContent" v-for="(shejiao,idx) in teacher.shejiaoList" :key="idx">
                <i class="el-icon-monitor"></i>
                  {{shejiao.value}}
              </div>
            </div>
            <div v-else>
              <el-input type="textarea" v-model="teacher.shejiao">
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="other">
        <div class="self">
          <div class="name">
            <h2 class="show">{{teacher.name}}</h2>
            <p class="sex" v-if="teacher.sex==1">♀</p>
            <p class="sex" v-if="teacher.sex==0">♂</p>
          </div>
          <a class="edit" @click="editData('baseInfo',-1)" v-if="!edit.baseInfo">
            <i class="el-icon-edit"></i>
            <label>编辑</label>
            <!-- <label v-else>取消</label> -->
          </a>
          <el-button class="submit-button" v-if="edit.baseInfo" type="primary" @click="submit('baseInfo',-1)">提交</el-button>
          <div v-if="!edit.baseInfo" class="base">
            <p>
              <i class="el-icon-self-touxiang"></i>
              <label for="">当前状态:</label>
              {{teacher.status==1?"考虑机会":"暂不考虑"}}
            </p>
            <p>
              <i class="el-icon-self-edu"></i>
              <label for="">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</label>
              {{teacher.educationName}}
            </p>
            <p>
              <i class="el-icon-self-dianhua"></i>
              <label for="">联系电话:</label>
              {{teacher.phone}}
            </p>
            <p>
              <i class="el-icon-message"></i>
              <label for="">联系邮箱:</label>
              {{teacher.email}}
            </p>
            <p>
              <i class="el-icon-message"></i>
              <label for="">联系地址:</label>
              {{teacher.addressName}}
            </p>
          </div>
          <div v-else class="editBase">
            <p>
              <label for="">当前状态</label>
               <el-select v-model="teacher.status">
                 <el-option
                  v-for="item in selectData.status"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
               </el-select>
            </p>
            <p>
              <label>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</label>
              <el-select v-model="teacher.education">
                <el-option
                v-for="item in selectData.education"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
              </el-select>
            </p>
            <!-- <el-input v-model="teacher.education" style="width:300px">
              <label slot="prepend">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</label>
            </el-input> -->
            <el-input v-model="teacher.phone" style="width:300px">
              <label slot="prepend">联系电话</label>
            </el-input>
            <el-input v-model="teacher.email" style="width:300px">
              <label slot="prepend">联系邮箱</label>
            </el-input>
            <p>
              <label for="">联系地址</label>
              <el-select v-model="teacher.province" style="width:180px;"
                  placeholder="省"
                  @change="changeCity">
                <el-option
                  v-for="item in selectData.province"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-select v-model="teacher.city" style="width:180px;"
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
              <el-select v-model="teacher.address" style="width:180px;"
                  placeholder="区县">
                <el-option
                  v-for="item in selectData.county"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  placeholder="">
                </el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="jianli">
          <div class="title">附件简历</div>
          <div class="partContent">
            <!-- <div class="jianliContent" v-if="teacher.jianli.length<=0"> -->
              <el-button @click="editData('uploadFile',-1)">
                <p v-if="!edit.uploadFile">
                  <i class="el-icon-plus"></i>
                  <label>上传简历</label>
                </p>
                <p v-else>
                  <label>取消上传</label>
                </p>
              </el-button>
            <!-- </div> -->
            <div class="jianliContent" v-for="(jianli,idx) in teacher.jianli" :key="idx">
              <i class="el-icon-document"></i>
              {{jianli.name}}
              <a class="edit" @click="showJianli(jianli)">
                <i class="el-icon-edit"></i>
                <label>查看</label>
              </a>
              <a class="edit" @click="deleteJianli(idx)">
                <i class="el-icon-delete"></i>
                <label >删除</label>
              </a>
            </div>
          </div>
          <uploadFile v-if="edit.uploadFile" @uploadFile="uploadFile"></uploadFile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputSelect from '../../../components/common/input-select.vue'
import uploadFile from '../../resume/uploadFile.vue'
import topNav from '../../../components/common/topNav.vue'
export default {
  name: 'volInfo',
  data() { 
    return {
      zhiwei:{
        city:[{province:"",city:"",county:"",address:""},
        {province:"",city:"",county:"",address:""},
        {province:"",city:"",county:"",address:""}]
      },
      jiaoyu:{},
      jingli:{},
      edit:{
        baseInfo:false,
        uploadFile:false,
        zhiweiAll:false,
      },
      teacher:{
        name:"曾小贤",
        identiCard:"142729********20",
        phone:"1738200****",
        password:"adsfa",
        address:"北京市朝阳区",
        sex:1,
        gongzuojingyan:2,
        education:"本科",
        status:"暂不考虑",
        email:"dajuj@mail.com",
        province:"山西省",
        city:"太原市",
        county:"小店区",
        describe:"本人性格开朗，双料硕士学位，现任广播电视主持人。唱歌雷人，尤其喜欢在洗澡时唱歌，拥有打嗝特长的特殊技能。",
        zhiwei:[{
          name:"数学教师",
          city:[{
            adcode:"75766",
            province:"山西省",
            city:"太原市",
            county:"小店区",
          },{
            adcode:"75766",
            province:"山东省",
            city:"潍坊市",
            county:"潍城区",
          },{
            adcode:"",
            province:"",
            city:"",
            county:"",
          }]
        },{
          name:"英语教师",
          city:[{
            adcode:"75766",
            province:"内蒙古自治区",
            city:"呼和浩特市",
            county:"呼和浩特经济技术开发区",
          },{
            adcode:"75766",
            province:"山东省",
            city:"潍坊市",
            county:"潍城区",
          },{
            adcode:"",
            province:"",
            city:"",
            county:"",
          }]
        }],
        jiaoyu:[{
          name:"交通大学",
          xueli:"硕士",
          zhuanye:"历史学",
          start:"2015.9",
          end:"2018.9",
          neirong:"无"
        },{
          name:"交通大学",
          xueli:"硕士",
          zhuanye:"哲学",
          start:"2015.9",
          end:"2018.9",
          neirong:"无"
        }],
        zhengshu:"大学英语四级;大学英语六级",
        jingli:[{
          name:"上海市XXX广播电台",
          hangye:"广播/影视",
          bumen:"广播部",
          zhiwei:"广播主持人",
          zhiweileixing:"主播",
          start:"2018.1",
          end:"至今",
          neirong:"主持深夜广播节目《你的月亮我的心》",
          yeji:"拉到三个赞助商广告"
        },{
          name:"上海市XXX广播电台",
          hangye:"广播/影视",
          bumen:"广播部",
          zhiwei:"广播主持人",
          zhiweileixing:"主播",
          start:"2008.12",
          end:"2018.1",
          neirong:"主持深夜广播节目《你的月亮我的心》"
        },{
          name:"上海市XXX广播电台",
          hangye:"广播/影视",
          zhiwei:"广播主持人",
          zhiweileixing:"主播",
          start:"2008.10",
          end:"2008.12",
          neirong:"主持深夜广播节目《你的月亮我的心》",
          yeji:"拉到三个赞助商广告"
        }],
        shejiao:"https://baike.baidu.com/item/%E6%9B%BE%E5%B0%8F%E8%B4%A4/1926595?fr=aladdin||https://baike.baidu.com/item/%E6%9B%BE%E5%B0%8F%E8%B4%A4/1926595?fr=aladdin",
        jianli:[{
          name:"附件简历_1",
          path:"../../../../static/files/转正申请书-张泽丹_1567833451113.pdf"
        }]
        // jianli:[]
      },
      selectData:{
        status:[{
          name:"考虑机会",
          code:1
        },{
          name:"暂不考虑",
          code:2
        },],
        province:[],
        city:[],
        county:[],
        expectJob:[{
          province:[],
          city:[],
          county:[],
        },{
          province:[],
          city:[],
          county:[],
        },{
          province:[],
          city:[],
          county:[],
        }],
        education:[{
          name:"高中及以下",
          code:"1"
        },{
          name:"高中",
          code:"2"
        },{
          name:"大专",
          code:"3"
        },{
          name:"本科",
          code:"4"
        },{
          name:"硕士研究生",
          code:"5"
        },{
          name:"博士研究生",
          code:"6"
        },]
      }
    }
  },
  props: {

  },
  components:{
    uploadFile
  },
  created(){
    let _this=this
    this.teacher.zhengshuList=this.teacher.zhengshu.split(";")
    _this.teacher.shejiaoList=[]
    let shejiaoList=[...this.teacher.shejiao.split("||")]
    shejiaoList.forEach((shejiao,idx)=>{
      _this.teacher.shejiaoList.push({value:shejiao,key:idx})
    })
    Object.keys(this.teacher).forEach(field=>{
      if(_this.teacher[field] instanceof Object){
          _this.edit[field]=[]
          _this.teacher[field].forEach(item=>{
          _this.edit[field].push(false)
        })
      }else{
        _this.edit[field]=false
      }
    })
    
    this.teacher = JSON.parse(sessionStorage.getItem('user'));
    // _this.getUserInfo(28)
    // // console.log(_this.edit)

  },
  mounted() {
    let _this=this
    // _this.teacher=this.$store.state.user
    this.teacher.zhengshuList=[]
    this.teacher.zhiwei=[]
    this.teacher.jiaoyu=[]
    this.teacher.shejiaoList=[]
    _this.getUserInfo(this.teacher.userId)
  },
  methods:{
    getUserInfo(dataId){
      let _this=this
      this.$request.getVolunteer({userId:dataId}).then(
        res=>{
          _this.teacher=res.data
          _this.teacher.province=res.data.address.substring(0,2)
          _this.teacher.city=res.data.address.substring(0,4)
          _this.teacher.county=res.data.address
          _this.selectData.education.forEach(edu=>{
            if(edu.code==_this.teacher.education){
              _this.teacher.educationName=edu.name
            }
          })
          // 期望岗位
          _this.$request.selectExpectJobByCondition({userId:dataId}).then(
            res=>{
              res.data.forEach(item=>{
                let addrsList=[]
                let addrs=item.addrs.split(";")
                addrs.forEach(addr=>{
                  let province=addr.substring(0,2)
                  let city=addr.substring(0,4)
                  let county=addr.substring(0,6)
                  addrsList.push({
                    province:province,
                    city:city,
                    county:county,
                  })

                  // this.$request.selectAddress({level:2,pcode:province}).then(res=>{
                  //   // // console.log(res)
                  //   _this.selectData.city=res.data
                  // })
                  // this.$request.selectAddress({level:3,pcode:_this.teacher.city}).then(res=>{
                  //   _this.selectData.county=res.data
                  // })
                })
                item.addrsList=addrsList
              })
              
              _this.teacher.zhiwei = [...res.data]
              _this.teacher={..._this.teacher}
            }
          )
          // 教育经历
          _this.$request.selectVolEduByCondition({userId:dataId}).then(
            res=>{
              // console.log(res.data)
              _this.teacher.jiaoyu=[...res.data]
              _this.teacher={..._this.teacher}
            }
          )
          // 资格证书
          _this.$request.selectCertificateByCondition({userId:dataId}).then(
            res=>{
              if(res.data.length>0){
                _this.teacher.zhengshu=[...res.data][res.data.length-1].name
                _this.teacher.zhengshuList=(_this.teacher.zhengshu||"").split(";")
              }
              _this.teacher={..._this.teacher}
            }
          )
          // 工作经历
          _this.$request.selectExperienceByCondition({userId:dataId}).then(
            res=>{
              _this.teacher.jingli=[...res.data]
              _this.teacher={..._this.teacher}
            }
          )
          // 社交主页
          _this.$request.selectContactByCondition({userId:dataId}).then(
            res=>{
              _this.teacher.shejiao=([...res.data][res.data.length-1]||{}).url||""
              // _this.teacher.zhengshuList=(_this.teacher.zhengshu||"").split(";")
              _this.teacher.shejiaoList=[]
              let shejiaoList=[...(_this.teacher.shejiao||"").split(";")]
              shejiaoList.forEach((shejiao,idx)=>{
                _this.teacher.shejiaoList.push({value:shejiao,key:idx})
              })
              _this.teacher={..._this.teacher}
            }
          )
          // 简历文件
          
          this.$request.selectFileByCondition({userId:dataId}).then(
            res=>{
              // console.log(res)
              _this.teacher.jianli=[...res.data]
              // _this.teacher.zhengshuList=(_this.teacher.zhengshu||"").split(";")
              // _this.teacher.shejiaoList=[]
              // let shejiaoList=[...(_this.teacher.shejiao||"").split(";")]
              // shejiaoList.forEach((shejiao,idx)=>{
              //   _this.teacher.shejiaoList.push({value:shejiao,key:idx})
              // })
              _this.teacher={..._this.teacher}
            }
          )
          // // console.log("get",_this.teacher)

          this.$request.selectAddress({level:1,pcode:0}).then(res=>{
            // // console.log(res)
            _this.selectData.province=res.data
            _this.selectData.expectJob.forEach(item=>{
              item.province=res.data
            })
          })
          this.$request.selectAddress({level:2,pcode:_this.teacher.province}).then(res=>{
            // // console.log(res)
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.teacher.city}).then(res=>{
            _this.selectData.county=res.data
          })
          _this.teacher={..._this.teacher}
        }
      )
      
      this.$store.commit('user', this.teacher);

    },
    submit(field,id){
      let _this=this
      if(id==-1){
        _this.$request.editVolunteer(_this.teacher).then(res=>{
          _this.getUserInfo(_this.teacher.userId)
          _this.editData(field,id)
        })
      }
    },
    changeCity(pcode){
      let _this=this
      _this.selectData.city=[]
      _this.selectData.county=[]
      _this.teacher.city=""
      _this.teacher.county=""
      this.$request.selectAddress({level:2,pcode:pcode}).then(res=>{
        _this.selectData.city=res.data
      })
    },
    changeCounty(pcode){
      let _this=this
      _this.selectData.county=[]
      _this.teacher.county=""
      this.$request.selectAddress({level:3,pcode:pcode}).then(res=>{
        _this.selectData.county=res.data
      })
    },
    changeExpectCity(addrIdx){
      let _this=this
      _this.selectData.expectJob[addrIdx].city=[]
      _this.selectData.expectJob[addrIdx].county=[]
      _this.zhiwei.city[addrIdx].city=""
      _this.zhiwei.city[addrIdx].county=""
      this.$request.selectAddress({level:2,pcode:_this.zhiwei.city[addrIdx].province}).then(res=>{
        _this.selectData.expectJob[addrIdx].city=res.data
      })

    },
    changeExpectCounty(addrIdx){
      let _this=this
      _this.selectData.expectJob[addrIdx].county=[]
      _this.zhiwei.city[addrIdx].county=""
      this.$request.selectAddress({level:3,pcode:_this.zhiwei.city[addrIdx].city}).then(res=>{
        _this.selectData.expectJob[addrIdx].county=res.data
      })

    },
    editData(field,id){
      let edit={...this.edit}
      if(id==-1){
        edit[field]=!edit[field]
      }
      else{
        let editArr=[...edit[field]]
        editArr[id]=!editArr[id]
        edit[field]=editArr
        // // console.log(this.edit[field])
      }
      this.edit={...edit}
    },
    showJianli(jianli){
      // console.log(jianli)
      let path="../../../../static/files/"+jianli.name
      window.open("../../../../static/pdfjs/web/viewer.html?file=" + path);
    },
    addExpectJob(){
      let _this=this
      let zhiwei = _this.zhiwei
      let addrs=""
      // console.log(_this.zhiwei)
      zhiwei.city.forEach(a=>{
        if(a.address!=""){
          addrs+=a.address+";"
        }
      })
      let param={
        name:zhiwei.name,
        addrs:addrs.substring(0,addrs.length-1),
        userId:this.teacher.userId
      }
      this.$request.insertExpectJob(param).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
      // // console.log(param)
      // _this.editData("zhiwei",id)
    },
    deleteExpectJob(idx){
      let _this=this
      let id = _this.teacher.zhiwei[idx].id
      // console.log(_this.teacher.zhiwei[idx])
      this.$request.deleteExpectJob({id}).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
    },
    // 教育经历
    addJiaoyu(){
      let _this=this
      // // console.log(this.jiaoyu)
      let jiaoyu=this.jiaoyu
      let param={
        schoolName:jiaoyu.schoolName,
        project:jiaoyu.project,
        degree:jiaoyu.degree,
        startDt:jiaoyu.startDt,
        endDt:jiaoyu.endDt,
        content:jiaoyu.content,
        userId:_this.teacher.userId
      }
      // console.log("addjiaoyu",param)
      _this.$request.insertVolEdu(param).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
    },
    deleteJiaoyu(idx){
      let _this=this
      // // console.log(_this.teacher.jiaoyu[idx])
      let id = _this.teacher.jiaoyu[idx].id
      this.$request.deleteVolEdu({id}).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)

      })
    },
    // 资格证书
    editZhengshu(){
      let _this=this
      // console.log(_this.teacher.zhengshu)
      this.editData("zhengshu",-1)
      _this.$request.insertCertificate({
        name:_this.teacher.zhengshu,
        userId:_this.teacher.userId
      }).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
    },
    // 工作经历
    addJingli(){
      let _this=this
      // console.log(_this.jingli)
      let jingli=_this.jingli
      let param={
        companyName:jingli.companyName,
        startDt:jingli.startDt,
        endDt:jingli.endDt,
        departName:jingli.departName,
        jobName:jingli.jobName,
        task:jingli.task,
        performance:jingli.performance,
        userId:_this.teacher.userId
      }
      // console.log(param)
      _this.$request.insertExperience(param).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
    },
    deleteJingli(idx){
      let _this=this
      let id = this.teacher.jingli[idx].id

      _this.$request.deleteExperience({id}).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)

        }
      )
    },
    // 社交主页
    addShejiao(){
      let _this=this
      // console.log(_this.teacher.shejiao)
      this.editData("shejiao",-1)
      _this.$request.insertContact({
        url:_this.teacher.shejiao,
        userId:_this.teacher.userId
      }).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
        }
      )
    },
    uploadFile(files,fileName){
      let _this=this
      let fileFormData = new FormData();
      // console.log(files, fileName,this.teacher.userId)
      fileFormData.append('file', files, fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      fileFormData.append('userId', this.teacher.userId);
      let requestConfig = {
        headers: {
        'Content-Type': 'multipart/form-data'
        },
      }
      this.$request.uploadFile(fileFormData).then(
        res=>{
          // console.log(res)
          _this.getUserInfo(this.teacher.userId)
          _this.$message.success('上传成功')
          _this.editData('uploadFile',-1)
        }
      )
    },
    deleteJianli(idx){
      let _this=this
      let id = this.teacher.jianli[idx].id

      _this.$request.deleteFileById({id}).then(
        res=>{
          _this.getUserInfo(_this.teacher.userId)
          _this.$message.success('删除成功')

        }
      )

    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../../static/css/main';
.volInfo{
      // background-color: #fafafa;
  .content{
    margin: 30px;
    display: flex;
    // align-items: center;
    justify-content: center;
    .jingli{
      box-shadow: 0 0 10px 0 #eeeeff;
      // box-shadow: 0 0 10px 0 #ffecb3;
      // box-shadow: 0 0 6px 0 @mainColor;
      background-color: #fff;
      width: 56%;
      padding: 30px 30px;
      margin-right: 10px;
      .part{
        padding: 6px 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        .title{
          border-left: 5px solid @secondColor;
          text-align: left;
          padding-left: 28px;
          font-size: 20px;
          font-weight: 500;
        }
        .partContent{
          // background-color: #aaa;
          margin: 10px 5px;
          // margin-bottom: 10px;
          text-align: left;
          font-size: 15px;
          line-height: 26px;
          // letter-spacing: 1px;
          color: #61687c;
        }
      }
      .selfInfo{
        .submit-button{
          margin-left: 200px;
        }
        a label{
          cursor: pointer;
        }
        a.edit{
          display: inline-block;
          opacity: 0;
          font-size: 16px;
          cursor: pointer;
          margin-left: 50px;
          color: #aaa;
          &:hover{
            color: coral;
          }
        }
        &:hover{
          a.edit{
          opacity: 1;
          }
        }
      }
      .zhiwei{
        // height: 100px;
        .zhiweiContent{
          display: flex;
          margin-top: 6px; 
            border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          span{
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
          }
          span:first-of-type{
            width: 100px;
          }
          span:nth-child(2){
            width: 300px;
          }

          &:first-child{
            margin-top: 0;
          }
          a label{
            cursor: pointer;
          }
          a.edit{
            display: inline-block;
            opacity: 0;
            font-size: 16px;
            cursor: pointer;
            margin-left: 50px;
            color: #aaa;
            &:hover{
              color: coral;
            }
            vertical-align: middle;
          }
          &:hover{
            border: 1px solid coral;
            a.edit{
            opacity: 1;
            }
          }
          
          .submit-button{
            margin-left: 50px;
          }

          .addr-input{
            margin-top: 10px;
          }
          .edit-zhiwei{
            padding: 15px 10px;
          }
        }
      }
      .shengya{
        .jingliContent{
          margin-top: 6px;
          padding: 5px 5px 5px 8px;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          a label{
            cursor: pointer;
          }
          a.edit{
            display: inline-block;
            opacity: 0;
            font-size: 16px;
            cursor: pointer;
            margin-left: 50px;
            color: #aaa;
            &:hover{
              color: coral;
            }
          }
          &:hover{
            a.edit{
            opacity: 1;
            }
          }
          
          .submit-button{
            margin-left: 50px;
          }
        }
        .jingliContent:hover{
          border: 1px solid @mainColor;
        }
        .gongsi,.zhiwei,.neirong,.yeji{
          padding: 3px;
        }
        .gongsi{
          font-weight: bold;
          .time{
            display: inline-block;
            font-size: 10px;
            margin-left: 30px;
            font-weight: normal;
            color:#999;
          }
        }
        .zhiwei{
          font-weight: bold;
        }
        .neirong,.yeji{
          font-size: 14px;
          label{
            font-weight: bold;
          }
        }
      }
      .jiaoyu{
        .jiaoyuContent{
          margin-top: 6px;
          padding: 5px 5px 5px 8px;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          a label{
            cursor: pointer;
          }
          a.edit{
            display: inline-block;
            opacity: 0;
            font-size: 16px;
            cursor: pointer;
            margin-left: 50px;
            color: #aaa;
            &:hover{
              color: coral;
            }
          }
          &:hover{
            a.edit{
            opacity: 1;
            }
          }
          
          .submit-button{
            margin-left: 50px;
          }
        }
        .jiaoyuContent:hover{
          border: 1px solid @mainColor;
        }
        .gongsi,.zhiwei,.neirong{
          padding: 3px;
        }
        .gongsi{
          font-weight: bold;
          .time{
            display: inline-block;
            font-size: 10px;
            margin-left: 30px;
            font-weight: normal;
            color:#999;
          }
        }
        .zhiwei{
          font-weight: bold;
        }
        .neirong{
          font-size: 14px;
          label{
            font-weight: bold;
          }
        }
      }
      .zhengshu{
        .zhengshuContent{
          font-size: 13px;
          border: 1px solid @secondColor;
          display: inline-block;
          padding: 0px 5px;
          border-radius: 3px;
          margin: 5px;
        }
          a label{
            cursor: pointer;
          }
          a.edit{
            display: inline-block;
            opacity: 0;
            font-size: 16px;
            cursor: pointer;
            margin-left: 50px;
            color: #aaa;
            &:hover{
              color: coral;
            }
          }
          &:hover{
            a.edit{
            opacity: 1;
            }
          }
          
          .submit-button{
            margin-left: 50px;
          }
      }
      .shejiao{
          a label{
            cursor: pointer;
          }
          a.edit{
            display: inline-block;
            opacity: 0;
            font-size: 16px;
            cursor: pointer;
            margin-left: 50px;
            color: #aaa;
            &:hover{
              color: coral;
            }
          }
          &:hover{
            a.edit{
            opacity: 1;
            }
          }
          
          .submit-button{
            margin-left: 50px;
          }
        .shejiaoContent{
          display: flex;
          align-items: center;
          // height: 35px;
          // line-height: 35px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          i{
            font-size: 16px;
            margin-right: 10px;
          }
        }
        // height: 100px;
        // background-color: rgb(102, 18, 18);
      }
    }
    .self,.jianli{
      box-shadow: 0 0 10px 0 #eeeeff;
      a label{
        cursor: pointer;
      }
      a.edit{
        display: inline-block;
        opacity: 0;
        font-size: 16px;
        cursor: pointer;
        margin-left: 10px;
        color: #aaa;
        &:hover{
          color: coral;
        }
      }
      &:hover{
        a.edit{
        opacity: 1;
        }
      }
      
      .submit-button{
        margin-left: 50px;
      }
      margin-bottom: 10px;
      // width: 210px;
      // height: 260px;
      // background-color: rgba(0, 100, 0);
      display: flex;
      flex-direction: column;
      padding: 20px;
      // background: rgb(250, 250, 250);
      // box-shadow: 0 0 5px 0 @mainColor;
      background-color: #fff;
      .name{
        text-align: left;
        // margin-top: 20px;
        p,h2{
          display: inline-block;
        }
        .show{
          font-size: 22px;
          font-weight: bold;
          line-height: 30px;
          letter-spacing: 3px;
        }
        .sex{
          // border: 1px solid @secondColor;
          background-color:  @secondColor;
          font-size: 12px;
          font-weight: bolder;
          line-height: 16px;
          width: 16px;
          text-align: center;
          border-radius: 50% 50% 50% 0;
          margin-left: 5px;
          color: #f7f7f7;
        }
      }
      .base{
        margin-top: 15px;
        p{
          text-align: left;
          padding: 5px 0;
          // height: 40px;
          // font-weight: 600;
          font-size: 15px;
          label{
            font-weight: normal;
            color:#ccc;
            font-size: 15px;
          }
        }
      }
    }
    .jianli{
      .title{
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      .partContent{
        margin-top: 10px;
        .jianliContent{
          margin: 10px 0;
          text-align: left;
        }
      }
    }
    .editBase{
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  }
}
</style>
<style lang="less">
  .partContent{
    .el-textarea__inner{
      height: 300px;
    }
  }
</style>