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
  },
  addLikeComment: async ctx=>{
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie_id = +ctx.request.body.movie_id || null
    let comment_id = +ctx.request.body.comment_id || null
    if(!isNaN(comment_id)){
      await DB.query('insert into like_comment(comment_id,movie_id,user) values(?,?,?)',[comment_id,movie_id,user])
    }
    ctx.state.data={}
  },
  getLikeComment:async ctx=>{
    let user = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = await DB.query('SELECT like_comment.comment_id, like_comment.movie_id, movies.title, movies.image, comment.comment_type, comment.comment, comment.voice_duration, user.avatarUrl, user.nickName FROM like_comment, movies, comment, user WHERE movies.id = like_comment.movie_id AND comment.id = like_comment.comment_id AND user.user = like_comment.user AND like_comment.user = ?',[user])

  },
  getIfLike: async ctx=>{
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie_id = +ctx.request.query.movie_id || null
    let comment_id = +ctx.request.query.comment_id || null
    if(!isNaN(movie_id)&&!isNaN(comment_id)){
      ctx.state.data = await DB.query('SELECT * FROM like_comment WHERE like_comment.comment_id=? AND like_comment.movie_id=? AND like_comment.user=?', [comment_id, movie_id, user])
    }
  },
  deleteLike:async ctx=>{
    let id = ctx.request.body.id || null
    if(!isNaN(id)){
      await DB.query('delete from like_comment where like_comment.id=?',[id])
    }
  },
  getEditComment:async ctx=>{
    let user = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = await DB.query('select comment.id,comment.comment_type,comment.comment,comment.voice_duration,movies.title,movies.image from comment ,movies where comment.movie_id = movies.id and comment.user=?',[user])
  }
}