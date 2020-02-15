;
(function () {
    function initSlider() {
        $('.sertificates__list').slick({
            mobileFirst: true,
            slidesToShow: 1,
            arrows: true,
            dots: false,
            infinite: false,
            centerMode: true,
            centerPadding: '0',
            // variableWidth: true,
            // autoplay: true,
            autoplaySpeed: 3000,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: false,
                        // centerPadding: '12px',
                    }
                },
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        centerMode: false,
                    }
                },
            ]
        });
    }

    initSlider();

})();