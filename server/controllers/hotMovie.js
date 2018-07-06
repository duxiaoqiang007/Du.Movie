const DB = require('../units/db.js')

module.exports = {
  hotMovies:async ctx =>{
    ctx.state.data = await DB.query("select * from movies limit 0,8")
  }
}