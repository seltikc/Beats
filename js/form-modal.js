
$(".form").submit(e => {
  e.preventDefault();

  $.fancybox.open({
    src: ".modal-form",
    type: "inline"
  })
});

$(".app-submit-btn").click(e => {
  e.preventDefault();

  $.fancybox.close({
    src: ".modal-form",
    type: "inline"
  });
})