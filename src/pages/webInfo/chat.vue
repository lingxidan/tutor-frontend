<template>
  <div class="chat">
    <div class="chatList">
      <div class="top">
        <div class="name">{{user.name}}</div>
        <div class="search">
          <el-input placeholder="查找联系人" v-model="findText">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <ul>
        <li v-for="(chatId,idx) in Object.keys(chatList)" :key="idx" @click="chatCurrent(chatId)">
          <template v-if="chatList[chatId].person">
            <!-- {{user.userId}} -->
            <!-- asdf{{chat.from.userId}}{{user.userId}}{{chat.to}} -->
            <template v-if="chatList[chatId].from.userId==user.userId">
              <div class="info">
                <p class="name">{{chatList[chatId].to.name}}</p>
                <p class="last">{{chatList[chatId].dt}}</p>
              </div>
              <div class="msg">
                <!-- <p class="last">{{chatList[chatId].content}}</p> -->
              </div>
            </template>
            <template v-if="chatList[chatId].to.userId==user.userId">
              <div class="info">
                <p class="name">{{chatList[chatId].from.name}}</p>
                <p class="last">{{chatList[chatId].dt}}</p>
              </div>
              <div class="msg">
                <!-- <p class="last">{{chatList[chatId].content}}</p> -->
              </div>
            </template>
          </template>
          <!-- {{user.userId&&chat.from&&chat.from.userId!=user.UserId}} -->
        </li>
      </ul>
    </div>
    <div class="chatInfo">
      <template v-if="!current.name">
        <p class="notCurrent">
          您还未选中或发起聊天，快去聊一聊吧
        </p>
      </template>
      <template v-else>
        <div class="top">
          <p class="name">{{current.name}}</p>
        </div>
        <div class="messages" id="messageList" ref="messageList">
          <div v-for="(chatInfo,idx) in currentChatList">
            <!-- {{chatInfo.fromId==chat.fromId}}
            {{chatInfo}} -->
            <div class="to" v-if="chatInfo.fromId==chat.fromId">
              {{chatInfo.content}}
            </div>
            <div class="from" v-else>
              {{chatInfo.content}}
            </div>
          </div>

        </div>
        <div class="input">
          <div class="emojis">
            <ul>
              <li v-for="(item,idx) in emojijs" :key="idx" @click="addEmoji(item)">{{item.char}}</li>
            </ul>
          </div>
          <textarea class="msgInput" type="textarea" placeholder="输入聊天内容" v-model="chat.content" 
          @keyup.ctrl.enter="onEnter" 
          @keyup.enter.exact="onSubmit"></textarea>
          <!-- <el-button type="primary" @click="submit">提交</el-button> -->
        </div>
      </template>
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
      current:{},
      chatList:{},
      emojijs:emojijs,
      chat:{
        fromId:32,
        toId:0,
        content:""
      },
      currentChatList:[],
      user:{
        // userId:""
      },
      personList:[],
      currentChatTimer:null
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
    this.$request.selectLastChats({userId:this.user.userId}).then(
      res=>{
        let personList={}
        // _this.chatList=res.data
        res.data.forEach(data=>{
          _this.getUser(data.fromId,(res)=>{
            data.from=res.data
            if(data.fromId==_this.user.userId){
              personList[data.toId]=data
              data.person = data.to
            }
            if(data.toId==_this.user.userId){
              personList[data.fromId]=data
              data.person = data.from
            }
            _this.getUser(data.toId,(res)=>{
              data.to=res.data
              if(data.fromId==_this.user.userId){
                personList[data.toId]=data
                data.person = data.to
              }
              if(data.toId==_this.user.userId){
                personList[data.fromId]=data
                data.person = data.from
              }
              _this.chatList={...personList}
            })
          })
        })
        _this.chatList={...personList}
        // _this.chatList=[..._this.chatList]
        console.log(_this.chatList)
      }
    )
  },
  mounted() {
    // setInterval(()=>{
    //   console.log(new Date())
    // },1000)
    let _this=this
    // this.chat.fromId=this.$store.state.user.userId
    console.log(this.chat)
    // this.chat.fromId=this.from.userId
    // if(this.chat.fromId==24){
    //   this.chatList[1].id=32
    // }
    // if(this.chat.fromId==32){
    //   this.chatList[1].id=24
    // }
    
  },
  methods:{
    getUser(userId,func){
      let _this=this
      _this.$request.getVolunteer({userId:userId}).then(
        res=>{
          func(res)
        },
        error=>{
          _this.$request.getRecuriter({userId:userId}).then(res=>{
            func(res)
          },)
        }
      )
    },
    getChat(){
    },
    chatCurrent(chatIdx){
      clearInterval(this.currentChatTimer)
      this.current=this.chatList[chatIdx].person
      console.log(this.current)
      this.chat.fromId=this.user.userId
      this.chat.toId=chatIdx
      this.getChat()
      this.currentChatTimer=setInterval(()=>{
        let lastCnt = this.currentChatList.length
        this.$request.selectChatByFromTo(this.chat).then(
          res=>{
            let cnt=res.data.length
            if(lastCnt!=cnt){
            this.currentChatList=res.data

            }
            // console.log(res.data)
            // let ele = document.getElementById('messageList');
            // console.log(ele)
            // ele.scrollTop = ele.scro;
            // console.log(this.currentChatList)
          }
        )
      },1000)
    },
    addEmoji(emoji){
      this.chat.content+=emoji.char
    },
    onSubmit(){
      console.log(this.chat)
      this.$request.insertChat(this.chat).then(
        res=>{
          console.log(res)
          this.chat.content=""
        }
      )
    },
    onEnter(){
      this.chat.content+="\n"
    }
  },
  updated(){
    let ele = document.getElementById('messageList');
    console.log(this.$refs.messageList)
    ele.scrollTop = ele.scrollHeight;
  },
}
</script>

