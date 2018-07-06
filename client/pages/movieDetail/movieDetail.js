var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    movie:{}
  },
  onLoad: function (options) {
    let id = options.id
    this.getMovideDetail(id)
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor:'#ffffff'
    })
  },
  getMovideDetail(id){
    wx.showLoading({
      title: '电影加载中...',
    })
    qcloud.request({
      url:config.service.movieDetail,
      data:{
        id:id
      },
      success:res=>{
        wx.hideLoading()
        console.log(res.data.data)
        if(!res.data.code){
          this.setData({
            movie:res.data.data[0]
          })
        }
        else{
          wx.showToast({
            title: '加载失败',
          })
        }
      },
      Error:res=>{
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  }
})