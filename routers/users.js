/**
 * Created by zhangyi on 2017/5/27.
 */


//用户路由



var express = require('express');
var userRouter = express.Router();
//

userRouter.get('/', function (req, res, next) {
    //加载用户博客首页
    res.render('user/userIndex', {});
});

module.exports = userRouter;