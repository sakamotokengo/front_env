$(function(){
  $('.checkbox').change(function(){
    if($(this).is(':checked')){
      $(this).next('label').addClass('LabelSelected');
    }else{
      $(this).next('label').removeClass('LabelSelected');
    }
  });
  $('.radio').change(function(){
    if($(this).is(':checked')){

      $('.RadioSelected:not(:checked)').removeClass('RadioSelected');
      $(this).next('label').addClass('RadioSelected');
    }
  });
});
