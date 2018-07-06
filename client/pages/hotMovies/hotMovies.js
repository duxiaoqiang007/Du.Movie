var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotMovies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHotMovies()
  },
  getHotMovies(){
    wx.showLoading({
      title: '热门电影加载中...',
    })
    qcloud.request({
      url: config.service.hotMovies,
      success: res => {
        wx.hideLoading()
        console.log(res.data.data)
        if (!res.data.code) {
          this.setData({
            hotMovies: res.data.data
          })
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
  }
})