$(document).ready(function(){
  $(".products").slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll:1,
    speed: 1000,
    easing: "ease",
    infinite: true,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover:true,
  });
});


