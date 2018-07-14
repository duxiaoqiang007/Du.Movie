/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://k1ejju1v.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        //获取首页电影
        homeMovie: `${host}/weapp/homeMovie`,
        //获取首页评论
        homeComment: `${host}/weapp/homeComment`,
        //获取热门电影
        hotMovies:`${host}/weapp/hotMovies`,
        //上传用户信息
        insertUser:`${host}/weapp/insertUser`,
        //获取电影详情
        movieDetail:`${host}/weapp/movieDetail`,
        //添加电影评论
        addComment:`${host}/weapp/add`,
        //获取电影评论列表
        getCommentList:`${host}/weapp/list`,
        //获取影评详情
        getCommentDetail:`${host}/weapp/detail`,
        //添加收藏影评
        addLikeComment:`${host}/weapp/addLikeComment`,
        //获取收藏影评列表
        getLikeComment:`${host}/weapp/getLikeComment`,
        //获取是否收藏过该影评
        getIfLike: `${host}/weapp/getIfLike`,
        //删除收藏影评
        deleteLike: `${host}/weapp/deleteLike`
    }
};

module.exports = config;
