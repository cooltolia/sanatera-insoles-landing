;(function() {
    $linksToSubnav = $('.main-nav__link.hasSubnav');

    if (window.matchMedia("(max-width: 767px)").matches) {
        $linksToSubnav.each(function(i, item) {
            $(item).on('click', function() {
                var subnav = $(item).next();
                subnav.slideToggle();
            })
        })
    }
})()