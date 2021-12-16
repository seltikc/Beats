const openItem = item => {
  const wrapper = item.closest(".team__item");
  const contentBlock = wrapper.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  wrapper.addClass("active")
  contentBlock.height(reqHeight);
}

const closeItem = wrapper => {
  const items = wrapper.find(".team__content");
  const itemWrapper = wrapper.find(".team__item")


  itemWrapper.removeClass("active")
  items.height(0);
}

$(".team__title").click(e => {
  const thise = $(e.currentTarget);
  const wrapper = thise.closest(".team");
  const elementWrapper = thise.closest(".team__item")

  if (elementWrapper.hasClass("active") ) {
    closeItem(wrapper);
  }else {
    closeItem(wrapper);
    openItem(thise);
  }

  
})