$(function(){
  $('textarea').keyup(function(){
    var counter = $(this).val().length;
    $('#countUp').text(counter);

    if(counter == 0){
      $('#countUp').text('0');
    }
    if(counter >= 10){
      $('#countUp').css('color','red');
    } else{
      $('#countUp').css('color','#666');
    }
  });
});