<style lang="less">
.chat{
  display: flex;
  width: 90%;
  height: 900px;
  .chatList{
    width: 22%;
    background-color: rgb(59, 59, 59);
    .top{
      background-color: inherit;
      .name{
        height: 50px;
        line-height: 50px;
        color:#f7f7f7;
        text-align: left;
        padding-left: 20px;
      }
      .search{
        .el-input__inner{
          background-color: #2e2e2e;
          border: none;
        }
      }
    }
    li{
      cursor: pointer;
      display: block;
      line-height: 30px;
      // padding-bottom: 30px;
      padding-top: 10px;
      border-bottom: 1px solid rgb(75, 75, 75);
      color:#f7f7f7;
      .info{
        display: flex;
      }
      p.name{
        width: 50%;
        font-size: 16px;
        font-weight: bold;
      }
      p.last{
        width: 46%;
        font-size: 4px;
        text-align: right;
        color: #7a7a7a;
      }
      &:hover{
        background-color: rgb(29, 29, 29);
      }
      
      .msg{
        height: 40px;
        .last{
          margin: 0 auto;
          width:70%;
          font-size: 4px;
          text-align: left;
          color: #b6b6b6;
        }
      }
    }
  }
  .chatInfo{
    width: 78%;
    height: 100%;
    border: 1px solid #f9f9f9;
    background-color: #f9f9f9;
    .top{
      height: 5%;
      background-color: #f9f9f9;
      display: flex;
      p.name{
        text-align: center;
        padding-left: 50px;
        width: 100%;
        height: 100%;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        // line-height: 100%;
      }
    }
    .messages{
      height: 55%;
      background-color: white;
      padding: 20px;
      overflow: auto;
      // border: 1px solid #fcfcfc;
      .from,.to{
        padding: 5px 30px;
        margin: 20px;
        border: 1px solid #333;
        min-height: 50px;
      }
      .from{
        text-align: left;
        background-color: lightblue;
        margin-right: 40%;
        border-radius: 40px 40px 40px 0;
      }
      .to{
        text-align: left;
        background-color: lightgoldenrodyellow;
        margin-left: 40%;
        border-radius: 40px 40px 0 40px;

      }
    }
    .input{
      height: 35%;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      // padding-top: 30px;
      .emojis{
        width: 100%;
        height: 50px;
        margin: 10px;
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
        .el-textarea__inner{
          height: 100%;
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