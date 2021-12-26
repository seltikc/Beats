const section = $("section");
const display = $(".maincontent");
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.first().addClass("active");

const performTransition = sectionEq => {

  if(inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sideMenu = $(".fixed-menu");

    if(menuTheme !== "black") {
      sideMenu.addClass("fixed-menu--white");
    }else {
      sideMenu.removeClass("fixed-menu--white");
    }

  display.css({
    transform: `translateY(${position}%)`,
  });

  section.eq(sectionEq).addClass("active").siblings().removeClass("active");

  setTimeout(() => {
    inScroll = false;
    sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");

  }, 1300);
  } 
};

const scrollViewport = direction => {
  const activeSection = section.filter(".active");
  const nextSection = activeSection.next()
  const prevSection = activeSection.prev()
  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index())
  }
  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index())
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if(deltaY > 0) {
    scrollViewport("next")
  }

  if(deltaY < 0) {
    scrollViewport("prev")
  }

});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {

    switch (e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;
    
      case 40:
        scrollViewport("next");
        break;
    }
  }

});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if (isMobile) {
  $("body").swipe( {
    swipe: function(event, direction) {
      const scroller = viewportScroller()
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    }
  });
}


