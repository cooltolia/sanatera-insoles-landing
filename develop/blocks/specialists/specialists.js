;
(function () {
    function initSlider() {
        $('.specialists__list').slick({
            mobileFirst: true,
            slidesToShow: 1,
            arrows: true,
            dots: false,
            infinite: true,
            centerMode: true,
            centerPadding: '0',
            // variableWidth: true,
            // autoplay: true,
            autoplaySpeed: 3000,
            adaptiveHeight: true,
        });
    }

    initSlider();

})();