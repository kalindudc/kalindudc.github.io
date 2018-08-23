(function(){

  "use strict";

  var curSec = 0;
  var secs = ["#about", "#featured", "#projects", "#resume", "#contact"];
  var secsNav = ["#about-item", "#featured-item", "#projects-item", "#resume-item", "#contact-item"];
  
  $(".next-button").click(function() {
    curSec = (curSec + 1) % secs.length;
    selectNext();
  });

  $(".navbar-item").click(function() {
    curSec = $(this).attr("data-index");
    selectNext();
  });

  function selectNext() {
    $(".navbar-item").removeClass("active-nav");
    $(secsNav[curSec]).addClass("active-nav");
    $(".content-item").removeClass("active-content");
    $(secs[curSec]).addClass("active-content");
        
  }



}());
