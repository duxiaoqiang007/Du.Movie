const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    movie:{},
    commentValue:null,
    commentType:null,
    audioCtx:null,
    duration:null,
    src:'/images/play_circle.svg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    let content = this.data.commentValue
    if (!content) return
    wx.showLoading({
      title: '提交中，请稍后',
    })
    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        movie_id:this.data.movie.id,
        commentType:this.data.commentType,
        comment: content
      },
      success: res => {
        wx.hideLoading()
        let data = res.data
        if (!data.code) {
          wx.showToast({
            title: '评论完成',
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