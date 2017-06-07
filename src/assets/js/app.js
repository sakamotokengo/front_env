$(function(){
  $('form :input').focus(function() {
    $('label[for="' + this.id + '"]').addClass('labelfocus');
  });
  
  $('form :input').blur(function(){
    $("label[for='" + this.id + "']").removeClass('labelfocus');
  });
});
