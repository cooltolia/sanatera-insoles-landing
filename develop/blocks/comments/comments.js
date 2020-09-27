(function () {
    const comments = $('.comments');
    if (comments.length === 0) return;

    const slider = $('.comments__slider');
    slider.on('init', function () {
        var testimonials = $('.testimonial');

        setTimeout(function () {
            testimonials.each(function (_, item) {
                var testimonialContent = $(item).find('.testimonial__content');
                if (testimonialContent.length === 1) {
                    new SimpleBar(testimonialContent[0]);
                }
            });
        }, 0);
    });

    slider.slick({
        slidesToShow: 1,
        rows: 0,
        arrows: true,
        adaptiveHeight: true,
    });
})();
