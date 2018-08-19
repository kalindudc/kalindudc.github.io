(function(){

  "use strict";

  if ($(document).width() <= 800) {
    anime({
      targets: '.site-nav',
      translateX: '-200px',
      easing: 'linear'
    });
  }

  var siteOpen = false;

  $(".site-nav-expand").click(function() {
    if (siteOpen) {
      anime({
        targets: '.site-nav',
        translateX: '-200px',
        easing: 'linear'
      });
      $(".site-nav-expand i").removeClass("fa-caret-left");
      $(".site-nav-expand i").addClass("fa-caret-right");
    }
    else {
      anime({
        targets: '.site-nav',
        translateX: '200px',
        easing: 'linear'
      });
      $(".site-nav-expand i").removeClass("fa-caret-right");
      $(".site-nav-expand i").addClass("fa-caret-left");
    }
    siteOpen = !siteOpen;
  });

  $(".site-nav-item").click(function() {
    $(".site-nav-item").removeClass("active-nav");
    $(this).addClass("active-nav");
    $(".site-content-item").removeClass("active-content");
    $("#" + $(this).attr("id").split("-item")[0]).addClass("active-content");
  });

  let multiple = 28;

  var navAnims = anime.timeline();
  navAnims.add({
    targets: '.nav-item-1', translateY: 10+(multiple*0), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-2', translateY: 10+(multiple*1), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-3', translateY: 10+(multiple*2), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-4', translateY: 10+(multiple*3), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-5', translateY: 10+(multiple*4), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-6', translateY: 10+(multiple*5), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-7', translateY: 10+(multiple*6), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-8', translateY: 10+(multiple*7), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-9', translateY: 10+(multiple*8), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-10', translateY: 10+(multiple*9), offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '.nav-item-11', translateY: 10+(multiple*10), offset: 0,
    easing: 'easeInOutQuart'
  });

  anime({
    targets: '.site-nav, .site-content, .site-content-item',
    opacity: 1,
    duration: 2000,
    easing: 'easeInOutQuart'
  });
}());
