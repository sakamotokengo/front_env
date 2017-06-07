$(function(){
  $('img').error(function(){
    $(this).attr({src:'http://webcreatorbox.com/sample/images/missing.jpg',alt:'画像が見つかりません'});
  });
});
