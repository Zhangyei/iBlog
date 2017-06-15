/**
 * Created by zhangyi on 2017/6/15.
 */

/*
 *   评论相关Js
 *
 * */

$(function () {

    //每次页面重载时获取一下该文章的所有评论
    $.ajax({
        type: 'get',
        url: '/api/comment',
        data: {
            contentID: $('#contentID').val()
        },
        success: function (resData) {
            // console.log(resData);
            renderComments(resData);
        },
        error: function (err) {
            alert(err);
        }
    });

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
                $("#messageContent").val();
                renderComments(resData.comments);
            },
            error: function (err) {
                alert(err);
            }
        });
    });
});





//渲染当前内容所有的评论内容

function renderComments(comments) {
    var htmlStr = '';
    if (comments === null || comments.length === 0) {
        htmlStr += '<div class="messageBox"><p>暂时还没有评论！</p></div>';
    }
    else {
        for (var i = 0; i < comments.length; i++) {
            htmlStr += '<div class="messageBox">'
            '<p class="messageLine clear"><span class="floatLeft">' + comments[i].username + '</span><span class="floatRight">' + comments[i].postTime.format('yyyy-mm-dd HH:MM') + '</span> </p>'
            '<p>' + comments[i].comment + '</p>'
            '</div>';
        }
    }

    $(".messageList").html(htmlStr);
}