const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    userInfo: null,
    movie:{},
    commentValue:null,
    commentType:null,
    audioCtx:null,
    duration:null,
    src:'/images/play_circle.svg'
  },

  onLoad: function (options) {
    let movie = {}
     movie.id = options.movie_id
     movie.title = options.movie_title
     movie.image = options.movie_image
    let commentType = options.commentType
    let commentValue = options.commentValue
    let duration = options.duration
    console.log(duration)
    console.log(commentValue)
    this.setData({
      movie:movie,
      commentValue: commentValue,
      commentType: commentType,
      duration:duration
    })
  },

  onShow: function () {
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
      }
    })
  },
  onReady:function(e){
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onTapVoice(){
    let src = this.data.src
    if (src =='/images/play_circle.svg'){
      this.setData({
        src:'/images/pause_circle.svg'
      })
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.commentValue
    innerAudioContext.play()
    }
    else{
      this.setData({
        src: '/images/play_circle.svg'
      })
      innerAudioContext.pause()
    }
  },
  onTapback(){
    wx.navigateBack({
    })
  },
  onTapSend(){
    let commentType = this.data.commentType
    let path = this.data.commentValue
    console.log(path)
    if (!path) return
    if(commentType==1){
      this.sendBrucket(path)
    }
  },
  sendBrucket(path){
      wx.showLoading({
        title: '上传中，请稍后...',
      })
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: path,
        name:'file',
        header: {  
         'content-type': 'multipart/form-data'  
        }, 
        success:res=>{
          let data = JSON.parse(res.data)
          console.log(data)
          qcloud.request({
            url: config.service.addComment,
            login: true,
            method: 'PUT',
            data: {
              movie_id:this.data.movie.id,
              commentType:this.data.commentType,
              comment: data.data.imgUrl,
              duration:this.data.duration
            },
            success: res => {
              wx.hideLoading()
              let data = res.data
              if (!data.code) {
                wx.showToast({
                  title: '评论完成',
                })
                wx.navigateTo({
                  url: '/pages/commentList/commentList?movie_id='+this.data.movie.id,
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '评论失败',
                })
              }
            },
            fail: res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '评论失败',
              })
            }
          })
        }
      })
   }

})