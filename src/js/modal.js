const hamburgerButton = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

function toggleMenu() {
  menu.classList.toggle("overlay--active");
  hamburgerButton.classList.toggle("hamburger--active");
  document.body.classList.toggle("locked");
  // window.isScrollBlocked = !window.isScrollBlocked; Не вызываются меню - не переходят

}

hamburgerButton.addEventListener("click", toggleMenu);

menu.addEventListener("click", e => {
  const target = e.target;
  if (target.classList.contains("menu__link")) {
      toggleMenu();
  }
})