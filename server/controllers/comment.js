const DB = require('../units/db.js')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie_id = +ctx.request.body.movie_id || null
    let comment_type = +ctx.request.body.commentType || 0
    let comment = ctx.request.body.comment || null
    let duration = ctx.request.body.duration || 0
    if(!isNaN(movie_id)){
      await DB.query('insert into comment(movie_id,user,comment_type,comment,voice_duration) values(?,?,?,?,?)',[movie_id,user,comment_type,comment,duration])
    }
    ctx.state.data = {}
  },
  list:async ctx=>{
    let movie_id = +ctx.request.query.movie_id
    if(!isNaN(movie_id)){
      ctx.state.data = await DB.query('SELECT comment.id, comment.comment_type,comment.comment,comment.voice_duration,user.nickName,user.avatarUrl FROM `comment`,user WHERE comment.user = user.user AND comment.movie_id =?', [movie_id])
    }
  },
  detail:async ctx=>{
    let comment_id = +ctx.request.query.comment_id
    if(!isNaN(comment_id)){
      ctx.state.data = await DB.query('SELECT comment.id, comment.comment_type,comment.comment,comment.voice_duration,user.nickName,user.avatarUrl FROM `comment`,user WHERE comment.user = user.user AND comment.id =?',[comment_id])
    }
  }
}