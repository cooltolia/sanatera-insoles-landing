;
(function () {
    
    var $slider = $('.problems-slider__slider-inner');
    
    if ($slider.length > 0) {
        var $items = $('.problems-slider__item');

        $slider.slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            mobileFirst: true,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }]
        });

        var total = $slider.slick("getSlick").slideCount;

        var lastSlide;
        $slider.on('afterChange', function (event, slick, currentSlide) {

            if (lastSlide === currentSlide && lastSlide !== 0) {
                $slider.slick('slickGoTo', 0);
            }
            lastSlide = currentSlide;

        });
        $items.each(function () {
            var $this = $(this);
            var title = $this.find('.problems-slider__text').html()
            var desc = $this.find('.problems-slider__description').html()
            $this.on('click', function () {
                var modal = $('#problems-description')
                modal.find('.problems-slider__description-modal-title').html(title);
                modal.find('.problems-slider__description-modal-text').html(desc);

                modal.modal()
            })
        })
    }

    
})();