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
var Content = require('../models/Content');

//程序主入口 Login /register

router.get('/', function (req, res, next) {
    // console.log('渲染首页模板的用户数据 ' + JSON.stringify(req.userInfo));

    var reqPage = Number((req.query.page) === undefined ? 0 : req.query.page);
    var data = {
        userInfo: req.userInfo,
        category: req.query.category || '',
        categories: [],
        count: 0,
        //分页
        page: reqPage <= 0 ? 1 : reqPage,
        limit: 3,
        pages: 0
    };

    //查询筛选条件
    var whereStr = {};
    if (data.category) {
        whereStr.category = data.category;
    }

    //读取所有分类信息
    Category.find().then(function (categories) {
        // console.log(categories);
        data.categories = categories;
        //读取内容的总数
        return Content.where(whereStr).count();
    }).then(function (count) {

        data.count = count;
        //总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于 1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;
        return Content.where(whereStr).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then(function (contents) {
        data.contents = contents;
        console.log(data);
        res.render('main/mainIndex', data);
    });

});

// router.get('/login', function (req, res, next) {
//     res.render('main/mainIndex', {
//         userInfo: req.userInfo
//     });
// });

module.exports = router;