/**
 * Created by zhangyi on 2017/6/13.
 */


/*
 *n内容的表结构
 *
 * */

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    //关联字段  // 分类的ID
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'//  关联category表中的ID 字段
    },
    user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'//  关联user表中的ID 字段
    },
    //内容标题
    title: String,
    //内容简介
    description: {type: String, default: ''},
    //内容
    content: {type: String, default: ''},
    //添加时间
    addTime: {type: Date, default: new Date()},

    //阅读数
    views: {type: Number, default: 0},

    //评论
    comments: {
        type: Array,
        default: []
    }

});

module.exports = schema;