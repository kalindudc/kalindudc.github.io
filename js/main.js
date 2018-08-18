(function(){

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

  var navAnims = anime.timeline();
  navAnims.add({
    targets: '#about-item', translateY: 10, offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '#featured-item', translateY: 40, offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '#projects-item', translateY: 70, offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '#resume-item', translateY: 100, offset: 0,
    easing: 'easeInOutQuart'
  }).add({
    targets: '#contact-item', translateY: 130, offset: 0,
    easing: 'easeInOutQuart'
  });

  anime({
    targets: '.site-nav',
    opacity: 1,
    duration: 1000,
    easing: 'linear'
  });

  anime({
    targets: '.site-nav-item',
    easing: 'linear',
    loop: true
  });
}());
