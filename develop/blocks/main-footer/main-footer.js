(function () {
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    $(window).resize(function () {
        isMobile = window.matchMedia('(max-width: 767px)').matches;
    });

    $('.footer-phone a').on('click', function (event) {
        if (!isMobile) {
            event.preventDefault();
            var $this = $(this);
            var target_selector = $this.attr('data-target');
            $(target_selector).modal('show', $this);
        }
    });
})();
