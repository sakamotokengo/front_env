$(function(){

  var $fn = {};

  $fn.createMainimg = function (){
    var $target = $('.first-view');

    if($target.length){
      var curNum = 0;
      var maxNum = $target.find('li').length;
      var speed = 5000;
      var $li =$target.find('li');
      console.log($li);
      $li.each(function(){
        var $target = $(this).find('div');
        var imgsrc = $target.html();

        var html = '';
        for (var i = 0;i <28; i++){
          var leftX = 14.3;
          var topY = 25;

          if (i % 7 == 0) leftX = leftX * 0;
          if (i % 7 == 1) leftX = leftX * 1;
          if (i % 7 == 2) leftX = leftX * 2;
          if (i % 7 == 3) leftX = leftX * 3;
          if (i % 7 == 4) leftX = leftX * 4;
          if (i % 7 == 5) leftX = leftX * 5;
          if (i % 7 == 6) leftX = leftX * 6;

          if (i >= 21) {
            topY = topY * 3;
          } else if (i >= 14) {
            topY = topY * 2;
          } else if (i >= 7) {
            topY = topY * 1;
          } else if (i >= 0) {
            topY = topY * 0;
          }
          html += '<span class="img-parts" style="left:'+leftX+'%; top:'+topY+'%;"><span>' + imgsrc + '</span></span>';        }
        $target.html(html);
      });

      $li.eq(0).addClass('js-status-activefirst');
      setInterval(function(){
        curNum = (curNum + 1 < maxNum) ? curNum + 1 : 0;
        $li.removeClass('js-status-activefirst js-status-active');
        $li.eq(curNum).addClass('js-status-active');
      }, speed);
    }
  };

  $fn.slideDownHeader = function(){
    var timing = 350;
    $(window).on('scroll',function(){

      // console.log($(window).scrollTop());
      if($(window).scrollTop() > timing){
        if (!$('#header').hasClass('is-small')){
          $('#header').addClass('is-hidden');
          setTimeout(function(){
            $('#header').addClass('is-small');
            $('#header').removeClass('is-hidden');
          },100);
        }
      }else if($('#header').hasClass('is-small')){
        $('#header').removeClass('is-small');
      }
    });
  };

  $fn.visibleContents = function() {
      var $target = $('.action-visible');
      $target.each(function() {
        if ($(this).offset().top < Math.ceil($(window).height() * 0.7) + $(window).scrollTop()) {
          var $this = $(this);
          var delay = ($(this).attr('data-animDelay')) ? parseInt($(this).attr('data-animDelay'), 10) : 0;
          setTimeout(function(){
            $this.removeClass('action-visible').addClass('status-visible');
          }, delay);
        }
      });
    };

    $(window).on('scroll', function() {
      $fn.visibleContents();
    });

  $(window).on('load', function(){
    $fn.createMainimg();
    $fn.slideDownHeader();
  });

});
