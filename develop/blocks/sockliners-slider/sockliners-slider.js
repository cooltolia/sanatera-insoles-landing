;(function() {

    var allBlocks = $('.sockliners-slider__content');
    var activeContent  = $('.sockliners-slider__content.active');
    var contentWrapper = $('.sockliners-slider__content-wrapper');

    var switchers = $('.sockliners-slider__switcher');

    var calcHeight = activeContent.outerHeight();


    if (!calcHeight) return

    contentWrapper.css('height', calcHeight + 'px');

    switchers.each(function() {
        $(this).on('click', function () {
            switchers.each(function() {
                $(this).removeClass('active');
            })

            $(this).addClass('active');
            var target = $(this).attr('data-for');

            var content = $('#' + target);
            allBlocks.each(function() {
                $(this).removeClass('active');
            })
            var newHeight = content.outerHeight();
            contentWrapper.css('height', newHeight + 'px');
            content.addClass('active');
        })
    })


    $('.sockliners-slider__slider').each(function(index, container) {
        var thumbs = $(this).siblings('.sockliners-slider__thumbs');

        if (container.children.length == 1) return;
        
        $(this).on('init', function (event, slick) {
            var slider = slick.$slider;
            var parentContent = slider.parent('.sockliners-slider__col').parent('.sockliners-slider__content');
            var dots = parentContent.find('.sockliners-slider__color-item');
            checkActiveDot(dots, 0, 0);
        });

        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: thumbs,
        });

    })

    $('.sockliners-slider__thumbs').each(function (index, container) {
        var slider = $(this).prev('.sockliners-slider__slider');

        if (container.children.length == 1) {
            container.style.display = 'none';
            return;
        };

        $(this).slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: slider,
            dots: false,
            arrows: false,
            focusOnSelect: true
        });

    })

    $('.sockliners-slider__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

        var slider = slick.$slider;
        var parentContent = slider.parent('.sockliners-slider__col').parent('.sockliners-slider__content');
        var dots = parentContent.find('.sockliners-slider__color-item');
     
        checkActiveDot(dots, currentSlide, nextSlide);
    });

    var dots = $('.sockliners-slider__color-item');

    dots.click(function () {
        var slideNumber = $(this).data('slide');
        var parentContent = $(this).closest('.sockliners-slider__content');
                                   
        var slider = parentContent.find('.sockliners-slider__slider');

        if (slider.children().length == 1) return;
        slider.slick('slickGoTo', slideNumber - 1);
    });

    function checkActiveDot(dots, currentSlide, nextSlide) {
        dots.each(function () {
            $(this).removeClass('active');
            var slideID = $(this).attr('data-slide');
            var nextSlideID = nextSlide + 1;
            if (slideID == nextSlideID) {
                $(this).addClass('active');
            }
        })
    }

  
})();
