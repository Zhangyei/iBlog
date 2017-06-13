/**
 * Created by zhangyi on 2017/5/25.
 */

/*
 *   main 模块
 *  /                首页
 *  /view            内容页
 *
 *
 */

var express = require('express');
var router = express.Router();

var Category = require('../models/Category');

//程序主入口 Login /register

router.get('/', function (req, res, next) {
    // console.log('渲染首页模板的用户数据 ' + JSON.stringify(req.userInfo));
    // res.render('main/mainIndex', {
    //     //回显页面用户cookie数据到模板页面
    //     userInfo: req.userInfo
    // });

    //从数据库读取分类信息
    Category.find().then(function (categories) {
       // console.log(categories);

       //
        res.render('main/mainIndex',{
            userInfo:req.userInfo,
            categories:categories
        })

    });

});

// router.get('/login', function (req, res, next) {
//     res.render('main/mainIndex', {
//         userInfo: req.userInfo
//     });
// });

module.exports = router;