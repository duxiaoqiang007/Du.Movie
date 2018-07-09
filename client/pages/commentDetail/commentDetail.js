const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    comment:{},
    movie:{},
    userInfo:null,
    comment_id:null,
    srcImage:null
  },
  onLoad: function (options) {
    let comment_id = options.comment_id
    let movie_id = options.movie_id
    console.log(comment_id,movie_id)
    this.setData({
      comment_id:comment_id
    })
    this.getMovieDetail(movie_id)
  },
  onShow(){
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
      }
    })
  },
  getCommentDetail(comment_id){
    wx.showLoading({
      title: '影评加载中...',
    })
    qcloud.request({
      url: config.service.getCommentDetail,
      data: {
        comment_id: comment_id
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setComment(res.data.data[0])
          this.setSrcImage()
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
  setComment(comment) {
    if (comment.comment_type == 1) {
      wx.downloadFile({
        url: comment.comment,
        success: res => {
          comment.comment = res.tempFilePath
          innerAudioContext.src = res.tempFilePath
          comment.duration = innerAudioContext.duration
        },
        fail: res => {
          console.log(res)
        }
      })
    }
    console.log(comment)
    this.setData({
      comment: comment
    })
  },
  setSrcImage() {
    let srcImage = {}
    srcImage.image ='/images/play_circle.svg'
    this.setData({
      srcImage: srcImage
    })
  },
  getMovieDetail(id) {
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
          this.getCommentDetail(this.data.comment_id)
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
  onTapVoice(){
    let srcImage = this.data.srcImage
    if (srcImage.image == '/images/play_circle.svg') {
      srcImage.image = '/images/pause_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.autoplay = true
      innerAudioContext.play()
      innerAudioContext.onEnded(res => {
        innerAudioContext.stop()
        srcImage.image = '/images/play_circle.svg'
        this.setData({
          srcImage: srcImage
        })
      })
    }
    else {
      srcImage.image = '/images/play_circle.svg'
      this.setData({
        srcImage: srcImage
      })
      innerAudioContext.pause()
    }
  },
  onTapLike(){
    
  },
  addComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: res => {
        wx.navigateTo({
          url: '../editComment/editComment?type=' + res.tapIndex + '&movie_id=' + this.data.movie.id,
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
})