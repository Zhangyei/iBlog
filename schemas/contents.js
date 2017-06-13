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
        ref: 'Content'//  关联category表中的ID 字段
    },
    //内容标题
    title: String,
    //内容简介
    description: {type: String, default: ''},
    //内容
    content: {type: String, default: ''}
    //更新时间
    // updateDate: {type: Date, default: Date.now()}


});

module.exports = schema;