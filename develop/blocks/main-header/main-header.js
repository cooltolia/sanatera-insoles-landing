(function () {
    var $header = $('.main-header');
    var $nav = $('.main-header__navigation');
    var headerHeight = $header.outerHeight(true);

    var headerContacts = $('.main-header__contact');

    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    $(window).resize(function () {
        isMobile = window.matchMedia('(max-width: 767px)').matches;
    });

    headerContacts.on('click', function (event) {
        if (!isMobile) {
            event.preventDefault();
            var $this = $(this);
            var target_selector = $this.attr('data-target');
            $(target_selector).modal('show', $this);
        }
    });

    // if (window.matchMedia("(max-width: 767px)").matches) {
    //     $nav.css({
    //         'top': headerHeight + 'px',
    //         'padding-bottom': headerHeight + 'px'
    //     });
    // }
    var lastPos = 0;
    $(document).on('scroll', function (e) {
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

    var contactsTrigger = $('.main-header__trigger-contacts');
    var contacts = $('.main-header__contacts');
    var contactsBackdrop = $('.main-header__contacts-backdrop');

    if (contactsTrigger.length > 0) {
        contactsTrigger.on('click', function (e) {
            e.preventDefault();
            contacts.fadeIn(300);
        });

        contactsBackdrop.on('click', function () {
            contacts.fadeOut(300);
        });
    }
})();
