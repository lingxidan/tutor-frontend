<template>
  <div class="detail-school">
    <div class="school-info">
      <div class="name">{{school.name}}</div>
      <div class="info">
        <div class="base-info">
          <p><label for="">学校地址:</label>{{school.addressName}}</p>
          <p><label for="">科目等级:</label>{{school.education}}</p>
          <p><label for="">成立时间:</label>{{school.establishDt}}</p>
          <div class="base-image" id="image" ref="image">
            <div class="image" v-for="image in school.image">
              <img :src="image" alt="">
            </div>
            <!-- <div class="next" v-if="school.image.length>0"></div> -->
          </div>
        </div>
        <div class="content">
          <label for="">学校简介:</label>
          <div class="content-content" v-cloak>{{school.descr}}</div>
        </div>
      </div>
    </div>
    <div class="zhiwei-recr">
      <div class="zhiwei">
        <div class="name">招聘职位</div>
        <zhiweiPart v-for="(teacher,index) in zhiwei" :key="index"
        :teacher="teacher"></zhiweiPart>
      </div>
    </div>
  </div>
</template>

<script>
import zhiweiPart from '../../components/common/teacher.vue'
export default {
  name: 'detail-school',
  data() { 
    return {
      school:{},
      zhiwei:[],
      recruiter:{},
      user:{},
      interestList:[],
      interest:{}
    }
  },
  props: {

  },
  components:{
    zhiweiPart
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'))||{};
    let schoolId=this.$route.query.id
    let _this=this
    this.$request.selectSchoolById({schoolId}).then(
      res=>{
        _this.$request.selectJobByCondition({schoolId}).then(
          res=>{
            _this.zhiwei=res.data
          }
        )
        if(res.data.imgs!="[]"){
          res.data.image = res.data.imgs
            .substr(1, res.data.imgs.length - 2)
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
        }else{
          res.data.image=[]
        }
        if(res.data.image.length>0){
          
          let timer=setInterval(()=>{
            if(this.$refs.image){
              let image = this.$refs.image
              image.scrollLeft+=2
              if(image.scrollWidth==image.offsetWidth+image.scrollLeft){
                clearInterval(timer)
              }
            }
          },300)
        }
        _this.school=res.data
      }
    )

  },
  mounted() {
    let timer=setInterval(()=>{
      if(this.$refs.image){
        let image = this.$refs.image
        image.scrollLeft+=2
        if(image.scrollWidth==image.offsetWidth+image.scrollLeft){
          clearInterval(timer)
        }
      }
    },300)
  },
  methods:{
  },
 }
</script>

<style lang="less" scoped>
@import "../../../static/css/main";
.detail-school{
  position: relative;
  // margin: 20px 100px;
  // width: 70%;
  margin: 2vh auto;
  // background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .school-info{
    width: 80%;
    height: 70vh;
    background: linear-gradient(60deg, @secondColor 33.3%, @thirthColor 0,@thirthColor 67%,@fifthColor 0); 
    color: white;
    .name{
      // padding: 1vh 0 1vh 0;
      font-size: 4vh;
      font-weight: 900;
      height: 8vh;
      line-height: 8vh;
      border-bottom: #fafafa 5px solid;
    }
    .info{
      padding: 1vh 2vw 1vh 4vw;
      text-align: left;
      display: flex;
      p{
        font-size: 2.3vh;
      }
      label{
        font-size: 1.7vh;
        margin-right: 2vw;
        color: #eee;
      }
      display: flex;
      .base-info {
        width: 30%;
        color: #fff;
        display: flex;
        flex-direction: column;
        p{
          margin-top: 0.5vh;
        }
        .base-image{
          flex: 1;
          position: relative;
          // background-color: #fff;
          margin-top: 1vh;
          margin-right: 1vw;
          height: 37vh;
          display: flex;
          overflow-x: auto;
          &::-webkit-scrollbar-track {
            background-color: @sixthColor;
          }
          &::-webkit-scrollbar {
            height: 0.3vw;
          }
          &::-webkit-scrollbar-thumb {
            background-color: @thirthColor;
          }
          .image{
            height: 37vh;
            padding-left: 1vw;
            &:first-child{
              padding-left: 0;
            }
            img{
              height: 100%;
              width: auto;
              border-radius: 2px;
            }
          }
          // .next{
          //   position: absolute;
          //   top: 0;
          //   right: 0;
          //   background: linear-gradient(to left, rgba(255,255,255,0.3),transparent);
          //   width: 2vw;
          //   height: 100%;
          // }
        }
      }
      .content{
        flex: 1;
        // margin-top: 8px;
        .content-content{
          display: block;
          margin-top: 1vh;
          font-size: 2vh;
          white-space: pre-line;
          overflow-y: auto;
          height: 47vh;
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
      }
    }
  }
  .zhiwei-recr{
    position: relative;
    top: -50px;
    width: 75%;
    // height: 900px;
    // background-color: yellow;
    display: flex;
    justify-content: center;
    .zhiwei{
      border-top: coral 1vh solid;
      width: 79%;
      height: 100%;
      background-color: #fff;
      padding: 1vw 2vw;
      min-height: 30vh;
      box-shadow: 0 2px 2px 0 @sixthColor;
      .name{
        font-weight: 700;
        font-size: 3vh;
        text-align: left;
        padding-left: 1vw;
        height: 4vh;
        line-height: 4vh;
        border-left: 0.3vw solid coral;
        margin-bottom: 1vh;
      }
    }
  }
  .image{

  }
}
</style>