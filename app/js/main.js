$.noConflict();
jQuery(document).ready(function($) {
    $('body').removeClass('pageload');

    function measureScrollBar() {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        $('body').append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $('body')[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }

    $header = $('.main-header');
    if ($header.length === 1 && window.matchMedia('(max-width: 767px)').matches) {
        headerHeight = $header.outerHeight();
        $('body').css('padding-top', headerHeight + 'px');
    }

    

    
    

    
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

    
    ;(function () {

    

        var $answer = $('.faq__answer');

        var $question = $('.faq__question');

    

        $question.on('click', function () {

            $(this).addClass('active');

    

            var $nextAnswer = $(this).next('.faq__answer');

    

            $question.not($(this)).each(function () {

                $(this).removeClass('active');

            });

    

            $answer.not($nextAnswer).each(function () {

                $(this).removeClass('active');

                $(this).slideUp(250);

            });

    

            if ($nextAnswer.hasClass('active')) {

                

                $(this).removeClass('active');

                $nextAnswer.removeClass('active');

                $nextAnswer.slideUp(250);

                return;

            }

    

            $nextAnswer.addClass('active');

            $nextAnswer.slideDown(250);

    

        });

    

    })();

    
    

    
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

    
    

    $(window).on('load', function () {

        var mapContainer = $('#map');

        if (mapContainer.length === 0) return;

        

        var zoom = 17;

        var adress;

        var center;

        adress = [59.931524, 30.351719];

        center = adress;

        if ($(window).width() < 480) {

            zoom = 16;

            center = [59.931641, 30.353813];

        }

    

        var $mapFallback = $('.map__fallback');

    

        /** popup */

    

        var $header = $('.map__info-header'),

            $body = $('.map__info-body');

    

        if ($(window).width() <= '767') {

            $header.on('click', function () {

    

                if ($header.hasClass('js-expanded')) {

                    $body.slideUp();

                    $header.removeClass('js-expanded');

                } else {

                    $header.addClass('js-expanded');

                    $body.slideDown();

                }

            })

        }

    

        //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки)

        var check_if_load = false;

        var TRY = 1

    

        function init() {

            if (ymaps.geocode === undefined) {

                // console.log('Попытка номер ' + TRY);

                TRY++

                return ymap();

            }

    

            ymaps.ready(function () {

                var myMap;

                var pointA = "Санкт-Петербург, метро Маяковская",

                    pointB = adress,

                    multiRoute = new ymaps.multiRouter.MultiRoute({

                        referencePoints: [

                            pointA,

                            pointB

                        ],

                        params: {

                            //Тип маршрутизации - пешеходная маршрутизация.

                            routingMode: 'pedestrian',

                        },

                    }, {

                        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.

                        //boundsAutoApply: true

                        wayPointIconLayout: "none",

                        routeActivePedestrianSegmentStrokeStyle: "solid",

                        routeActivePedestrianSegmentStrokeColor: "#ff0000"

                    });

                // ymaps.geocode(adress).then(function (res) {

                //     console.log(res.geoObjects.get(0).geometry.getCoordinates());

                    

                    myMap = new ymaps.Map('map', {

                        center: center,

                        zoom: zoom

                    });

                    var myPlacemark = new ymaps.Placemark(adress, {

                        hintContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',

                        balloonContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)'

                    }, {

                        // Опции.

                        // Необходимо указать данный тип макета.

                        iconLayout: 'default#image',

                        // Своё изображение иконки метки.

                        iconImageHref: 'images/icons/map-icon.png',

                        // Размеры метки.

                        iconImageSize: [30, 30],

                        // Смещение левого верхнего угла иконки относительно

                        // её "ножки" (точки привязки).

                        iconImageOffset: [-15, -30]

                    });

    

                    var layer = myMap.layers.get(0).get(0);

                    // Отслеживаем событие окончания отрисовки тайлов.

                    waitForTilesLoad(layer).then(function () {

                        console.log('Карта загружена');

                    });

    

    

                    myMap.geoObjects.add(myPlacemark);

                    myMap.geoObjects.add(multiRoute);

                    myMap.behaviors.disable('scrollZoom');

                });

    

            // });

    

    

        }

    

        // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 

        function waitForTilesLoad(layer) {

            return new ymaps.vow.Promise(function (resolve, reject) {

                var tc = getTileContainer(layer),

                    readyAll = true;

                tc.tiles.each(function (tile, number) {

                    if (!tile.isReady()) {

                        readyAll = false;

                    }

                });

                if (readyAll) {

                    resolve();

                } else {

                    tc.events.once("ready", function () {

                        resolve();

                    });

                }

            });

        }

    

        function getTileContainer(layer) {

            for (var k in layer) {

                if (layer.hasOwnProperty(k)) {

                    if (

                        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||

                        layer[k] instanceof ymaps.layer.tileContainer.DomContainer

                    ) {

                        return layer[k];

                    }

                }

            }

            return null;

        }

    

        // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)

        function loadScript(url, callback) {

            var script = document.createElement("script");

    

            if (script.readyState) { // IE

                script.onreadystatechange = function () {

                    if (script.readyState == "loaded" ||

                        script.readyState == "complete") {

                        script.onreadystatechange = null;

                        callback();

                    }

                };

            } else { // Другие браузеры

                script.onload = function () {

                    callback();

                };

            }

    

            script.src = url;

            document.getElementsByTagName("head")[0].appendChild(script);

        }

    

        // Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"

        var ymap = function () {

    

            loadScript("https://api-maps.yandex.ru/2.1/?apikey=2efe2353-6e9b-4f4f-8804-395887835361&lang=ru_RU&load=Map&loadByRequire=1", function () {

                ymaps.load(init);

            });

        }

    

        $(function () {

            ymap();

    

        });

    })

    

    
    

    ;(function() {

        $modal = $('#modal1');

        $modal.on("show.bs.modal", function (event) {

                var invoker = $(event.relatedTarget);

    

                var xhr = new XMLHttpRequest();

    

                var currentModal = $(this);

                var currentForm = $(this).find('form');

                var formName = currentForm.attr('name');

    

                var firstInput = $(this).find('input')[0];

                if (firstInput) {

                    firstInput.focus()

                }

    

    

                var mobileInput = $(this).find('input[name="phone"]');

                var submit = $(this).find('.modal-submit');

    

                var invokerText = invoker.data('button');

                submit.text(invokerText || 'Отправить');

    

                currentForm.on('submit', function (e) {

                    e.preventDefault();

    

                    xhr.onreadystatechange = function () {

                        if (xhr.readyState === 4) {

                            mobileInput.val('');

                            submit.removeClass("loading");

    

                            if (xhr.status === 200) {

                                $('#success').modal();

                                currentForm.off()

                            } else {

                                currentForm.off()

                                alert("Возникла ошибка при отправке формы. Код ошибки: " + xhr.status + " " + xhr.statusText);

                            }

                        }

                    };

    

                    currentModal.modal('hide');

                    var formData = new FormData(document.forms[formName]);

                    xhr.open("POST", "sendform.php", true);

                    xhr.send(formData);

                });

            });

    

    })()

    
    ;

    (function () {

        

        var $slider = $('.problems-slider__slider-inner');

        

        if ($slider.length > 0) {

            var $items = $('.problems-slider__item');

    

            $slider.slick({

                infinite: false,

                slidesToShow: 2,

                slidesToScroll: 2,

                mobileFirst: true,

                responsive: [{

                    breakpoint: 767,

                    settings: {

                        slidesToShow: 4,

                        slidesToScroll: 4,

                    }

                }]

            });

    

            var total = $slider.slick("getSlick").slideCount;

    

            var lastSlide;

            $slider.on('afterChange', function (event, slick, currentSlide) {

    

                if (lastSlide === currentSlide && lastSlide !== 0) {

                    $slider.slick('slickGoTo', 0);

                }

                lastSlide = currentSlide;

    

            });

            $items.each(function () {

                var $this = $(this);

                var title = $this.find('.problems-slider__text').html()

                var desc = $this.find('.problems-slider__description').html()

                $this.on('click', function () {

                    var modal = $('#problems-description')

                    modal.find('.problems-slider__description-modal-title').html(title);

                    modal.find('.problems-slider__description-modal-text').html(desc);

    

                    modal.modal()

                })

            })

        }

    

        

    })();

    
    (function() {

        $(':input').inputmask();

    

        function inputPhoneValidate() {

            var enteredPhone = inputPhone.val();

            return Inputmask.isValid(enteredPhone, {

                mask: phoneMask,

            });

        }

    

        var phoneMask = '+7 (999) 999-99-99';

        var inputPhone = $('.quiz__question-phone input');

        inputPhone.inputmask({

            mask: phoneMask,

            showMaskOnHover: false,

        });

    

        var quizSlider = $('.quiz__slider');

    

        var $currentSlide = $('.quiz__controls .current');

        var $totalSlides = $('.quiz__controls .total');

    

        var $prevButton = $('.quiz__previous');

        var $nextButton = $('.quiz__next');

    

        var $progressBar = $('.quiz__progress-bar');

    

        var totalSlides;

    

        // answers.on('change', function() {

        //     $nextButton.attr('disabled', false);

        // });

    

        quizSlider.on('init', function(e, slick) {

            totalSlides = slick.$slides.length;

            $totalSlides.text(totalSlides);

    

            updateStatus(slick.currentSlide, totalSlides);

    

            var answers = $(slick.$slides[slick.currentSlide]).find('.quiz__question-answer input');

    

            answers.on('change', function() {

                $nextButton.attr('disabled', false);

            });

        });

    

        quizSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {

            updateStatus(nextSlide, totalSlides);

            if (nextSlide === 0) {

                $prevButton.attr('disabled', true);

            } else {

                $prevButton.attr('disabled', false);

            }

    

            var answers = $(slick.$slides[nextSlide]).find('.quiz__question-answer input');

            var checkedAnswer = answers.filter(':checked');

    

            if (checkedAnswer.length > 0) {

                $nextButton.attr('disabled', false);

            } else {

                $nextButton.attr('disabled', true);

            }

    

            answers.on('change', function() {

                $nextButton.attr('disabled', false);

            });

    

            if (nextSlide === totalSlides - 1) {

                $('.quiz__controls').hide();

                $('.quiz__progress').hide();

            }

        });

    

        quizSlider.slick({

            slidesToShow: 1,

            rows: 0,

            arrows: false,

            adaptiveHeight: true,

            swipe: false,

            infinite: false,

        });

    

        $nextButton.on('click', function() {

            quizSlider.slick('slickNext');

        });

    

        $prevButton.on('click', function() {

            quizSlider.slick('slickPrev');

        });

    

        quizSlider.on('submit', function(e) {

            e.preventDefault();

    

            var phoneValid = inputPhoneValidate();

            if (!phoneValid) return

    

            const data = $(this).serialize();

            $.ajax({

                type: 'POST',

                url: '/sendmail.php',

                data: data,

                success: function(data) {

                    /** do something, I guess */

                },

                error: function(data) {

                    alert('Тут, полагаю, нужна модалка')

                }

            });

        });

    

        function updateStatus(slideIndex, totalSlides) {

            var currentSlide = slideIndex + 1;

            $currentSlide.text(currentSlide);

    

            var currentProgress = currentSlide / totalSlides;

            $progressBar.css('transform', 'scaleX(' + currentProgress + ')');

        }

    })();

    

    
    ;

    (function () {

        function initSlider() {

            $('.sertificates__list').slick({

                mobileFirst: true,

                slidesToShow: 1,

                arrows: true,

                dots: false,

                infinite: false,

                centerMode: true,

                centerPadding: '0',

                // variableWidth: true,

                // autoplay: true,

                autoplaySpeed: 3000,

                adaptiveHeight: true,

                responsive: [

                    {

                        breakpoint: 767,

                        settings: {

                            slidesToShow: 3,

                            slidesToScroll: 1,

                            centerMode: false,

                            // centerPadding: '12px',

                        }

                    },

                    {

                        breakpoint: 1240,

                        settings: {

                            slidesToShow: 4,

                            slidesToScroll: 1,

                            centerMode: false,

                        }

                    },

                ]

            });

        }

    

        initSlider();

    

    })();

    
    

    
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

    

    
    ;

    (function () {

        function initSlider() {

            $('.specialists__list').slick({

                mobileFirst: true,

                slidesToShow: 1,

                arrows: true,

                dots: false,

                infinite: true,

                centerMode: true,

                centerPadding: '0',

                // variableWidth: true,

                // autoplay: true,

                autoplaySpeed: 3000,

                adaptiveHeight: true,

            });

        }

    

        initSlider();

    

    })();

    
    

    
    

    
    

    
    
});
