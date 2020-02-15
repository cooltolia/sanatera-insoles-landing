(function() {
    const comments = $('.comments');
    if (comments.length === 0) return;

    const slider = $('.comments__slider');
    slider.slick({
        slidesToShow: 1,
        rows: 0,
        arrows: true,
        adaptiveHeight: true,
    });
})();