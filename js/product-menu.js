const mesureWidth = item => {
  let reqItemWidth  = 0;

  const screenWidth = $(window).width()
  const container = item.closest(".product-menu");
  const titlesBlocks = container.find(".product-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
  const isTablets = window.matchMedia("(max-width: 768px)").matches;
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  const textContainer = item.find(".product-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  if(isTablets) {
    return screenWidth - titlesWidth;
  }
  if(isMobile) {
    return 90;
  }
  if(!isTablets && !isMobile) {
    return 500;
  }

  // if (isMobile) {
  //   reqItemWidth = screenWidth - titlesWidth;
  // } else {
  //   reqItemWidth = 524;
  // }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = container => {
  const items = container.find(".product-menu-item");
  const content = container.find(".product-menu__content");

  items.removeClass("active");
  content.width(0);
};

const openItem = item => {
  const hiddenContent = item.find(".product-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".product-menu__container")

  item.addClass("active")
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".product-menu__title ").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item =$this.closest(".product-menu-item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".product-menu");

  if (itemOpened) {
    closeEveryItemInContainer(container)
  }else {
    closeEveryItemInContainer(container)
    openItem(item);
  }

});

$(".product-menu__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($(".product-menu"));
})