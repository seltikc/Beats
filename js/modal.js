const hamburgerButton = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburgerButton.addEventListener("click", function(){
  menu.classList.toggle("overlay--active");
  hamburgerButton.classList.toggle("hamburger--active");
})