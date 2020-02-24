(function() {
    var $header = $('.main-header');
    var $nav = $('.main-header__navigation');
    var headerHeight = $header.outerHeight(true);

    if (window.matchMedia("(max-width: 767px)").matches) {
        $nav.css({
            'top': headerHeight + 'px',
            'padding-bottom': headerHeight + 'px'
        });
    }
    var lastPos = 0;
    $(document).on('scroll', function(e) {
        var scrollTop = $(this).scrollTop();

        if (scrollTop >= 500) {
            $header.addClass('slideUp');
        } else {
            $header.removeClass('slideUp');
        }

        if (scrollTop < lastPos) {
            $header.removeClass('slideUp');
        }

        lastPos = scrollTop;
    });

    const mapLink = $('.main-header__info .icon');
    mapLink.on('click', function() {
        $('html, body').animate({ scrollTop: $('#map').offset().top }, 1000);
    });
})();
