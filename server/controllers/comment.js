const DB = require('../units/db.js')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie_id = +ctx.request.body.movie_id || null
    let comment_type = +ctx.request.body.commentType || 0
    let comment = ctx.request.body.comment || null
    if(!isNaN(movie_id)){
      await DB.query('insert into comment(movie_id,user,comment_type,comment) values(?,?,?,?)',[movie_id,user,comment_type,comment])
    }
    ctx.state.data = {}
  },

}