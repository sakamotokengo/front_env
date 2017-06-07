$(function(){
  $('imgBox img').hide();
});
var i = 0;
var int = 0;
$(window).bind('load',function(){
  var int = setInterval('doThis(i)',500);
});
