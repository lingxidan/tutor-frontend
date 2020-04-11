<template>
  <div class="chat">
    <div class="chat-main">
      <div class="chatList">
        <div class="top">
          <div class="name">{{user.name}}</div>
          <div class="search">
            <el-input placeholder="查找联系人" v-model="findText" @change="filterContact">
            </el-input>
          </div>
        </div>
        <ul>
          <li v-for="(chatContent,idx) in chatContentList" 
          :style="(current.person||{}).id==chatContent.person.id?'background-color: rgb(29, 29, 29);':''"
          :key="idx" @click="current = chatContent">
            <!-- <el-badge :value="chatContent.newMsgCnt" class="item"> -->
              <div class="info">
                <p class="name">{{chatContent.person.name}}</p>
                <p class="last">{{chatContent.contentList[chatContent.contentList.length-1].dt}}</p>
              </div>
              <div class="msg">
                <p class="last">{{chatContent.contentList[chatContent.contentList.length-1].content}}</p>
              </div>
            <!-- <div class="msg"> -->
              <!-- <p class="last">{{chatContent.newMsgCnt}}</p> -->
            <!-- </el-badge> -->
            <!-- </div> -->
          </li>
        </ul>
      </div>
      <div class="chatInfo">
        <template v-if="!current.person">
          <p class="notCurrent">
            您还未选中或发起聊天，快去聊一聊吧
          </p>
        </template>
        <template v-else>
          <div class="top">
            <p class="name">{{current.person.name}}</p>
          </div>
          <div class="messages" id="messageList" ref="messageList">
            <div class="message-info" v-for="(chatInfo,idx) in current.contentList">
              <!-- {{chatInfo.fromId==chat.fromId}}
              {{chatInfo}} -->
              <div class="to" v-if="chatInfo.fromId==user.id">
                <label for="">{{chatInfo.dt}}</label>
                <span>{{chatInfo.content}}</span>
              </div>
              <div class="from" v-else>
                <label for="">{{chatInfo.dt}}</label>
                <span>{{chatInfo.content}}</span>
              </div>
            </div>

          </div>
          <div class="input-emojis">
            <div class="submit-input">
              <i class="el-icon-magic-stick" @click="showEmojijs = !showEmojijs"></i>
              <el-button type="primary" @click="onSubmit">发送</el-button>
            </div>
            <div class="emojis" v-if="showEmojijs" @mouseleave="showEmojijs = false">
              <ul>
                <li v-for="(item,idx) in emojijs" :key="idx" @click="addEmoji(item)">{{item.char}}</li>
              </ul>
            </div>
            <textarea class="msgInput" type="textarea" placeholder="输入聊天内容" v-model="chat.content" 
            @keyup.ctrl.enter="onEnter" @keyup.enter="onSubmit"></textarea>
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const emojijs = require("../../assets/emojijs.json");
export default {
  name:"chat",
  data() { 
    return {
      getChatMsg:null,
      msg:"",
      findText:"",
      user:{
        name:"张XX"
      },
      chatList:{},
      emojijs:emojijs,
      currentChatList:[],
      user:{
        // userId:""
      },
      personList:[],

      chatTimer:[],
      chatContentList: [],
      chatSrcContentList: [],
      current:{},
      showEmojijs:false,
      chat:{
        fromId:0,
        toId:0,
        content:""
      },
    }
  },
  props: {

  },
  components:{
    
  },
  created(){
    let _this=this
    _this.chatList={}
    this.user = JSON.parse(sessionStorage.getItem('user')); 
    this.$request.selectAllChat({uesrId:this.user.id}).then(res=>{
      let chatList = res.data
      let personIdList = []
      chatList.forEach(chat=>{
        if(chat.fromId == this.user.id){
          if(personIdList.indexOf(chat.toId)<0){
            personIdList.push(chat.toId)
          }
        }
        if(chat.toId == this.user.id){
          if(personIdList.indexOf(chat.fromId)<0){
            personIdList.push(chat.fromId)
          }
        }
      })
      let chatContentList = []
      // 志愿者
      if(this.user.userType == 1){
        personIdList.forEach((id,idx)=>{
          let contentList = []
          chatList.forEach(chat=>{
            if(chat.fromId==id||chat.toId==id){
              contentList.push(chat)
            }
          })
          this.$request.getRecuriter({userId:id}).then(res=>{
            this.personList.push(res.data)
            chatContentList.push({
              person: res.data,
              contentList:contentList,
              newMsgCnt:0
            })
            let timer = setInterval(()=>{
              this.$request.selectByFromTo({
                userId:this.user.id,
                dt:this.chatContentList[idx].contentList[this.chatContentList[idx].contentList.length-1].dt}).then(
                  res=>{
                    if(res.data.length>0){
                      this.chatContentList[idx].contentList=[
                        ...this.chatContentList[idx].contentList,
                        ...res.data
                      ]
                      this.chatContentList[idx].newMsgCnt = res.data.length
                    }
                  }
                )
            },1000)
            this.chatTimer.push(timer)
          })
        })
      }
      // 招募者
      if(this.user.userType == 2){
        personIdList.forEach((id,idx)=>{
          let contentList = []
          chatList.forEach(chat=>{
            if(chat.fromId==id||chat.toId==id){
              contentList.push(chat)
            }
          })
          this.$request.getVolunteer({userId:id}).then(res=>{
            this.personList.push(res.data)
            chatContentList.push({
              person: res.data,
              contentList:contentList,
              newMsgCnt:0
            })
            let timer = setInterval(()=>{
              this.$request.selectByFromTo({
                userId:this.user.id,
                dt:this.chatContentList[idx].contentList[this.chatContentList[idx].contentList.length-1].dt}).then(
                  res=>{
                    if(res.data.length>0){
                      this.chatContentList[idx].contentList=[
                        ...this.chatContentList[idx].contentList,
                        ...res.data,
                      ]
                      this.chatContentList.newMsgCnt = res.data.length
                    }
                  }
                )
            },1000)
            this.chatTimer.push(timer)
          })
        })
      }
      this.chatContentList = chatContentList
      this.chatSrcContentList = this.chatContentList
    })
  },
  mounted() {
  },
  methods:{
    addEmoji(emoji){
      this.chat.content+=emoji.char
      this.showEmojijs = false
    },
    onSubmit(){
      this.chat.fromId=this.user.id
      this.chat.toId=this.current.person.userId
      this.$request.insertChat(this.chat).then(
        res=>{
          this.chat.content=""
        }
      )
    },
    onEnter(){
      this.chat.content+="\n"
    },
    filterContact(val){
      this.chatContentList = this.chatSrcContentList.filter(a=>a.person.name.indexOf(val)>=0)
      this.current={}
    }
  },
  updated(){
    // let ele = document.getElementById('messageList');
    // console.log(this.$refs.messageList)
    if(this.$refs.messageList){
      this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
    }
  }
}
</script>

