$(function(){
  $('.toTop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    },1600);
    return false;
  });
});
