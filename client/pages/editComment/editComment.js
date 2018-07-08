const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const options = {
  duration: 10000,//指定录音的时长，单位 ms
  sampleRate: 16000,//采样率
  numberOfChannels: 1,//录音通道数
  encodeBitRate: 96000,//编码码率
  format: 'mp3',//音频格式，有效值 aac/mp3
  frameSize: 50,//指定帧大小，单位 KB
}
Page({
  data: {
    userInfo:null,
    movie:{},
    commentType:null,
    commentValue:null,
    ifRecord:0,
    commentDuration:null
  },

  onLoad: function (options) {
    let type =options.type
    let movie_id = options.movie_id
    console.log(type,movie_id)
    this.setData({
      commentType:type
    })
    this.getMovieDetail(movie_id) 
  },
  onTapLogin: function (event) {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
      }
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
  getMovieDetail(id){
    wx.showLoading({
      title: '电影加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail,
      data: {
        id: id
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setData({
            movie: res.data.data[0]
          })
        }
        else {
          wx.showToast({
            title: '加载失败',
          })
        }
      },
      Error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },
  onInput(event){
    this.setData({
      commentValue:event.detail.value.trim()
    })
  },
  startRecord(){
    console.log('开始')
    this.setData({
      ifRecord:1
    })
    recorderManager.start(options)
  },
  stopRecord(){
    console.log('结束')
    recorderManager.stop()

    recorderManager.onStop((res)=>{
      this.setData({
        ifRecord: 0,
        commentValue : res.tempFilePath,
        commentDuration:res.duration
      })
      console.log(res)
    })
  },
  onTapFinish(){
    //测试播放
    // innerAudioContext.autoplay = true
    // innerAudioContext.src =this.data.tempFilePath
    // innerAudioContext.play()
    wx.navigateTo({
      url: '/pages/commentPreview/commentPreview?movie_id=' + this.data.movie.id + '&movie_title=' + this.data.movie.title + '&movie_image=' + this.data.movie.image + '&commentType=' + this.data.commentType + '&commentValue=' + this.data.commentValue + '&duration=' + this.data.commentDuration,
    })
  }
})