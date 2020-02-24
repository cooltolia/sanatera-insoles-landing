(function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        var $hamburger = $('.hamburger');
        var $nav = $('.main-header__navigation');
        var $links = $('.main-nav a');

        $hamburger.click(function() {
            $(this).toggleClass('active');
            $nav.toggleClass('active');
            $('body').toggleClass('menu-opened');
        });

        $links.on('click', function() {
            $hamburger.removeClass('active');
            $nav.removeClass('active');
            $('body').removeClass('menu-opened');
            
            var target = this.hash

            $('html, body').animate({ scrollTop: $(target).offset().top }, 1000);
        });
    }
})();
