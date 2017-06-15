/**
 * Created by zhangyi on 2017/6/15.
 */

/*
 *   评论相关Js
 *
 * */

//前台分页
var limit = 4;  //每页显示的数目
var page = 1;//当前页数
var pages = 0;//总页数

var comments = [];

$(function () {
    //评论button点击时提交评论数据
    $("#messageBtn").on('click', function () {
        var url = '/api/comment/post';
        var postData = {
            contentID: $("#contentID").val(),
            comment: $("#messageContent").val()
        };
        //
        $.ajax({
            type: 'post',
            url: url,
            data: postData,
            success: function (resData) {
                // console.log(resData);
                $("#messageContent").val('');
                comments = resData.data.comments.reverse();
                renderComments();
            },
            error: function (err) {
                alert(err);
            }
        });
    });
});

//每次页面重载时获取一下该文章的所有评论
$.ajax({
    type: 'get',
    url: '/api/comment',
    data: {
        contentID: $('#contentID').val()
    },
    success: function (resData) {
        // console.log(resData);
        comments = resData.data;
        renderComments();
    },
    error: function (err) {
        alert(err);
    }
});
//通过实践委托绑定上一页/下一页 a标签点击
$('.pager').delegate('a', 'click', function () {
    // alert('点击了 上/下 一页');
    if ($(this).parent().hasClass("previous")) {
        //上一页
        page--;
    } else {
        //下一页
        page++;
    }
    renderComments(comments);
});

//渲染当前内容所有的评论内容
function renderComments() {
    var length = 0;
    if (comments !== null) length = comments.length;
    //用于处理评论分页
    pages = Math.ceil(length / limit);
    $lis = $(".pager li");
    $lis.eq(1).html(page + '/' + pages);
    var start = (page - 1) * limit;
    var end = Math.min(start + limit, length);
    if (page < 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    }
    else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>')
    }
    if (page > pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    }
    else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>')
    }

    //渲染评论列表
    $("#messageCount").html(length);
    var htmlStr = '';
    if (comments.length === 0) {
        htmlStr += '<div class="messageBox"><p>暂时还没有评论！</p></div>';
        $(".pager").hide();
    }
    else {
        for (var i = start; i < end; i++) {
            var username = (comments[i].username === undefined) ? '游客' : comments[i].username;
            htmlStr += '<div class="messageBox">'
            htmlStr += '<p class="messageLine clear"><span class="floatLeft">' + username + '</span>'
            htmlStr += '<span class="floatRight">' + StringToDate(comments[i].postTime).format('yyyy-MM-dd hh:mm') + '</span> </p>'
            htmlStr += '<p>' + comments[i].comment + '</p>'
            htmlStr += '</div>';
        }
    }
    $(".messageList").html(htmlStr);
}