// * 用户博客首页

$(function () {

    $rightModule = $(".rightModule");//

    var $registerBtn = $("#registerBtn");
    var $loginBtn = $("#loginBtn");
    var $logoutBtn = $("#logout");
    //绑定注册Button事件
    $registerBtn.on('click', function () {
        //调用API接口上传数据
        uploadRegisterDataFunc();
    });
    //绑定登录Button事件
    $loginBtn.on('click', function () {
        loginFunc();
    });
    //绑定注册面板--（马上登录）按钮事件，响应切换登录页面
    $rightModule.find('.textRight').find('a').on('click', function () {
        var thisTextName = $(this).attr('name');
        if (thisTextName === 'login') {
            $registerBtn.parents('.rightBox').addClass('boxHidden');

            $loginBtn.parents('.rightBox').removeClass('boxHidden');
        }
        else if (thisTextName === 'backLogin') {
            $loginBtn.parents('.rightBox').addClass('boxHidden');
            $logoutBtn.parents('.rightBox').addClass('boxHidden');
            $registerBtn.parents('.rightBox').removeClass('boxHidden');
        }
        else if (thisTextName === 'logout') {
            //退出登录相关处理
            logoutFunc();
        }
        else {
            //
            alert('功能正在开发...');
        }

    });
});


//上传注册数据
function uploadRegisterDataFunc() {
    var registerBox = $("#registerBox");
    var loginBox = $("#loginBox");
    var userInfoBox = $("#userInfoBox");
    var username = registerBox.find('input[name="username"]').val();
    var password = registerBox.find('input[name="password"]').val();
    var repassword = registerBox.find('input[name="repassword"]').val();
    //取表单填写数据//
    // TODO 表单数据前端检测等【中英文限制/信息长度/完整度...】如要在用户输入完立马检测可利用input 失去焦点事件触发
    if (username === '') {
        alert('你未输入用户名...');
        // } else if (username.length < 4) {
        //     alert('用户名长度需不小于4位');
    } else {
        //采用 jQuery AJax方式上传
        $.ajax({
            type: 'post',
            url: 'api/user/register',
            data: {
                username: username,
                password: password,
                repassword: repassword
            },
            dataType: 'json',
            success: function (resData) {
                if (resData.code === '0') {
                    alert(resData.message);
                    //切换登录面板等
                    registerBox.addClass('boxHidden');
                    loginBox.removeClass('boxHidden');
                }
                else {
                    alert(resData.message);
                }
            },
            error: function () {
                alert('Error');
            }

        });
    }

}

//用户登录控制
function loginFunc() {
    var loginBox = $("#loginBox");
    var userInfoBox = $("#userInfoBox");
    var username = loginBox.find('input[name="username"]').val();
    var password = loginBox.find('input[name="password"]').val();
    //取表单填写数据//
    if (username === '' || password === '') {
        alert('你的信息未填写完整...')
    }
    else {
        //采用 jQuery AJax方式上传
        $.ajax({
            type: 'post',
            url: 'api/user/login',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function (resData) {
                if (resData.code === '0') {
                    // alert(resData.message);
                    window.location.reload();
                }
                else {
                    alert(resData.message);
                }
            },
            error: function () {
                alert('Error');
            }

        });
    }

}

//用户退出系统
function logoutFunc() {
    // var loginBox = $("#loginBox");
    // var userInfoBox = $("#userInfoBox");
    //
    $.ajax({
        type: 'Get',
        url: 'api/user/logout',
        data: {},
        dataType: 'json',
        success: function (resData) {
            // alert(resData);
            if (resData.code === '0') {
                alert('你已成功退出系统');
                //切换登录面板
                // $logoutBtn.parents(".rightBox").addClass("boxHidden");
                // $loginBtn.parents(".rightBox").removeClass("boxHidden");
                // $registerBtn.parents('.rightBox').addClass('boxHidden');
                //可以直接刷新当前主页面
                window.location.reload();
                //TODO 左侧文章等页面数据切换等
            }


        },
        error: function (err) {
            alert(err);
        }
    });
}