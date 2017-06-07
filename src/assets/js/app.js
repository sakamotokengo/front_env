$(function(){
  $(".deleteBox .delete").click(function(){
    $(this).parents('deleteBox').animate({opacity: 'hide'}, 'slow');
  });
});
