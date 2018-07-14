const DB = require('../units/db.js')

module.exports = {
  insertUser: async ctx => {
    let openId = ctx.state.$wxInfo.userinfo.openId
    let nickName = ctx.state.$wxInfo.userinfo.nickName
    let avatarUrl = ctx.state.$wxInfo.userinfo.avatarUrl
    let gender = ctx.state.$wxInfo.userinfo.gender
    let city = ctx.state.$wxInfo.userinfo.city
    let province = ctx.state.$wxInfo.userinfo.province
    let country = ctx.state.$wxInfo.userinfo.country
    let language = ctx.state.$wxInfo.userinfo.language
    //判断是否之前该用户已经登陆，即已经insert过同一个openId
    let user = await DB.query('select user from user where user.user =?', [openId])
    if(!isNaN(user)){
      ctx.state.data = await DB.query("insert into user(user,nickName,avatarUrl,gender,city,province,country,language) values(?,?,?,?,?,?,?,?)", [openId, nickName, avatarUrl, gender, city, province, country, language])
    }
  }
}