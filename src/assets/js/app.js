$(function(){
  $('.tooltip a').hover(function(){
    $(this).next('span').animate({opacity: 'show',top: "-75"},"slow");},
    function(){
      $(this).next('span').animate({opacity: 'hide',top: '-85'},'fast');
  });
});
