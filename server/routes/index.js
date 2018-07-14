/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
//get 获取首页电影
router.get('/homeMovie',controllers.home.homeMovie)
//get 获取首页电影评论
router.get('/homeComment', controllers.home.homeComment)
//put 上传用户信息
router.put('/insertUser',validationMiddleware,controllers.insertuser.insertUser)
//get 获取热门电影
router.get('/hotMovies',controllers.hotMovie.hotMovies)
//get 获取电影详情
router.get('/movieDetail', controllers.hotMovie.movieDetail)
//put 添加电影评论
router.put('/add',validationMiddleware,controllers.comment.add)
//get 获取影评列表
router.get('/list',validationMiddleware,controllers.comment.list)
//get 获取影评详情
router.get('/detail',validationMiddleware,controllers.comment.detail)
//put 添加收藏影评
router.put('/addLikeComment', validationMiddleware, controllers.comment.addLikeComment)
//get 获取收藏影评列表
router.get('/getLikeComment', validationMiddleware, controllers.comment.getLikeComment)
//get 获取某影评是否收藏过
router.get('/getIfLike', validationMiddleware, controllers.comment.getIfLike)
//delete 取消收藏
router.delete('/deleteLike', validationMiddleware, controllers.comment.deleteLike)
module.exports = router
