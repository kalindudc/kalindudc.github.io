function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

ScrollReveal().reveal("div", {distance: "20px"});
$(".project-item").each(function(){
  ScrollReveal().reveal(this, {delay: getRandomInt(400)});
});
