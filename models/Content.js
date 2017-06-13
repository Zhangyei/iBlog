/**
 * Created by zhangyi on 2017/6/13.
 */

/*
 *   内容相关数据模型
 *
 * */

var mongoose = require('mongoose');
var contentSchema = require('../schemas/contents');


module.exports = mongoose.model('Content', contentSchema);