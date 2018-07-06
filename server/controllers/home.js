const DB = require('../units/db.js')

module.exports = {
  homeMovie: async ctx => {
    ctx.state.data = await DB.query("select * from movies where movies.id = 1")
  },
  homeComment: async ctx => {
    ctx.state.data = await DB.query("SELECT user.nickName,user.avatarUrl, comment.comment_type,comment.comment from user,comment WHERE user.user = (SELECT comment.user FROM comment WHERE movie_id =1 LIMIT 0,1)")
  }
}