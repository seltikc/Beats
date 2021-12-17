const findeBlock = (alias) => {
  return $(".reviews__displat-item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias
  });
}

$(".interactive-avatar-link").click(e=> {
  e.preventDefault()

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findeBlock(target);
  const curItem = $this.closest(".reviews__switcher-item");


  itemToShow.addClass("reviews__displat-item--active").siblings().removeClass("reviews__displat-item--active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
});