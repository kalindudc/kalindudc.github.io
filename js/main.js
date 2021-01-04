function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

ScrollReveal().reveal("div", {distance: "40px"});
$(".project-item").each(function(){
  ScrollReveal().reveal(this, {delay: getRandomInt(400)});
});

var avatar = document.querySelector('.avatar');

document.addEventListener('click', function(e){
  if (!e.target.classList.contains("avatar")) {
    avatar.classList.remove("avatar-extended");
  }
});

avatar.addEventListener('click', function(e){
  avatar.classList.toggle("avatar-extended");
});