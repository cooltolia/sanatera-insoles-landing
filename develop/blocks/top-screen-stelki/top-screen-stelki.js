(function() {
    var topScreenStelki = $('.top-screen-stelki');
    if (topScreenStelki.length === 0) return;

    if (window.matchMedia('(max-width: 480px)').matches) {
        var video = topScreenStelki.find('video source');
        video.attr('src','video/stelki_m.mp4');
    }
})()