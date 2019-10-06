<template>
  <div class="info-vol">
    <div class="left">
      <div class="jingli">
        <div class="part selfInfo">
          <div class="title">个人优势
          </div>
          <div class="partContent">{{teacher.describe}}</div>
        </div>
        <div class="part zhiwei">
          <div class="title">期望岗位
          </div>
          <div class="partContent">
            <div class="zhiweiContent" v-for="(zhiwei,idx) in teacher.zhiwei" :key="idx">
              <div>
                <span>
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{zhiwei.qiwang}}
                </span>
                <span>
                  <i class="el-icon-self-dingwei"></i>
                  <label v-for="(addr,addrIdx) in zhiwei.city" :key="addrIdx">
                    {{addr.province+addr.city+addr.county}}
                  </label>
                </span>
              </div>
            </div>
          </div>
        
        </div>
        <div class="part jiaoyu">
          <div class="title">教育经历</div>
          <div class="partContent">
            <div class="jiaoyuContent" v-for="(jiaoyu,idx) in teacher.jiaoyu" :key="idx">
              <div>
                <div class="gongsi">
                  <i class="el-icon-self-edu"></i>
                  {{jiaoyu.name}}
                  <span class="time">{{jiaoyu.start+"-"+jiaoyu.end}}</span>
                </div>
                <div class="zhiwei">
                  <span>{{jiaoyu.zhuanye}}</span>
                  <span v-if="jiaoyu.xueli">{{jiaoyu.xueli}}</span>
                </div>
                <div class="neirong">
                  <label>内容：</label><span>{{jiaoyu.neirong}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="part zhengshu">
          <div class="title">资格证书
          </div>
          <div class="partContent">
            <div>
              <div class="zhengshuContent" v-for="(zhengshu,idx) in teacher.zhengshu" :key="idx">
                  {{zhengshu}}
              </div>
            </div>
          </div>
        </div>
        <div class="part shengya">
          <div class="title">工作经历</div>
          <div class="partContent">
            <div class="jingliContent" v-for="(jingli,idx) in teacher.jingli" :key="idx">
              <div>
                <div class="gongsi">
                  <i class="el-icon-self-yingpinzhiwei"></i>
                  {{jingli.name}}
                  <span class="time">{{jingli.start+"-"+jingli.end}}</span>
                </div>
                <div class="zhiwei">
                  <span v-if="jingli.bumen">{{jingli.bumen}}</span>
                  <span>{{jingli.zhiweileixing}}</span>
                </div>
                <div class="neirong">
                  <label>内容：</label><span>{{jingli.neirong}}</span>
                </div>
                <div class="yeji" v-if="jingli.yeji">
                  <label>业绩：</label><span>{{jingli.yeji}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="part shejiao">
          <div class="title">社交主页</div>
          <div class="partContent">
            <div class="shejiaoContent" v-for="(shejiao,idx) in teacher.shejiaoList" :key="idx">
              <!-- {{webAddr}} -->
              <div>
                <p>
                  <i class="el-icon-monitor"></i>{{shejiao.value}}
                </p>
              </div>
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
          <div class="base">
            <p>
              <i class="el-icon-self-touxiang"></i>
              <label for="">当前状态:</label>
              {{teacher.status}}
            </p>
            <p>
              <i class="el-icon-self-gongzuojingyan"></i>
              <label for="">工作经验:</label>
              {{teacher.gongzuojingyan}}年
            </p>
            <p>
              <i class="el-icon-self-edu"></i>
              <label for="">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</label>
              {{teacher.education}}
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
              {{teacher.province}}{{teacher.city}}{{teacher.county}}
            </p>
          </div>
        </div>
        <div class="jianli">
          <div class="title">附件简历</div>
          <div class="partContent">
            <div class="jianliContent" v-for="(jianli,idx) in teacher.jianli" :key="idx">
              <i class="el-icon-document"></i>
              {{jianli.name}}
              <a class="edit" @click="showJianli(jianli.path)">
                <i class="el-icon-edit"></i>
                <label>查看</label>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="文章" name="first">
          <div class="main-interest">
            <essay class="half article" v-for="(index, o) in 9" :key="index"></essay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="second">
          <div class="main-interest">
            <disguss class="half" v-for="(index,o) in 5" :key="index">
            </disguss>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import teacher from '../../../components/common/teacher'
import essay from '../../../components/common/essay'
import disguss from '../../../components/common/disguss'
export default {
  name: 'info-vol',
  data() { 
    return {
      activeName:"first",
      
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
          qiwang:"数学教师",
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
          qiwang:"英语教师",
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
      }
      
    
    }
  },
  props: {

  },
  components:{
    essay,
    disguss,
  },
  created(){
    
    let _this=this
    this.teacher.zhengshu=this.teacher.zhengshu.split(";")
    _this.teacher.shejiaoList=[]
    let shejiaoList=[...this.teacher.shejiao.split("||")]
    shejiaoList.forEach((shejiao,idx)=>{
      _this.teacher.shejiaoList.push({value:shejiao,key:idx})
    })
  },
  mounted() {

  },

  methods:{
    showSchool(){
      this.$router.push("/school")
    },
    showJianli(path){
      window.open("../../../static/pdfjs/web/viewer.html?file=" + path);
    }

  },
 }
</script>

<style lang="less" scoped>
.info-vol{
  width: 70%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .left{
    width: 100%;
    display: flex;
    // background-color: #fff;
    margin-right: 20px;
    position: relative;
    .jingli{
      box-shadow: 0 0 10px 0 #eeeeff;
      // box-shadow: 0 0 10px 0 #ffecb3;
      // box-shadow: 0 0 6px 0 @mainColor;
      background-color: #fff;
      width: 60%;
      padding: 30px 30px;
      margin-right: 10px;
      .part{
        padding: 6px 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        .title{
          border-left: 5px solid coral;
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
          // span:nth-child(2){
          //   width: 300px;
          // }

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
          // border: 1px solid @mainColor;
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
          // border: 1px solid @mainColor;
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
          border: 1px solid #fba400;
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
          // background-color:  @secondColor;
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
    }
  }
  .info{
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
  
    .school{
      &:nth-of-type(1){
        border-top: 1px solid #eee;
      }
      cursor: pointer;
      border: 1px solid #eee;
      border-top: none;
      padding: 20px 0;
      // box-shadow: 0 0 10px 0 #eee;
      display: flex;

      .school-name{
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        padding: 0px 50px;
      }
      p{
        margin-left: 100px;
      }
      &:hover{
        box-shadow: 0 0 10px 0 #eee;

      }
    }
}
</style>