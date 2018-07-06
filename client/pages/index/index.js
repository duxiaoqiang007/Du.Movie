//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    homeMovie: {},
    homeComment:{}
  },
  onLoad() {
    this.getMovie()
  },
  getMovie() {
    wx.showLoading({
      title: '热门电影加载中...',
    })
    qcloud.request({
      url: config.service.homeMovie,
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setData({
            homeMovie: res.data.data[0]
          })
          this.getComment()
        }
        else {
          wx.showToast({
            title: '热门电影加载失败',
          })
        }
      },
      error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '热门电影加载失败',
        })
      }
    })
  },
  getComment(){
    wx.showLoading({
      title: '评论加载中...',
    })
    qcloud.request({
      url: config.service.homeComment,
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setData({
            homeComment: res.data.data[0]
          })
        }
        else {
          wx.showToast({
            title: '评论加载失败',
          })
        }
      },
      error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '评论加载失败',
        })
      }
    })   
  },
  onTapHotMovie(){
    wx.navigateTo({
      url: '../hotMovies/hotMovies',
    })
  }
})