<style lang="less">
@import '../../../static/css/main';
.chat-main{
  display: flex;
  width: 78vw;
  height: 90vh;
  box-shadow: 0 0 6px 0 @fifthColor;
  margin-top: 1vh;
  margin-bottom: 2vh;
  .chatList{
    width: 20%;
    background-color: rgb(59, 59, 59);
    overflow-y: auto;
    .top{
      background-color: inherit;
      .name{
        height: 5vh;
        line-height: 5vh;
        color:#f7f7f7;
        text-align: left;
        padding-left: 2vw;
        background-color: rgb(59, 59, 59);
      }
      .search{
        .el-input__inner{
          background-color: #2e2e2e;
          border: none;
          color: @sixthColor;
        }
      }
    }
    li{
      cursor: pointer;
      display: block;
      line-height: 2;
      // padding-bottom: 30px;
      padding: 1vh;
      border-bottom: 0.1vh solid rgb(75, 75, 75);
      color:#f7f7f7;
      .info{
        display: flex;
      }
      p.name{
        width: 50%;
        font-size: 2vh;
        font-weight: bold;
        text-align: left;
        padding-left: 2vw;
      }
      p.last{
        width: 46%;
        font-size: 1vh;
        text-align: right;
        color: #7a7a7a;
      }
      &:hover{
        background-color: rgb(29, 29, 29);
      }
      
      .msg{
        height: 4vh;
        line-height: 4vh;
        overflow: hidden;
        .last{
          margin: 0 auto;
          width:70%;
          font-size: 1.3vh;
          text-align: left;
          color: #b6b6b6;
        }
      }
      .el-badge__content {
        background: coral;
        border-radius: 50%;
        color: #FFF;
        display: inline-block;
        font-size: 1.4vh;
        height: 3vh;
        line-height: 3vh;
        padding: 0 0.5vw;
        border: none;
        top: 80%;
      }
    }
  }
  .chatInfo{
    // width: 78%;
    flex: 1;
    height: 100%;
    border: 1px solid #f9f9f9;
    background-color: #f9f9f9;
    .top{
      background-color: #f9f9f9;
      border-bottom:0.1vh solid @sixthColor;
      display: flex;
      p.name{
        text-align: center;
        // padding-left: 50px;
        width: 100%;
        height: 100%;
        font-size: 3vh;
        line-height: 5vh;
        background-color: #fff;
      }
    }
    .messages{
      height: 55%;
      background-color: white;
      padding: 1vw;
      overflow: auto;
      // border: 1px solid #fcfcfc;
      background-color: #f9f9f9;
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
      .from,.to{
        position: relative;
        margin: 0.5vh;
        label{
          display: block;
          color: #aaa;
          font-size: 1.2vh;
        }
        span{
          display: inline-block;
          min-height: 3vh;
          padding: 1vh 1vw 1vh 1vw;
          margin-top: 0;
          // border: 1px solid #333;
          // min-width: 2vw;
          max-width: 60%;
          font-size: 2vh;
        }
      }
      .from{
        right: 0;
        // margin-right: 50%;
        text-align: left;
        span{
          text-align: left;
          background-color: lightblue;
          border-radius: 4vh 4vh 4vh 0;
        }
      }
      .to{
        // margin-left: 50%;
        text-align: right;
        span{
          text-align: left;
          background-color: rgba(255, 128, 82, .5);
          // color: @sixthColor;
          border-radius: 4vh 4vh 0 4vh;
          // color: @mainColor;
        }
      }
    }
    .input-emojis{
      position: relative;
      height: 35%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      border-top:0.1vh solid @sixthColor;
      // padding-top: 30px;
      .submit-input{
        display: flex;
        justify-content: space-between;
        padding: 0.4vh;
        i{
          margin-top: 0.3vw;
          margin-left: 0.3vw;
        }
        .el-button{
          padding: 0 2vw;
          border-radius: 1px;
          border-width: 0.1vh;
          font-size: 1.6vh;
          line-height: 2.4;
          letter-spacing: 1px;
          &:hover{
            background: none;
            color: @mainColor;
          }
        }
      }
      .emojis{
        position: absolute;
        background-color: #fff;
        width: 100%;
        border: 1px solid @sixthColor;
        transform: translateY(-100%);
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            cursor: pointer;
            padding: 3px;
            width: 20px;
            height: 20px;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .msgInput{
        height: 100%;
        border: none;
        &:focus{
          border: none;
          outline: none;
        }
        .el-textarea__inner{
          height: 100%;
          border: none;
        }
      }
    }
  }
  
  .notCurrent{
    display: block;
    margin-top: 50px;
  }
}
</style>