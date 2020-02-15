$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

    function measureScrollBar() {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        $('body').append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $('body')[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }

    // $header = $('.main-header');
    // if ($header.length === 1) {
    //     headerHeight = $header.outerHeight();
    //     $('body').css('padding-top', headerHeight + 'px');
    // }

    //=require ../blocks/**/*.js 
});
