
$(function(){
	

var common = common || {};

// ajax 提交之前触发
$(document).ajaxSend(function () {
    if ($('.mask')[0]) {
        $('.mask').show();
    } else {
        $('<div class="mask"><i class="fa fa-spinner fa-pulse"></i><span>注册成功，正在跳转...</span></div>').appendTo('body').show();
    }
})


})

