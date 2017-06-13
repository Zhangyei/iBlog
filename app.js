/**
 * Created by zhangyi on 2017/5/25.
 */
var express = require('express');
//加载模板处理模块
var swig = require('swig');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');//中间件/可从request中获取body数据
var Cookies = require('cookies');
var User = require('./models/User');
//创建app应用 ==> NodeJS Http.createServer();
var app = express();
//设置静态文件托管
//当用户访问Url 以/public开始，那么直接返回对应 _dirname + '/public'下的文件
// app.use(express.static(path.join(__dirname,'public')));
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
/*
 第一个参数：模板引擎名称//同时也是模板引擎后缀
 第二个参数：表示用于处理解析模板内容的方法
 */
app.engine('html', swig.renderFile);
//设置模板引擎存放的目录，第一个参数必须是Views//第二个参数即目录
app.set('views', './views');

/*
 * 注册所使用的模板引擎
 * 第一个参数必须是 view engine
 * 第二个参数必须和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
 */
app.set('view engine', 'html');

//在开发中取消模板缓存便于调试
swig.setDefaults({cache: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//设置cookie
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    // console.log('这里打印服务端返回客户端的cookies  ' + req.cookies.get('userInfo'));
    //解析用户登录的cookies信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录用户的类型//是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
        }
        catch (e) {
            // console.log('Cookies have some Error');
            // next();
        }
    }
    else {
        // console.log('不存在用户cookie 数据！');
        next();
    }
});

//路由控制
//根据不同功能划分模块
app.use('/', require('./routers/main'));
app.use('/admin', require('./routers/admin'));
// app.use('/user', require('./routers/users'));
app.use('/api', require('./routers/api'));


//监听Http请求  XXX端口的信息数据
mongoose.connect('mongodb://localhost:27019/Blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
        return;
    }
    else {
        console.log('数据库连接成功');
        app.listen(8002, 'localhost');
        console.log('Server is running at http://localhost:8002');
    }
});
// app.listen(8081, 'localhost');
// console.log('Server is running at http://localhost:8081');
