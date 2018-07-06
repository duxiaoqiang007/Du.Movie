const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    userInfo:null,
    movie:{},
    commentType:1,
    commentValue:null,
    ifRecord:0,
    tempFilePath:''
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
  onInput(){
    this.setData({
      commentValue:event.detail.value.trim()
    })
  },
  startRecord(){
    console.log('开始')
    this.setData({
      ifRecord:1
    })
    recorderManager.start()
  },
  stopRecord(){
    console.log('结束')
    recorderManager.stop()
    recorderManager.onStop((res)=>{
      this.setData({
        ifRecord: 0,
        tempFilePath : res.tempFilePath,
      })
      console.log(res)
    })
  },
  onTapFinish(){
    //测试播放
    // innerAudioContext.autoplay = true
    // innerAudioContext.src =this.data.tempFilePath
    // innerAudioContext.play()
  }
})