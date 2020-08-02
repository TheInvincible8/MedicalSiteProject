$(document).ready(function () {
    $('.navbar__trigger').click(function () {
        $(this).toggleClass('active');
        $('.navbar-nav').slideToggle(300);
    });

    // HIDING NAV
    $(window).scroll(function () {
        if ($(this).scrollTop() < 30) {
            $(".navbar").removeClass('navbar--simple');

        } else {
            $(".navbar").addClass('navbar--simple');
        }

    });



    $('.prodcrous').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        dots: true
    });

});