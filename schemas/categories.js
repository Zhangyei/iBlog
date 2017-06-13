/**
 * Created by zhangyi on 2017/06/03.
 */

var mongoose = require('mongoose');

//分类表结构
var schema = new mongoose.Schema({
    //分类名称
    name:String
});

module.exports = schema;


/*
 此处也可以直接
 module.exports = mongoose.model('User',userSchema);
 */