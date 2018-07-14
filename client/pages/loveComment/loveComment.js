const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    likeCommentList:[],
    srcImage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.userInfo){
      this.getLikeCommentList()
    }
  },
  onShow() {
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
      }
    })
  },
  onTapLogin: function (event) {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
        this.getLikeCommentList()
      }
    })
  },
  getLikeCommentList() {
    wx.showLoading({
      title: '收藏影评加载中...',
    })
    qcloud.request({
      url: config.service.getLikeComment,
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setSrcImage(res.data.data)
        }
        else {
          wx.showToast({
            title: '收藏影评加载失败',
          })
        }
      },
      error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '收藏影评加载失败',
        })
      }
    })
  },
  setSrcImage(commentList){
    let srcImage = []
    for (let i = 0; i < commentList.length; i++) {
      srcImage.push({
        image: '/images/play_circle.svg'
      })
      if (commentList[i].comment_type == 1) {
        wx.downloadFile({
          url: commentList[i].comment,
          success: res => {
            commentList[i].comment = res.tempFilePath
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    }
    this.setData({
      srcImage: srcImage,
      likeCommentList:commentList
    })
  },
  onTapVoice(e) {
    let index = e.target.dataset.id
    console.log(index)
    let srcImage = this.data.srcImage
    console.log(srcImage[index].image)
    if (srcImage[index].image == '/images/play_circle.svg') {
      srcImage[index].image = '/images/pause_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.data.likeCommentList[index].comment
      console.log(this.data.likeCommentList[index].comment)
      console.log(innerAudioContext.duration)
      innerAudioContext.play()
      innerAudioContext.onEnded(res => {
        innerAudioContext.stop()
        srcImage[index].image = '/images/play_circle.svg'
        this.setData({
          srcImage: srcImage
        })
      })
    }
    else {
      srcImage[index].image = '/images/play_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.pause()
    }
  },
  onTapBackHome(){
    wx.navigateBack({})
  }
})