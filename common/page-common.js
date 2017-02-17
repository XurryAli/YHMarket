$(function(){
	

var common = common || {};

$('.header-load').load("header.html?" + Math.random());

$('.footer-load').load("footer.html?" + Math.random())

return false;

})