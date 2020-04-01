<template>
  <div class="volInfo">
    <div class="content">
      <div class="jingli">
        <div class="part zhiwei">
          <div class="title">期望岗位</div>
          <div class="partContent">
            <div class="zhiweiContent" v-for="(zhiweiInfo,idx) in zhiweiList" :key="idx">
              <div  v-if="edit.zhiwei[idx]" class="edit-zhiwei">
                <el-form ref="zhiweiEditForm" label-position="right" :model="zhiweiInfo" class="identy-form" :rules="zhiweiRules" >
                  <el-form-item class="edit-form-item" label="职位名称" prop="name">
                    <el-input v-model="zhiweiInfo.name"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item"
                  v-for="(addr,addrIdx) in 3" :key="addrIdx" :label="'期望地址'+(addrIdx+1)" :prop="'zhiweiAddr'+addrIdx">
                    <el-select v-model="zhiweiInfo.addrsList[addrIdx].province"
                        placeholder="省"
                        @change="changeExpectCity(addrIdx, zhiweiInfo.addrsList[addrIdx])">
                      <el-option
                        v-for="item in selectData.expectJob[addrIdx].province"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                    <el-select v-model="zhiweiInfo.addrsList[addrIdx].city"
                        placeholder="市"
                        @change="changeExpectCounty(addrIdx, zhiweiInfo.addrsList[addrIdx])">
                      <el-option
                        v-for="item in selectData.expectJob[addrIdx].city"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        placeholder="">
                      </el-option>
                    </el-select>
                    <el-select v-model="zhiweiInfo.addrsList[addrIdx].county"
                        placeholder="区县">
                      <el-option
                        v-for="item in selectData.expectJob[addrIdx].county"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        placeholder="">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-button class="submit-button" type="primary" @click="editExpectJob(zhiweiInfo)">提交</el-button>
                <el-button class="submit-button" type="primary" @click="editData('zhiwei',idx)">取消</el-button>
              </div>
              <div v-else class="zhiweiContent-part">
                <span class="zhiweiContent-edit">
                  <a class="edit" @click="editData('zhiwei',idx)">
                    <i class="el-icon-edit"></i>
                    <label>编辑</label>
                  </a>
                  <a class="edit" @click="deleteExpectJob(idx)">
                    <i class="el-icon-delete"></i>
                    <label >删除</label>
                  </a>
                </span>
                <span>
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{zhiweiInfo.name}}
                </span>
                <span>
                  <i class="el-icon-self-dingwei"></i>
                  <label v-for="(addr,addrIdx) in zhiweiInfo.addrNames" :key="addrIdx">
                    {{addr}}
                  </label>
                </span>
              </div>
            </div>
            <div class="zhiweiContent" v-if="edit.zhiwei.indexOf(true) < 0 && zhiweiList.length<3">
              <div class="edit-zhiwei">
              <el-form ref="zhiweiForm" label-position="right" :model="zhiwei" class="identy-form" :rules="zhiweiRules" >
                <el-form-item class="edit-form-item" label="职位名称" prop="name">
                  <el-input v-model="zhiwei.name"></el-input>
                </el-form-item>
                <el-form-item class="edit-form-item" label="期望地址1" prop="zhiweiAddr">
                  <el-select v-model="zhiwei.addr[0].province"
                      placeholder="省"
                      @change="changeExpectCity(0)">
                    <el-option
                      v-for="item in selectData.expectJob[0].province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[0].city"
                      placeholder="市"
                      @change="changeExpectCounty(0)">
                    <el-option
                      v-for="item in selectData.expectJob[0].city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[0].county"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.expectJob[0].county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="edit-form-item" label="期望地址2">
                  <el-select v-model="zhiwei.addr[1].province"
                      placeholder="省"
                      @change="changeExpectCity(1)">
                    <el-option
                      v-for="item in selectData.expectJob[1].province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[1].city"
                      placeholder="市"
                      @change="changeExpectCounty(1)">
                    <el-option
                      v-for="item in selectData.expectJob[1].city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[1].county"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.expectJob[1].county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="edit-form-item" label="期望地址3">
                  <el-select v-model="zhiwei.addr[2].province"
                      placeholder="省"
                      @change="changeExpectCity(2)">
                    <el-option
                      v-for="item in selectData.expectJob[2].province"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[2].city"
                      placeholder="市"
                      @change="changeExpectCounty(2)">
                    <el-option
                      v-for="item in selectData.expectJob[2].city"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                  <el-select v-model="zhiwei.addr[2].county"
                      placeholder="区县">
                    <el-option
                      v-for="item in selectData.expectJob[2].county"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      placeholder="">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              </div>
              <el-button class="submit-button" type="primary" @click="addExpectJob">提交</el-button>
              
            </div>
          </div>
        </div>
        <div class="part jiaoyu">
          <div class="title">教育经历</div>
          <div class="partContent">
            <div class="jiaoyuContent" v-for="(jiaoyuInfo,idx) in jiaoyuList" :key="idx">
              <div  v-if="edit.jiaoyu[idx]" class="edit-zhiwei">
                <el-form ref="jiaoyuEditForm" label-position="right" :model="jiaoyuInfo" class="identy-form" :rules="jiaoyuRules" >
                  <el-form-item class="edit-form-item" label="学校名称" prop="schoolName">
                    <el-input v-model="jiaoyuInfo.schoolName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="专业名称" prop="project">
                    <el-input v-model="jiaoyuInfo.project"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="专业学历" prop="degree">
                    <el-input v-model="jiaoyuInfo.degree"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item-date" label="就学时间" >
                    <el-date-picker
                      v-model="jiaoyuInfo.startDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期" :clearable="false">
                    </el-date-picker>
                    <span class="date-sperator">至</span>
                    <el-date-picker
                      v-model="jiaoyuInfo.endDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      @change="changeJiaoyuEndDtBak(jiaoyuInfo)" :clearable="false">
                    </el-date-picker>
                    <el-button type="text" :style="jiaoyuInfo.endDtBak=='至今'?'background-color:#134120':' '" @click="changeJiaoyuEndDt(jiaoyuInfo)">至今</el-button>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="学校经历" prop="content">
                    <el-input type="textarea" v-model="jiaoyuInfo.content"></el-input>
                  </el-form-item>
                </el-form>
                <el-button class="submit-button" type="primary" @click="editJiaoyu(jiaoyuInfo)">提交</el-button>
                <el-button class="submit-button" type="primary" @click="editData('jiaoyu',idx)">取消</el-button>
              </div>
              <div v-else class="jiaoyuContent-part">
                <span class="jiaoyuContent-edit">
                  <a class="edit" @click="editData('jiaoyu',idx)">
                    <i class="el-icon-edit"></i>
                    <label>编辑</label>
                    <!-- <label v-else>取消</label> -->
                  </a>
                  <a class="edit" @click="deleteJiaoyu(idx)">
                    <i class="el-icon-delete"></i>
                    <label >删除</label>
                  </a>
                </span>
                <div class="gongsi">
                  <i class="el-icon-self-edu"></i>
                  <label for="">{{jiaoyuInfo.schoolName}}</label>
                  <span class="time">{{jiaoyuInfo.startDt+"  --  "+(jiaoyuInfo.endDt||jiaoyuInfo.endDtBak)}}</span>
                </div>
                <div class="project">
                  <label>专业：</label>
                  <span>{{jiaoyuInfo.project}}</span>
                </div>
                <div class="degree">
                  <label>学历：</label>
                  <span >{{jiaoyuInfo.degree}}</span>
                </div>
                <div class="neirong">
                  <label>经历：</label>
                  <span>{{jiaoyuInfo.content}}</span>
                </div>
              </div>
            </div>
            <div class="jiaoyuContent" v-if="edit.jiaoyu.indexOf(true) < 0">
              <div class="edit-zhiwei">
                <el-form ref="jiaoyuForm" label-position="right" :model="jiaoyu" class="identy-form" :rules="jiaoyuRules" >
                  <el-form-item class="edit-form-item" label="学校名称" prop="schoolName">
                    <el-input v-model="jiaoyu.schoolName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="专业名称" prop="project">
                    <el-input v-model="jiaoyu.project"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="专业学历" prop="degree">
                    <el-input v-model="jiaoyu.degree"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item-date" label="就学时间" prop="range">
                    <el-date-picker
                      v-model="jiaoyu.startDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd"
                      placeholder="开始日期">
                    </el-date-picker>
                    <span class="date-sperator">至</span>
                    <el-date-picker
                      v-model="jiaoyu.endDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd"
                      placeholder="结束日期"
                      @change="changeJiaoyuEndDtBak(jiaoyu)">
                    </el-date-picker>
                    <el-button type="text" :style="jiaoyu.endDtBak=='至今'?'background-color:#134120':' '" @click="changeJiaoyuEndDt(jiaoyu)">至今</el-button>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="学校经历" prop="content">
                    <el-input type="textarea"  v-model="jiaoyu.content"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-button class="submit-button" type="primary" @click="addJiaoyu">提交</el-button>
              
            </div>
          </div>
        </div>
        <div class="part zhengshu">
          <div class="title">资格证书
            <a v-if="!zhengshuDialog" class="edit" @click="zhengshuDialog = true">
              <i class="el-icon-edit"></i>
              <label>编辑</label>
              <!-- <label v-else>取消</label> -->
            </a>
          </div>
          <div class="partContent">
            <div v-if="!zhengshuDialog">
              <el-tag
                v-for="tag in zhengshu.zhengshuList"
                :key="tag"
                type="success"
                @close="removeLicense(tag)"
                class="license-tag">
                {{tag}}
              </el-tag>
            </div>
            <template v-else>
              <div class="license-checked">
                <el-tag
                  v-for="tag in licenseChecked"
                  :key="tag"
                  closable
                  type="success"
                  @close="removeLicense(tag)"
                  class="license-tag">
                  {{tag}}
                </el-tag>
              </div>
              <el-tabs tab-position="left" class="license-list">
                <el-tab-pane class="license-main" v-for="license in licenseList" :label="license.name" :key="license.name">
                  <div class="license-item" v-for="licenseSub in license.subList">
                    <el-dropdown class="license-sub-drop" :key="licenseSub.name" v-if="licenseSub.subList.length>0"
                      @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{licenseSub.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="licenseSubSub in licenseSub.subList" 
                        :command="licenseSubSub.name" :key="licenseSubSub.name">
                          {{licenseSubSub.name}}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <div v-else class="license-sub" @click="handleCommand(licenseSub.name)">{{licenseSub.name}}</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!-- <div> -->
                <el-button type="primary" @click="addZhengshu">提交</el-button>
                <el-button type="primary" @click="zhengshuDialog = false">取消</el-button>
              <!-- </div> -->
            </template>
          </div>
        </div>
        <div class="part shengya">
          <div class="title">工作经历</div>
          <div class="partContent">
            <div class="jingliContent" v-for="(jingliInfo,idx) in jingliList" :key="idx">
              <div v-if="edit.jingli[idx]" class="edit-zhiwei">
                <el-form ref="jingliEditForm" label-position="right" :model="jingliInfo" class="identy-form" :rules="jingliRules" >
                  <el-form-item class="edit-form-item" label="公司名称" prop="companyName">
                    <el-input v-model="jingliInfo.companyName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="部门名称" prop="departName">
                    <el-input v-model="jingliInfo.departName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="职位名称" prop="jobName">
                    <el-input v-model="jingliInfo.jobName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item-date" label="工作时间" >
                    <el-date-picker
                      v-model="jingliInfo.startDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期" :clearable="false">
                    </el-date-picker>
                    <span class="date-sperator">至</span>
                    <el-date-picker
                      v-model="jingliInfo.endDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      @change="changeJingliEndDtBak(jingliInfo)" :clearable="false">
                    </el-date-picker>
                    <el-button type="text" :style="jingliInfo.endDtBak=='至今'?'background-color:#134120':' '"
                     @click="changeJingliEndDt(jingliInfo)">至今</el-button>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="工作内容" prop="task">
                    <el-input type="textarea" v-model="jingliInfo.task"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="工作业绩" prop="performance">
                    <el-input type="textarea" v-model="jingliInfo.performance"></el-input>
                  </el-form-item>
                </el-form>
                <el-button class="submit-button" type="primary" @click="editJingli(jingliInfo)">提交</el-button>
                <el-button class="submit-button" type="primary" @click="editData('jingli',idx)">取消</el-button>
              </div>
              <div v-else class="jingliContent-part">
                <span class="jingliContent-edit">
                  <a class="edit" @click="editData('jingli',idx)">
                    <i class="el-icon-edit"></i>
                    <label>编辑</label>
                    <!-- <label v-else>取消</label> -->
                  </a>
                  <a class="edit" @click="deleteJingli(idx)">
                    <i class="el-icon-delete"></i>
                    <label >删除</label>
                  </a>
                </span>
                <div class="gongsi">
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  <label>{{jingliInfo.companyName}}</label>
                  <span class="time">{{jingliInfo.startDt+"  --  "+(jingliInfo.endDt||jingliInfo.endDtBak)}}</span>
                </div>
                <div class="zhiwei">
                  <label>部门职位：</label>
                  <span>{{jingliInfo.departName+"  --  "+jingliInfo.jobName}}</span>
                  <!-- <span>{{jingliInfo.}}</span> -->
                </div>
                <div class="neirong">
                  <label>工作内容：</label><span>{{jingliInfo.task}}</span>
                </div>
                <div class="yeji">
                  <label>工作业绩：</label><span>{{jingliInfo.performance}}</span>
                </div>
              </div>
            </div>
            <div class="jingliContent" v-if="edit.jingli.indexOf(true) < 0">
              <div class="edit-zhiwei">
                <el-form ref="jingliForm" label-position="right" :model="jingli" class="identy-form" :rules="jingliRules" >
                  <el-form-item class="edit-form-item" label="公司名称" prop="companyName">
                    <el-input v-model="jingli.companyName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="部门名称" prop="departName">
                    <el-input v-model="jingli.departName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="职位名称" prop="jobName">
                    <el-input v-model="jingli.jobName"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item-date" label="工作时间" prop="range">
                    <el-date-picker
                      v-model="jingli.startDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期" :clearable="false">
                    </el-date-picker>
                    <span class="date-sperator">至</span>
                    <el-date-picker
                      v-model="jingli.endDt"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      @change="changeJingliEndDtBak(jingli)" :clearable="false">
                    </el-date-picker>
                    <el-button type="text" :style="jingli.endDtBak=='至今'?'background-color:#134120':' '"
                     @click="changeJingliEndDt(jingli)">至今</el-button>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="工作内容" prop="task">
                    <el-input type="textarea" v-model="jingli.task"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-form-item" label="工作业绩" prop="performance">
                    <el-input type="textarea" v-model="jingli.performance"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-button class="submit-button" type="primary" @click="addJingli">提交</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="other">
        <div class="self">
          <div class="name">
            <h2 class="show">{{teacher.name}}</h2>
            <a class="edit" @click="edit.baseInfo = true" v-if="!edit.baseInfo">
              <i class="el-icon-edit"></i>
              <label>编辑</label>
            </a>
          </div>
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
              <i class="el-icon-position"></i>
              <label for="">联系地址:</label>
              {{teacher.addressName}}
            </p>
          </div>
          <div v-else class="editBase">
            <el-form ref="baseForm" label-position="right" :model="teacher" class="identy-form" :rules="rules" >
              <el-form-item>
                <el-button class="submit-button" type="primary" @click="editSelfInfo">提交</el-button>
                <el-button class="submit-button" type="primary" @click="edit.baseInfo = false">取消</el-button>
              </el-form-item>
              <el-form-item prop="status">
                <label slot="label" for="">当前状态</label>
                <el-select v-model="teacher.status">
                  <el-option
                    v-for="item in selectData.status"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="education">
                <label slot="label">学历</label>
                <el-select v-model="teacher.education">
                  <el-option
                  v-for="item in selectData.education"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="phone">
                <label slot="label">联系电话</label>
                <el-input v-model="teacher.phone">
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <label slot="label">联系邮箱</label>
                <el-input v-model="teacher.email">
                </el-input>
              </el-form-item>
              <el-form-item class="addr-input">
                <label slot="label" for="">联系地址</label>
                <el-select v-model="teacher.province"
                    placeholder="省"
                    @change="changeCity">
                  <el-option
                    v-for="item in selectData.province"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select v-model="teacher.city"
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
                <el-select v-model="teacher.county"
                    placeholder="区县">
                  <el-option
                    v-for="item in selectData.county"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    placeholder="">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="password">
                <label slot="label">密码</label>
                <el-input type="password" v-model="teacher.password">
                </el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <label slot="label">确认密码</label>
                <el-input type="password" v-model="teacher.checkPass">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="jianli">
          <div class="title">
            <h3>身份认证</h3> 
            <div class="title-edit">
              <el-button type="text" icon="el-icon-edit" @click="identyFormVisible = true">申请认证</el-button>
              <el-button type="text" icon="el-icon-edit" @click="showIdentyHis">认证历史</el-button>
            </div>
          </div>
          <el-dialog title="认证历史" :visible.sync="identyHisFormVisible" top="2vh"
            width="60%" :destroy-on-close="true">
            <div class="history-info">仅处理最新认证申请</div>
            <tablePage ref="tbMain" :tableTitles="identyHisTableTitles"
              :tableData="identyHisTableData"
              :tableConf="identyHisTableConf" class="tablepage" :tableCellStyle="identyHisTableCellStyle"></tablePage>
          </el-dialog>
          <el-dialog title="申请认证" :visible.sync="identyFormVisible" top="2vh"
            width="40%" :destroy-on-close="true">
            <el-form ref="identyForm" label-position="right" :model="identyFormData" class="identy-form" :rules="rules" >
              <el-form-item class="edit-form-item" label="教资证书号" prop="applyId">
                <el-input v-model="identyFormData.applyId" ></el-input>
              </el-form-item>
              <el-form-item class="edit-form-item" label="证书有效期" prop="startDt">
                <el-date-picker
                  v-model="identyFormData.startDt"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="edit-form-item" label="相关图片" >
                <div class="image-upload">
                  <el-upload
                    action="doUpload"
                    list-type="picture-card"
                    :on-change="handleChange"
                    :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
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
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="applyVolIdenty">提交申请</el-button>
                <el-button type="primary" @click="identyFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <div class="base">
            <p>
              <i class="el-icon-s-flag"></i>
              <label for="">申请状态:</label>
              <label 
              :style="teacherIdenty.result==-1?'color:orange':teacherIdenty.result==-2?'color:red':'color:green'"> 
                {{teacherIdenty.result==-1?"认证中...":teacherIdenty.result==-2?'认证失败':"认证成功"}}
                </label>
             
            </p>
            <p>
              <i class="el-icon-postcard"></i>
              <label for="">教资证号:</label>
              {{teacherIdenty.applyId}}
            </p>
            <p>
              <i class="el-icon-date"></i>
              <label for="">证书开始日期:</label>
              {{teacherIdenty.applyStartdt}}
            </p>
            <p>
              <i class="el-icon-date"></i>
              <label for="">证书结束日期:</label>
              {{teacherIdenty.applyEnddt}}
            </p>
            <p class="upload-images">
              <i class="el-icon-picture-outline-round"></i>
              <label for="">
                <template v-if="teacherIdenty.img&&teacherIdenty.img.length>0">
                  <img class="upload-image" v-for="img in teacherIdenty.img" :src="img" alt="" />
                </template>
                <template v-else>
                  无相关照片
                </template>
              </label>
            </p>
          </div>
        </div>
        <div class="jianli">
          <div class="title">附件简历</div>
          <div class="partContent">
            <el-button @click="editData('uploadFile',-1)">
              <p v-if="!edit.uploadFile">
                <i class="el-icon-plus"></i>
                <label>上传简历</label>
              </p>
              <p v-else>
                <label>取消上传</label>
              </p>
            </el-button>
            <div class="jianliContent" v-for="(jianli,idx) in jianliList" :key="idx">
              <!-- <div class="jianliContent-part"> -->
                <label class="jianli-name" for="">
                  <i class="el-icon-document"></i>
                  {{jianli.name}}
                </label>
                <div class="jianliContent-edit">
                  <a class="edit" @click="showJianli(jianli)">
                    <i class="el-icon-edit"></i>
                    <label>查看</label>
                  </a>
                  <a class="edit" @click="deleteJianli(jianli)">
                    <i class="el-icon-delete"></i>
                    <label >删除</label>
                  </a>
                </div>
              <!-- </div> -->
            </div>
          </div>
          <uploadFile v-if="edit.uploadFile" @uploadFile="uploadFile"></uploadFile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadFile from '../../resume/uploadFile.vue'
import topNav from '../../../components/common/topNav.vue'
import tablePage from '../../../components/common/table-page.vue'
export default {
  name: 'volInfo',
  data() { 
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }else{
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test(value)){
          callback();
        }else{
          callback(new Error('邮箱格式不正确'));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(' '));
      } else if (value !== this.teacher.password) {
        this.$message.warning("密码不一致")
      } else {
        callback();
      }
    };
    var validateZhiweiAddr = (rule, value, callback) => {
      let addr = this.zhiwei.addr[0]
      if(addr.county == ""){
        this.$message.warning("请输入至少一个期望地址")
        callback(new Error(' '));
      }else{
        callback();
      }
    };
    var validateRange = (rule, value, callback) => {
      let addr = this.zhiwei.addr[0]
      let startDt = this.jiaoyu.startDt||""
      let endDt = this.jiaoyu.endDt||this.jiaoyu.endDtBak||""
      if(startDt == "" || endDt == ""){
        // this.$message.warning("请输入就学时间")
        callback(new Error(' '));
      }else{
        callback();
      }
    };
    var validateJingliRange = (rule, value, callback) => {
      let startDt = this.jingli.startDt||""
      let endDt = this.jingli.endDt||this.jingli.endDtBak||""
      if(startDt == "" || endDt == ""){
        // this.$message.warning("请输入工作时间")
        callback(new Error(' '));
      }else{
        callback();
      }
    };
    return {
      zhiweiList:[],
      zhiwei:{
        name:"",
        addr:[{province:"",city:"",county:"",address:""},
        {province:"",city:"",county:"",address:""},
        {province:"",city:"",county:"",address:""}]
      },
      jiaoyuList:[],
      jiaoyu:{},
      licenseList: [],
      firstLicense:true,
      licenseChecked:[],
      zhengshuDialog:false,
      zhengshu:{},
      jingliList:[],
      jingli:{},
      jianliList:[],
      edit:{
        baseInfo:false,
        uploadFile:false,
        zhiwei:[false,false,false],
        jiaoyu:[],
        jingli:[]
      },
      teacher:{},
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
      },
      
      rules: {
        status:[
          {required: true, message: ' '}
        ],
        education: [
          {required: true, message: ' '}
        ],
        phone: [
          {required: true, message: ' '},
        ],
        email: [
          {required: true, message: ' '},
          { validator: validateEmail, trigger: 'blur' }
        ],
        county:[
          {required: true, message: ' '}
        ],
        password: [
          {required: true, message: ' '},
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass:[
          {required: true, message: ' '},
          { validator: validatePass2, trigger: 'blur' }
        ],
        applyId: [
          {required: true, message: ' ', trigger: 'blur' }
        ],
        startDt: [
          {required: true, message: ' '},
        ],
      },
      zhiweiRules: {
        name:[
          {required: true, message: ' '}
        ],
        zhiweiAddr: [
          { validator: validateZhiweiAddr, trigger: 'blur' }
        ]
      },
      jiaoyuRules: {
        schoolName:[
          {required: true, message: ' '}
        ],
        project: [
          {required: true, message: ' '}
        ],
        degree: [
          {required: true, message: ' '}
        ],
        range: [
          { validator: validateRange, trigger: 'blur' }
        ]
      },
      jingliRules: {
        companyName:[
          {required: true, message: ' '}
        ],
        departName: [
          {required: true, message: ' '}
        ],
        jobName: [
          {required: true, message: ' '}
        ],
        range: [
          { validator: validateJingliRange, trigger: 'blur' }
        ]
      },
      // 身份认证
      identyHisFormVisible: false,
      identyHisTableTitles: [{
        prop: "applyDt",
        label: "申请日期"
      },{
        prop: "applyId",
        label: "证书号"
      },{
        prop: "applyStartdt",
        label: "证书开始日期"
      },{
        prop: "applyEnddt",
        label: "证书结束日期"
      },{
        prop: "resultName",
        label: "结果"
      },{
        prop: "describe",
        label: "备注说明"
      }],
      identyHisTableData: [],
      identyHisTableConf: {
        operation:false
      },
      identyFormVisible: false,
      identyFormData: {},
      teacherIdenty: {}
    }
  },
  props: {

  },
  components:{
    uploadFile,
    tablePage
  },
  created(){    
    this.teacher = JSON.parse(sessionStorage.getItem('user'));
    if(!this.teacher.userId){
      this.getUserInfo(this.teacher.id)
      this.getExpectJobs(this.teacher.id)
      this.getJiaoyuList(this.teacher.id)
      this.getJingliList(this.teacher.id)
      this.getZhengshuList(this.teacher.id)
      this.getJianliList(this.teacher.id)
    }else{
      this.getUserInfo()
      this.getExpectJobs()
      this.getJiaoyuList()
      this.getJingliList()
      this.getZhengshuList()
      this.getJianliList()
    }
    this.$request.selectLicense({}).then(res=>{
      this.licenseList = res.data
    })
  },
  mounted() {
  },
  methods:{
    getUserInfo(dataId=this.teacher.userId){
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
          _this.teacher.checkPass = ""
          // 获取认证信息
          _this.$request.getLastVolIdenty({volId:dataId}).then(res=>{
            if(res.data.img!="[]"){
              res.data.img = res.data.img.substr(1, res.data.img.length-2).split(",").map(url=>{
                return "/" + url.substr(url.indexOf("static"), url.length - url.indexOf("static")).replace(/\\/g, "/")
              })
            }else{
              res.data.img = []
            }
            _this.teacherIdenty = {
              ...res.data
            }
          })
          this.$request.selectAddress({level:1,pcode:0}).then(res=>{
            // // console.log(res)
            _this.selectData.province=res.data
            _this.selectData.expectJob.forEach(item=>{
              item.province=res.data
            })
          })
          this.$request.selectAddress({level:2,pcode:_this.teacher.province}).then(res=>{
            _this.selectData.city=res.data
          })
          this.$request.selectAddress({level:3,pcode:_this.teacher.city}).then(res=>{
            _this.selectData.county=res.data
          })
          _this.teacher={..._this.teacher}
          this.edit.baseInfo = false
        }
      )
    },
    getExpectJobs(dataId=this.teacher.userId){
      let _this = this
      this.edit.zhiwei = [false,false,false]
      _this.zhiweiList = []
      // 期望岗位
      _this.$request.selectExpectJobByCondition({userId:dataId}).then(
        res=>{
          if(res.data.length>0){
            res.data.forEach((item,itemIdx)=>{
              let addrsList = []
              for(let i=0;i<3;i++){
                addrsList.push({
                  province:"",
                  city:"",
                  county:"",
                })
              }
              let addrs = item.addrs.split(";")
              addrs.forEach((addr,addrIdx)=>{
                addrsList[addrIdx].province=addr.substr(0,2)
                addrsList[addrIdx].city=addr.substr(0,4)
                addrsList[addrIdx].county=addr
              })
              item.addrsList = addrsList
            })
          }
          _this.zhiweiList = res.data
        }
      )
    },
    getJiaoyuList(dataId=this.teacher.userId){
      let _this = this
      this.edit.jiaoyu = []
      _this.jiaoyuList = []
      // 教育经历
      _this.$request.selectVolEduByCondition({userId:dataId}).then(
        res=>{
          for(let i in res.data.length){
            this.edit.jiaoyu.push(false)
          }
          res.data.forEach(item=>{
            if(item.endDt == "至今"){
              item.endDt=""
              item.endDtBak="至今"
            }else{
              if(item.endDt.indexOf("-")<0){
                let year = item.endDt.substring(0,4)
                let month = item.endDt.substring(4,6)
                let day = item.endDt.substring(6,8)
                item.endDt = year +"-"+month+"-"+day
              }
            }
            // console.log(item.endDt.substr(0,4),item.endDt.substr(4,6),item.endDt.substr(6,8))
          })
          _this.jiaoyuList=[...res.data]
        }
      )
    },
    getJingliList(dataId=this.teacher.userId){
      let _this = this
      this.edit.jingli = []
      _this.jingliList = []
      // 教育经历
      _this.$request.selectExperienceByCondition({userId:dataId}).then(
        res=>{
          for(let i in res.data.length){
            this.edit.jingli.push(false)
          }
          res.data.forEach(item=>{
            if(item.endDt == "至今"){
              item.endDt=""
              item.endDtBak="至今"
            }else{
              if(item.endDt.indexOf("-")<0){
                let year = item.endDt.substring(0,4)
                let month = item.endDt.substring(4,6)
                let day = item.endDt.substring(6,8)
                item.endDt = year +"-"+month+"-"+day
              }
            }
            // console.log(item.endDt.substr(0,4),item.endDt.substr(4,6),item.endDt.substr(6,8))
          })
          _this.jingliList=[...res.data]
        }
      )
    },
    getZhengshuList(dataId=this.teacher.userId){
      let _this = this
      this.zhengshu = {}
      this.zhengshuDialog = false
      // 资格证书
      _this.$request.selectCertificateByCondition({userId:dataId}).then(
        res=>{
          if(res.data.length>0){
            _this.zhengshu = {...res.data[0]}
            _this.zhengshu.zhengshuList=(res.data[0].name||"").split(",")
            _this.licenseChecked = [..._this.zhengshu.zhengshuList]
          }
        }
      )
    },
    getJianliList(dataId=this.teacher.userId){
      let _this = this
      this.zhengshu = {}
      this.zhengshuDialog = false
      // 简历文件
      this.$request.selectFileByCondition({userId:dataId}).then(
        res=>{
          _this.jianliList=[...res.data]
        }
      )
    },
    // 修改个人信息
    editSelfInfo(){
      this.$refs.baseForm.validate(valid=>{
        if(valid){
          this.teacher.address = this.teacher.county||this.teacher.city||this.teacher.province||""
          this.$request.editVolunteer(this.teacher).then(res=>{
            this.getUserInfo()
          })
        }
        else{
          return false
        }
      })
    },
    // 认证历史
    showIdentyHis(){
      this.$request.getVolIdenty({volId:this.teacher.userId}).then(res=>{
        this.identyHisTableData = res.data.map((item,idx)=>{
          switch(item.result){
            case -1:
              if(idx==0){
                item.resultName = "认证中"
              }else{
                item.resultName = "过期"
              }
              break;
            case 0:
              item.resultName = "认证失败"
              break;
            case 2:
              item.resultName = "认证成功"
              break;
          }
          return item
        })
        this.identyHisFormVisible = true
      })

    },
    // 删除文件
    handleRemove(file) {
      let fileList = this.identyFormData.image
      fileList.splice(fileList.indexOf(file), 1)
      this.identyFormData.image = fileList
    },
    handleChange(file, fileList) {
      this.identyFormData.image = fileList
      if(fileList.length > 2){
        this.$message.warning("最多选择两张照片")
        fileList.splice(fileList.length-1, 1)
      }
    },
    // 申请认证
    applyVolIdenty(){
      this.$refs.identyForm.validate(valid => {
        if(valid){
          let image = (this.identyFormData.image||[]).map(item=>item.raw)
          let formData = new FormData();
          image.forEach(item=>{formData.append('image', item)})
          formData.append("volId", this.teacher.userId)
          formData.append("applyStartdt", this.identyFormData.startDt[0].replace(/-/g, ""))
          formData.append("applyEnddt", this.identyFormData.startDt[1].replace(/-/g, ""))
          formData.append("applyId", this.identyFormData.applyId)
          formData.append("frontPath", this.$rootPath)
          
          this.$request.appplyVolIdenty(formData).then(
            res=>{
              this.getUserInfo()
              this.identyFormVisible = false
            }
          )
          
        }else{
          return false
        }
      })
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
    changeExpectCity(addrIdx, zhiweiInfoAddr={}){
      let _this=this
      _this.selectData.expectJob[addrIdx].city=[]
      _this.selectData.expectJob[addrIdx].county=[]
      if(zhiweiInfoAddr.province){
        zhiweiInfoAddr.city=""
        zhiweiInfoAddr.county=""
        this.$request.selectAddress({level:2,pcode:zhiweiInfoAddr.province}).then(res=>{
          _this.selectData.expectJob[addrIdx].city=res.data
        })
      }else{
        _this.zhiwei.addr[addrIdx].city=""
        _this.zhiwei.addr[addrIdx].county=""
        this.$request.selectAddress({level:2,pcode:_this.zhiwei.addr[addrIdx].province}).then(res=>{
          _this.selectData.expectJob[addrIdx].city=res.data
        })
      }

    },
    changeExpectCounty(addrIdx, zhiweiInfoAddr={}){
      let _this=this
      _this.selectData.expectJob[addrIdx].county=[]
      if(zhiweiInfoAddr.province){
        zhiweiInfoAddr.county=""
        this.$request.selectAddress({level:3,pcode:zhiweiInfoAddr.city}).then(res=>{
          _this.selectData.expectJob[addrIdx].county=res.data
        })
      }else{
        _this.zhiwei.addr[addrIdx].county=""
        this.$request.selectAddress({level:3,pcode:_this.zhiwei.addr[addrIdx].city}).then(res=>{
          _this.selectData.expectJob[addrIdx].county=res.data
        })
      }

    },
    editData(field,id){
      let _this = this
      let edit={...this.edit}
      if(id==-1){
        edit[field]=!edit[field]
      }
      else{
        let editArr=[...edit[field]]
        editArr[id] = !editArr[id]
        for(let i=0;i<editArr.length;i++){
          if(i!=id){
            editArr[i] = false
          }
        }
        editArr.forEach((item,idx)=>{
        })
        edit[field]=[...editArr]
        switch(field){
          case "zhiwei":
            let addrsList = _this.zhiweiList[id].addrsList
            addrsList.forEach((addr,idx)=>{
              let jobAddr = _this.selectData.expectJob[idx]
              if(addr.province){
                this.$request.selectAddress({level:1,pcode:0}).then(provinceRes=>{
                  jobAddr.province=[...provinceRes.data]
                })
              }
              if(addr.city){
                this.$request.selectAddress({level:2,pcode:addr.province}).then(provinceRes=>{
                  jobAddr.city=[...provinceRes.data]
                })
              }
              if(addr.county){
                this.$request.selectAddress({level:3,pcode:addr.city}).then(provinceRes=>{
                  jobAddr.county=[...provinceRes.data]
                })
              }
            })
            break;
        }
        // // console.log(this.edit[field])
      }
      this.edit={...edit}
    },
    showJianli(jianli){
      let path = jianli.filepath
      path = path.split("static")
      console.log(path)
      // let path="../../../../static/files/"+jianli.name
      window.open("../../../../static/pdfjs/web/viewer.html?file=/static" + path[1]);
    },
    // 期望岗位
    addExpectJob(){
      let _this=this
      this.$refs.zhiweiForm.validate(valid=>{
        if(valid){
          let zhiwei = _this.zhiwei
          let addrs=""
          zhiwei.addr.forEach(a=>{
            if(a.county!=""){
              addrs+=a.county+";"
            }
          })
          let param={
            name:zhiwei.name,
            addrs:addrs.substr(0,addrs.length-2),
            userId:this.teacher.userId
          }
          this.$request.insertExpectJob(param).then(
            res=>{
              this.getExpectJobs()
              this.zhiwei={
                name:"",
                addr:[{province:"",city:"",county:"",address:""},
                {province:"",city:"",county:"",address:""},
                {province:"",city:"",county:"",address:""}]
              }
              this.$refs.zhiweiForm.resetFields()
            }
          )
        }else{
          return false
        }
      })
      // // console.log(param)
      // _this.editData("zhiwei",id)
    },
    deleteExpectJob(idx){
      let _this=this
      let id = _this.zhiweiList[idx].id
      // console.log(_this.zhiweiList[idx])
      this.$request.deleteExpectJob({id}).then(
        res=>{
          this.getExpectJobs()
        }
      )
    },
    editExpectJob(zhiwei){
      this.$refs.zhiweiEditForm[0].validate(valid=>{
        if(valid){
          let addrs=""
          zhiwei.addrsList.forEach(addr=>{
            addrs+=addr.county+";"
          })
          zhiwei.addrs=addrs.substr(0,addrs.length-2)
          this.$request.updateExpectJob(zhiwei).then(
            res=>{
              this.getExpectJobs()
            }
          )
        }
        else{
          return false
        }
      })
    },
    // 教育经历
    addJiaoyu(){
      let _this=this
      this.$refs.jiaoyuForm.validate(valid=>{
        if(valid){
          // // console.log(this.jiaoyu)
          let jiaoyu=this.jiaoyu
          let param={
            schoolName:jiaoyu.schoolName,
            project:jiaoyu.project,
            degree:jiaoyu.degree,
            startDt:jiaoyu.startDt.replace(/-/g,""),
            endDt:(jiaoyu.endDtBak||jiaoyu.endDt).replace(/-/g,""),
            content:jiaoyu.content||"",
            userId:_this.teacher.userId
          }
          _this.$request.insertVolEdu(param).then(
            res=>{
              this.getJiaoyuList()
              this.$refs.jiaoyuForm.resetFields()
              this.jiaoyu = {}
            }
          )
        }else{
          return false
        }
      })
    },
    deleteJiaoyu(idx){
      let _this=this
      // // console.log(_this.teacher.jiaoyu[idx])
      let id = _this.jiaoyuList[idx].id
      this.$request.deleteVolEdu({id}).then(
        res=>{
          this.getJiaoyuList()

      })
    },
    changeJiaoyuEndDt(jiaoyu = this.jiaoyu){
      if(jiaoyu.id){
        jiaoyu.endDtBak = jiaoyu.endDt=="至今"?jiaoyu.endDt:""
      }else{
        if(jiaoyu.endDtBak=="至今"){
          jiaoyu.endDtBak = ""
        }else{
          this.$set(jiaoyu,"endDt","")
          this.$set(jiaoyu,"endDtBak","至今")
        }
      }
    },
    changeJiaoyuEndDtBak(jiaoyu = this.jiaoyu){
      this.$set(jiaoyu,"endDtBak","")
    },
    editJiaoyu(jiaoyuInfo){
      let _this = this
      this.$refs.jiaoyuEditForm[0].validate(valid=>{
        if(valid){
          let jiaoyu={...jiaoyuInfo}
          let param={
            id:jiaoyu.id,
            schoolName:jiaoyu.schoolName,
            project:jiaoyu.project,
            degree:jiaoyu.degree,
            startDt:jiaoyu.startDt.replace(/-/g,""),
            endDt:jiaoyu.endDtBak||jiaoyu.endDt,
            content:jiaoyu.content||""
          }
          _this.$request.updateVolEdu(param).then(
            res=>{
              this.getJiaoyuList()
            }
          )
        }
        else{
          return false
        }
      })

    },
    // 资格证书
    addZhengshu(){
      let _this=this
      let formData = new FormData();
      formData.append("name", _this.licenseChecked.join(","))
      formData.append("userId", _this.teacher.userId)
      if(!this.zhengshu.id){
        _this.$request.insertCertificate(formData).then(
          res=>{
            _this.getZhengshuList()
            // _this.zhengshu.zhengshuList=_this.licenseChecked
          }
        )
      }else{
        formData.append("id", this.zhengshu.id)
        _this.$request.updateCertificate(formData).then(
          res=>{
            _this.getZhengshuList()
            // _this.zhengshu.zhengshuList=_this.licenseChecked
          }
        )

      }
    },
    // 工作经历
    addJingli(){
      let _this=this
      this.$refs.jingliForm.validate(valid=>{
        if(valid){
          // // console.log(this.jiaoyu)
          let jingli=_this.jingli
          let param={
            companyName:jingli.companyName,
            startDt:jingli.startDt.replace(/-/g,""),
            endDt:(jingli.endDtBak||jingli.endDt).replace(/-/g,""),
            departName:jingli.departName,
            jobName:jingli.jobName,
            task:jingli.task||"",
            performance:jingli.performance||"",
            userId:_this.teacher.userId
          }
          _this.$request.insertExperience(param).then(
            res=>{
              this.getJingliList()
              this.$refs.jingliForm.resetFields()
              this.jingli = {}
            }
          )
        }else{
          return false
        }
      })
      // console.log(_this.jingli)
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
    changeJingliEndDt(jingli = this.jingli){
      if(jingli.id){
        jingli.endDtBak = jingli.endDt=="至今"?jingli.endDt:""
      }else{
        if(jingli.endDtBak=="至今"){
          jingli.endDtBak = ""
        }else{
          this.$set(jingli,"endDt","")
          this.$set(jingli,"endDtBak","至今")
        }
      }
    },
    changeJingliEndDtBak(jingli = this.jingli){
      this.$set(jingli,"endDtBak","")
    },
    editJingli(jingliInfo){
      let _this = this
      this.$refs.jingliEditForm[0].validate(valid=>{
        if(valid){
          let jingli={...jingliInfo}
          let param={
            id:jingli.id,
            companyName:jingli.companyName,
            startDt:jingli.startDt.replace(/-/g,""),
            endDt:(jingli.endDtBak||jingli.endDt).replace(/-/g,""),
            departName:jingli.departName,
            jobName:jingli.jobName,
            task:jingli.task||"",
            performance:jingli.performance||""
          }
          _this.$request.updateExperience(param).then(
            res=>{
              this.getJingliList()
            }
          )
        }
        else{
          return false
        }
      })

    },
    uploadFile(files,fileName){
      let _this=this
      let fileFormData = new FormData();
      // console.log(files, fileName,this.teacher.userId)
      fileFormData.append('file', files, fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      fileFormData.append('userId', this.teacher.userId);
      fileFormData.append('frontPath', this.$rootPath);
      this.$request.uploadFile(fileFormData).then(
        res=>{
          // console.log(res)
          this.getJianliList()
          _this.$message.success('上传成功')
          _this.editData('uploadFile',-1)
        }
      )
    },
    deleteJianli(jianli){
      let _this=this
      let id = jianli.id

      _this.$request.deleteFileById({id}).then(
        res=>{
          this.getJianliList()
          _this.$message.success('删除成功')

        }
      )

    },
    // 申请历史
    identyHisTableCellStyle(row){
      if(row.column.property == "resultName")
      switch(row.row.result){
        case -1:
          if(row.rowIndex==0){
            return "color:orange;"
          }else{
            return "color:#ccc;"
          }
        case 0:
          return "color:red;"
        case 2:
          return "color:green;"
      }
    },
    handleCommand(command) {
      if(this.licenseChecked.indexOf(command)<0){
        this.licenseChecked.splice(0,0,command)
      }
    },
    removeLicense(tag){
      let licenseAfter=[]
      this.licenseChecked.forEach(item=>{
        if(item!=tag){
          licenseAfter.push(item)
        }
      })
      this.licenseChecked = licenseAfter
    }
  },
 }
</script>

<style lang="less" scoped>
@import '../../../../static/css/main';
.volInfo{
  margin-top: 1vh;
  margin-bottom: 1vh;
  .content{
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    .jingli{
      box-shadow: 0 0 6px 0 @sixthColor;
      background-color: #fff;
      width: 56%;
      padding: 3vh 3vw;
      margin-right: 1vw;
      .part{
        padding: 1vh 2vw;
        margin-bottom: 2vh;
        border-bottom: 1px solid #eee;
        .title{
          border-left: 0.3vw solid @secondColor;
          text-align: left;
          padding-left: 1vw;
          font-size: 2.3vh;
          font-weight: 500;
        }
        .partContent{
          // background-color: #aaa;
          margin: 1vh 0;
          // margin-bottom: 10px;
          text-align: left;
          font-size: 1.8vh;
          line-height: 1;
          // letter-spacing: 1px;
          color: @mainColor;
        }
      }
      .zhiwei{
        // height: 100px;
        .zhiweiContent{
          display: flex;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .zhiweiContent-part{
            padding: 1vh;
            position: relative;
            width: 100%;
            span{
              display: block;
              margin-right: 1vw;
              font-size: 1.8vh;
              line-height: 1.8;
            }
            .zhiweiContent-edit{
              position: absolute;
              left: 70%;
              width: 100%;
              display: none;
              a label{
                cursor: pointer;
              }
              a.edit{
                display: inline-block;
                // opacity: 0;
                font-size: 1.6vh;
                cursor: pointer;
                margin-left: 2vw;
                color: #aaa;
                &:hover{
                  color: coral;
                }
                vertical-align: middle;
              }
            }

          }
          &:hover{
            // border: 1px solid coral;
            box-shadow: 0 0 2px 0 #ccc;
            .zhiweiContent-edit{
              display: block;
            }
          }
          
          .submit-button{
            margin-left: 2vw;
            font-size: 2vh;
          }
          .edit-zhiwei{
            padding: 1vh;
          }
        }
      }
      .shengya{
        .jingliContent{
          display: flex;
          position: relative;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .jingliContent-part{
            padding: 1vh;
            width: 100%;
            .jingliContent-edit{
              position: absolute;
              left: 70%;
              width: 100%;
              top: 5%;
              display: none;
              a label{
                cursor: pointer;
              }
              a.edit{
                display: inline-block;
                // opacity: 0;
                font-size: 1.6vh;
                cursor: pointer;
                margin-left: 2vw;
                color: #aaa;
                &:hover{
                  color: coral;
                }
                vertical-align: middle;
              }
            }
            .gongsi,.zhiwei,.neirong,.yeji{
              padding: 1vh;
              font-size: 1.7vh;
              width: 100%;
              display: flex;
              label{
                width: 4vw;
                font-size: 1.5vh;
                color: #ccc;
                line-height: 1.5;
                vertical-align: middle;
              }
              span{
                // flex: 1;
                width: 85%;
                font-size: 1.9vh;
                word-wrap:break-word;
              }
            }
            .gongsi{
              font-weight: bold;
              label{
                margin-left: 0.3vw;
                font-size: 2.2vh;
                color: @mainColor;
                line-height: 1;
                width: auto;
              }
              .time{
                display: inline-block;
                font-size: 1.4vh;
                margin-left: 1vw;
                font-weight: normal;
                color:#999;
                line-height: 1.5;
                width: 20%;
              }
            }
            .neirong,.yeji{
              font-size: 2vh;
              label{
                font-weight: bold;
              }
              span{
                display: block;
                line-height: 1.2;
                width: 80%;
              }
            }
          }
          
          &:hover{
            // border: 1px solid coral;
            box-shadow: 0 0 2px 0 #ccc;
            .jingliContent-edit{
              display: block;
            }
          }
          
          .submit-button{
            margin-left: 2vw;
            font-size: 2vh;
          }
          .edit-zhiwei{
            padding: 1vh;
          }
        }
      }
      .jiaoyu{
        .jiaoyuContent{
          display: flex;
          position: relative;
          border: 1px solid transparent;
          &:first-of-type{
            margin-top: 0;
          }
          .jiaoyuContent-part{
            padding: 1vh;
            vertical-align: middle;
            .jiaoyuContent-edit{
              position: absolute;
              left: 70%;
              width: 100%;
              top: 5%;
              display: none;
              a label{
                cursor: pointer;
              }
              a.edit{
                display: inline-block;
                // opacity: 0;
                font-size: 1.6vh;
                cursor: pointer;
                margin-left: 2vw;
                color: #aaa;
                &:hover{
                  color: coral;
                }
              }
            }
            .gongsi,.project,.degree,.neirong{
              padding: 1vh;
              font-size: 1.7vh;
              display: flex;
              label{
                width: 3vw;
                font-size: 1.5vh;
                color: #ccc;
                line-height: 1.5;
                vertical-align: middle;
              }
              span{
                flex: 1;
                width: 80%;
                font-size: 1.9vh;
                word-wrap:break-word;
              }
            }
            .gongsi{
              font-weight: bold;
              label{
                margin-left: 0.3vw;
                font-size: 2.2vh;
                color: @mainColor;
                line-height: 1;
                width: auto;
              }
              .time{
                display: inline-block;
                font-size: 1.4vh;
                margin-left: 1vw;
                font-weight: normal;
                color:#999;
                line-height: 1.5;
              }
            }
            .neirong{
              font-size: 2vh;
              label{
                font-weight: bold;
              }
              span{
                line-height: 1.2;
              }
            }
          }
          &:hover{
            // border: 1px solid coral;
            box-shadow: 0 0 2px 0 #ccc;
            .jiaoyuContent-edit{
              display: block;
            }
          }
          
          .submit-button{
            margin-left: 2vw;
            font-size: 2vh;
          }
          .edit-zhiwei{
            padding: 1vh;
          }
        }
      }
      .zhengshu{
        a label{
          cursor: pointer;
        }
        a.edit{
          display: none;
          // opacity: 0;
          font-size: 1.6vh;
          cursor: pointer;
          margin-left: 2vw;
          color: #aaa;
          &:hover{
            color: coral;
          }
          vertical-align: middle;
        }
        &:hover{
          a.edit{
            opacity: 1;
            display: inline-block;
          }
        }
      }
      .license-checked{
        display: flex;
        overflow-x: auto;
        height: 6vh;
        &::-webkit-scrollbar-track {
          background-color: @sixthColor;
        }
        &::-webkit-scrollbar {
          width: 0.2vw;
          height: 0.2vw;
        }
        &::-webkit-scrollbar-thumb {
          background-color: @thirthColor;
        }
      }
      .license-tag{
        margin-left: 0.2vw;
        margin-bottom: 0.2vw;
      }
      .license-list{
        box-shadow: 0 0 6px 0 @sixthColor;
        height: 100%;
        margin-bottom: 1vh;
        padding-bottom: 2vh;
        .el-tabs__nav-prev .is-disabled{
          background-color: @sixthColor;
        }
      }
      .license-main{
        display: flex;
        flex-wrap: wrap;
        margin-left: 2vw;
        margin-top: 2vh;
        min-height: 65vh;
        max-height: 65vh;
        // overflow: auto;
        overflow-y: auto;
        &::-webkit-scrollbar-track {
          background-color: @sixthColor;
        }
        &::-webkit-scrollbar {
          width: 0.2vw;
        }
        &::-webkit-scrollbar-thumb {
          background-color: @thirthColor;
        }
        .license-item{
          width: 21vw;
          height: 7vh;
          font-size: 1.7vh;
          .license-sub{
            cursor: pointer;
            &:hover{
              font-size: 1.8vh;
            }
          }
        }
      }
    }
    .self,.jianli{
      box-shadow: 0 0 6px 0 @sixthColor;
      margin-bottom: 2vh;
      display: flex;
      flex-direction: column;
      padding: 2vh 3vh;
      background-color: #fff;
      a label{
        cursor: pointer;
      }
      a.edit{
        display: none;
        // opacity: 0;
        font-size: 1.7vh;
        cursor: pointer;
        margin-left: 3vw;
        color: #aaa;
        &:hover{
          color: coral;
        }
      }
      &:hover{
        a.edit{
          display: inline-block;
        }
      }
      
      .submit-button{
        height: 4vh;
        line-height: 4vh;
        font-size: 1.7vh;
        padding: 0 2vw;
      }
      .name{
        text-align: left;
        // margin-top: 20px;
        p,h2{
          display: inline-block;
        }
        .show{
          font-size: 3vh;
          font-weight: bold;
          line-height: 1;
          letter-spacing: 3px;
        }
      }
      .base{
        margin-top: 2vh;
        p{
          text-align: left;
          padding: 0.4vw 0;
          // height: 40px;
          // font-weight: 600;
          font-size: 1.8vh;
          label{
            color:#ccc;
            font-size: 1.7vh;
          }
        }
      }
    }
    .self{
      padding: 4vh 3vh;
    }
    .jianli{
      .title{
        border-left: 0.3vw solid @secondColor;
        text-align: left;
        padding-left: 1vw;
        font-size: 2.3vh;
        font-weight: 500;
        display: flex;
        .title-edit{
          opacity: 0;
        }
      }
      &:hover{
        .title-edit{
          opacity: 1;
        }
      }
      .partContent{
        margin-top: 2vh;
        .jianliContent{
          position: relative;
          margin: 1vh 0;
          text-align: left;
          label.jianli-name{
            width: 10vw;
            display: block;
            font-size: 1.7vh;
          }
          .jianliContent-edit{
            position: absolute;
            left: 70%;
            top:0;
            display: none;
            // width: 100%;
            a label{
              cursor: pointer;
            }
            a.edit{
              display: inline-block;
              // opacity: 0;
              font-size: 1.6vh;
              cursor: pointer;
              margin-left: 2vw;
              color: #aaa;
              &:hover{
                color: coral;
              }
              vertical-align: middle;
            }
          }
          &:hover{
            .jianliContent-edit{
              display: inline-block;
            }
          }
        }
      }
    }
  }
  
  .tablepage{
    width: 90%;
    // height: 70vh;
  }
  .upload-images{
    display: flex;
    width: auto;
    label{
      margin-left: 1vw;
      display: flex;
      flex-direction: column;
      display: inline-block;
      width: 10vw;
    }
    .upload-image{
      width: 70%;
      height: auto;
      margin-right: 1vw;
      margin-bottom: 1vw;
      border: 1px solid @sixthColor;
    }
  }
}
</style>
<style lang="less">
@import '../../../../static/css/main';
.volInfo{
  .partContent{
    .el-textarea__inner{
      height: 300px;
    }
  }
  
  .el-form-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.3vh;
    .el-form-item__label{
      width: 5vw;
      text-align: right;
      height: 6vh;
      font-size: 1.6vh;
      padding: 0 0.5vw 0 0;
    }
    .el-form-item__error{
      position: absolute;
      font-size: 1.2vh;
      width: 50%;
      top: 30%;
      right: 1vw;
      text-align: right;
    }
    .el-input,.el-select{
      flex: 1;
      height: 5vh;
      line-height: 5vh;
      font-size: inherit;
      .el-input__inner{
        height: 5vh;
        line-height: 5vh;
        font-size: 1.6vh;
        padding: 0 1vw;
        border-color: @sixthColor;
      }
      .el-input__suffix{
        right: 0.3vw;

      }
    }
    .el-select .el-input .el-select__caret{
      font-size: 1.5vh;
      width: 2vh;
      height: 2vh;
      line-height: 2vh;
    }
    .el-button{
      width: 100%;
      height: inherit;
      line-height: inherit;
      font-size: inherit;
      padding: 0;
      background-color: @thirthColor;
      border: none;
      letter-spacing: 1px;
      &:hover{
        background-color: @secondColor;
      }
    }
    .el-form-item__content{
      flex: 1;
      display: flex;
      .el-input{
        width: 100%;
      }
    }
  }
  .el-form-item.is-error{
    .el-input__inner{
      border:0.1vh solid red;
    }
  }
  .el-form-item.addr-input{
    .el-input__inner{
      height: 5vh;
      line-height: 5vh;
      font-size: 1.6vh;
      border-color: @sixthColor;
    }

  }
  .edit-form-item-date{
    .el-form-item__content{
      display: flex;
      align-items: center;
      justify-content: center;
      .el-date-editor{
        font-size: 1.8vh;
        width: 35%;
        .el-input__inner{
          padding: 1vh 0 1vh 3vw;
          width: 100%;
        }
        .el-input__prefix,.el-input__suffix-inner{
          left: 0.6vw;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .el-input__icon{
          font-size: 2vh;
          width: 2vw;
          height: 2vw;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-input__validateIcon.el-icon-circle-close{
          display: none;
        }
      }
      .date-sperator{
        display: inline-block;
        width: 2vw;
        text-align: center;
      }
      .el-button--text{
        font-size: 1.7vh;
        width: 5vw;
        background-color: @fifthColor;
        color: #fff;
        border: 0.1vh solid @sixthColor;
        padding: 1.5vh;
        line-height: 1;
        &:hover{
          background: none;
          color: @fourthColor;
        }
      }
    }
  }
  .editBase{
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 20vw;
    font-size: 1.6vh;
    padding: 0 1vw 0 0;
  }
  .jianli{
    .title{
      h3{
        font-size: 2.3vh;
        font-weight: 500;
      }
      .el-button{
        font-size: 1.7vh;
        cursor: pointer;
        margin-left: 1vw;
        padding: 0;
        color: #aaa;
        &:hover{
          color: coral;
        }

      }
    }
    .el-form{
      width: 80%;
      .el-form-item{
        margin-bottom: 2.3vh;
        font-size: 2vh;
        line-height: 6vh;
        // height: 6vh;
        display: flex;
        .el-form-item__label{
          text-align: right;
          width: 8vw;
          height: 6vh;
          line-height: inherit;
          font-size: 1.6vh;
          padding: 0 1vw 0 0;
        }
        .el-form-item__content{
          flex: 1;
          // height: inherit;
          line-height: inherit;
          font-size: inherit;
          display: flex;
          label{
            font-size: 1.8vh;
          }
          .el-date-editor .el-range__icon,.el-date-editor .el-range__close-icon{
            font-size: 2vh;
            margin-left: 0;
            color: #C0C4CC;
            float: left;
            line-height: 2;
            width: 3vw;
          }
          .el-date-editor .el-range-input, .el-date-editor .el-range-separator{
            font-size: 2vh;
            padding: 0;
            line-height: 2;
          }
          .el-date-editor .el-range-input{
            font-size: 1.8vh;
            width: 35%;
          }
          .el-date-editor .el-range-separator{
            width: 9%;
          }
          .el-range-editor.el-input__inner{
            padding: 1vh 0 1vh 1vw;
            width: 100%;
          }
          .el-input{
            height: inherit;
            line-height: inherit;
            font-size: inherit;
            .el-input__inner{
              height: inherit;
              line-height: 2.7;
              font-size: inherit;
              padding: 0 1vw;
              border-color: @sixthColor;
            }
          }
          .el-button{
            width: 100%;
            height: inherit;
            line-height: inherit;
            font-size: inherit;
            padding: 0;
            background-color: @thirthColor;
            border: none;
            letter-spacing: 1px;
            &:hover{
              background-color: @secondColor;
            }
          }
          .el-form-item__error{
            font-size: 1.4vh;
            width: 100%;
            text-align: right;
          }
          .el-upload--picture-card {
            border-radius: 2px;
            width: 6vw;
            height: 6vw;
            line-height: 6vw;
            i{
              font-size: 3vh;
            }
          }
          .el-upload-list--picture-card .el-upload-list__item{
            border-radius: 2px;
            width: 6vw;
            height: 6vw;
            margin: 0 1vw 0 0;
            border-color: @sixthColor;
          }
        }
      }
      .el-form-item.is-error{
        .el-input__inner{
          border:0.1vh solid red !important;
        }
      }
    }
    .el-dialog__title {
      line-height: 1;
      font-size: 3vh;
      font-weight: bolder;
    }
    .el-dialog__body{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1vh 1vw;
      .history-info{
        margin-bottom: 1vh;
        font-size: 1.6vh;
      }
    }
  }
  .el-dialog__title {
    line-height: 1;
    font-size: 3vh;
    font-weight: bolder;
  }
  .el-dialog__body {
    padding: 1vh 1vw;
  }
  .el-dialog__footer{
    padding: 1vh 1vw 2vh;
    .el-button{
      padding: 1.4vh 2vw;
      font-size: 2vh;
      background-color: @mainColor;
      border: 0.1vh solid @mainColor;
      color: #fff;
      &:hover{
        background: none;
        color: @mainColor;
      }
    }
  }
  .license-list{
    position: relative;
    .el-tabs__header{
      width: 8vw;
      min-height: 65vh;
      max-height: 65vh;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar-track {
        background-color: @sixthColor;
      }
      &::-webkit-scrollbar {
        width: 0.2vw;
      }
      &::-webkit-scrollbar-thumb {
        background-color: @thirthColor;
      }
      .el-tabs__item{
        padding: 0 1vw;
        height: 5vh;
        font-size: 2vh;
        line-height: 5vh;
      }
      .el-tabs__item.is-active{
        background-color: @sixthColor;
      }
      .el-tabs__active-bar{
        display: none;
      }
    }
    .el-dropdown{
      font-size: 1.8vh;
    }
    .el-tabs__nav-prev,.el-tabs__nav-next{
      background-color: @sixthColor;
      color: @secondColor;
    }
  }
}
</style>