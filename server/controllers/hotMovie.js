const DB = require('../units/db.js')

module.exports = {
  hotMovies:async ctx =>{
    ctx.state.data = await DB.query("select * from movies limit 0,8")
  },
  movieDetail:async ctx=>{
    let id = +ctx.request.query.id
    ctx.state.data = await DB.query("select * from movies where id=?",[id])
  }
}