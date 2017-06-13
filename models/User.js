/**
 * Created by zhangyi on 2017/5/26.
 */


var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

/*
*   User
*
**/

module.exports = mongoose.model('User',userSchema);