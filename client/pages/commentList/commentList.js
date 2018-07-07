const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  data: {
    userInfo:null,
    commentList:[],
    srcImage: []
  },
  onLoad: function (options) {
    let movie_id =  options.movie_id
    this.getCommentList(movie_id)
  },
  getCommentList(movie_id){
    wx.showLoading({
      title: '影评加载中...',
    })
    qcloud.request({
      url: config.service.getCommentList,
      data:{
        movie_id: movie_id
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setData({
            commentList: res.data.data
          })
        this.setSrcImage(res.data.data.length)       
        }
        else {
          wx.showToast({
            title: '影评加载失败',
          })
        }
      },
      error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '影评加载失败',
        })
      }
    }) 
  },
  setSrcImage(length){
    let srcImage = []
    for (let i = 0; i < length;i++){
      srcImage.push({
        image: '/images/play_circle.svg'
      })
    }
    this.setData({
      srcImage: srcImage
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
  onTapVoice(e) {
    let index = e.target.dataset.id
    console.log(index)
    let srcImage = this.data.srcImage
    console.log(srcImage[index].image)
    if (srcImage[index].image == '/images/play_circle.svg') {
      srcImage[index].image ='/images/pause_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.data.commentList[index].comment
      console.log(this.data.commentList[index].comment)
      innerAudioContext.play()
    }
    else {
      srcImage[index].image = '/images/play_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.pause()
    }
  },
})