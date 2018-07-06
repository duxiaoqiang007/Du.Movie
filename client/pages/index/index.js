const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    homeMovie: {},
    homeComment:{},
    userInfo:null
  },
  onLoad() {
    this.getMovie()
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
  onTapMovieDetail(){
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=1',
    })
  },
  onTapHotMovie(){
    wx.navigateTo({
      url: '../hotMovies/hotMovies',
    })
  },
  onTapMy(){
    if(!this.data.userInfo){
      wx.showModal({
        title: '提示',
        content: '您尚未登陆，是否登陆？',
        success: res => {
          if (res.confirm) {
            this.login()
          }
          else {
            wx.showToast({
              icon:'none',
              title: '登陆失败',
            })
          }
        },
        fail:res=>{
          console.log(res)
          wx.showToast({
            icon: 'none',
            title: '登陆失败',
          })
        }
      })
    }
    else{
      wx.navigateTo({
        url: '../loveComment/loveComment',
      })  
    }
  },
  login(){
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        console.log(userInfo)
        wx.navigateTo({
          url: '../loveComment/loveComment',
        })
      }
    })
  }
})
