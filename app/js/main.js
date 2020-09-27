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

    
    function loadYandexMap(url) {

        return new Promise(function (resolve) {

            if (typeof ymaps !== 'undefined') {

                resolve();

            } else {

                const yandexMapUrl = url;

                // const yandexMapUrl =

                //     'https://api-maps.yandex.ru/2.1/?apikey=6cabbeea-5917-4375-b061-36a551dae260&lang=ru_RU';

                const yandexMapScript = document.createElement('script');

                yandexMapScript.type = 'text/javascript';

                yandexMapScript.src = yandexMapUrl;

                document.body.appendChild(yandexMapScript);

    

                yandexMapScript.onload = function () {

                    resolve();

                };

            }

        });

    }

    

    $(window).on('load', function () {

        var mapContainer = $('#map');

        if (mapContainer.length === 0) return;

    

        var myMap;

    

        var activeCity = mapSwitching();

    

        loadYandexMap('https://api-maps.yandex.ru/2.1/?apikey=2efe2353-6e9b-4f4f-8804-395887835361&lang=ru_RU').then(

            function () {

                init();

            }

        );

    

        var placemarkOptions = {

            iconLayout: 'default#image',

            iconImageHref: '/images/icons/map-icon.png',

            iconImageSize: [30, 30],

            iconImageOffset: [-15, -30],

        };

    

        var multiRouteOptions = {

            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.

            //boundsAutoApply: true

            wayPointIconLayout: 'none',

            routeActivePedestrianSegmentStrokeStyle: 'solid',

            routeActivePedestrianSegmentStrokeColor: '#ff0000',

        };

    

        var zoom = 17;

        var spbAddress = [59.931524, 30.351719];

        var moscowAddress = [55.78081961083188, 37.60234272023768];

    

        if ($(window).width() < 480) {

            zoom = 16;

            spbAddress = [59.931641, 30.353813];

            moscowAddress = [55.78059739429505, 37.60061269542307];

        }

    

        function init() {

            ymaps.ready(function () {

                var center = activeCity === 'moscow' ? moscowAddress : spbAddress;

    

                myMap = new ymaps.Map('map', {

                    center: center,

                    zoom: zoom,

                    controls: ['zoomControl'],

                });

                var spbPlacemark = new ymaps.Placemark(

                    spbAddress,

                    {

                        hintContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',

                        balloonContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',

                    },

                    placemarkOptions

                );

    

                var moscowPlacemark = new ymaps.Placemark(

                    moscowAddress,

                    {

                        hintContent:

                            'г. Москва, ст. м. Новослободская, БЦ "Сущевский", ул.Сущёвская, д. 12, стр. 1, 3 подъезд, 2 эт., пом. 5',

                        balloonContent:

                            'г. Москва, ст. м. Новослободская, БЦ "Сущевский", ул.Сущёвская, д. 12, стр. 1, 3 подъезд, 2 эт., пом. 5',

                    },

                    placemarkOptions

                );

    

                var spbMultiRoute = new ymaps.multiRouter.MultiRoute(

                    {

                        referencePoints: ['Санкт-Петербург, метро Маяковская', spbAddress],

                        params: {

                            //Тип маршрутизации - пешеходная маршрутизация.

                            routingMode: 'pedestrian',

                        },

                    },

                    multiRouteOptions

                );

    

                var moscowMultiRoute = new ymaps.multiRouter.MultiRoute(

                    {

                        referencePoints: ['Москва, метро Новослободская', moscowAddress],

                        params: {

                            //Тип маршрутизации - пешеходная маршрутизация.

                            routingMode: 'pedestrian',

                        },

                    },

                    multiRouteOptions

                );

    

                myMap.geoObjects.add(spbPlacemark);

                myMap.geoObjects.add(moscowPlacemark);

                myMap.geoObjects.add(spbMultiRoute);

                myMap.geoObjects.add(moscowMultiRoute);

                myMap.behaviors.disable('scrollZoom');

            });

    

            // });

        }

    

        function mapSwitching() {

            var mapSwitcher = document.querySelector('.map__contacts-switchers');

            if (!mapSwitcher) return;

            var contactsData = Array.from(document.querySelectorAll('.map__contacts-data'));

            var switcher = mapSwitcher.querySelector('.switcher');

    

            var mapSwitcherWidth = mapSwitcher.getBoundingClientRect().width;

            var activeBtn = mapSwitcher.querySelector('button.active');

            var btnWidth = activeBtn.offsetWidth;

            switcher.style.width = btnWidth + 'px';

    

            if (activeBtn.dataset.action === 'moscow') {

                switcher.style.left = '2px';

            } else {

                switcher.style.left = mapSwitcherWidth - btnWidth - 2 + 'px';

            }

    

            mapSwitcher.addEventListener('click', (e) => {

                if (myMap === undefined) return;

    

                var mapSwitcherWidth = mapSwitcher.getBoundingClientRect().width;

                var target = e.target;

                var action = target.dataset.action;

    

                var switcherBtns = Array.from(mapSwitcher.children);

    

                if (target.classList.contains('active')) return;

                switcherBtns.forEach((btn) => btn.classList.remove('active'));

    

                mapSwitcher.classList.add('disabled');

                var targetWidth = target.offsetWidth;

                target.classList.add('active');

                switcher.style.width = targetWidth + 'px';

    

                var activeData = contactsData.find((data) => data.classList.contains('active'));

                var relatedData = contactsData.find((data) => data.dataset.city === action);

    

                if (action === 'moscow') {

                    switcher.style.left = '2px';

    

                    myMap.panTo(moscowAddress, {

                        duration: 1000,

                    });

                } else {

                    myMap.panTo(spbAddress, {

                        duration: 1000,

                    });

                    switcher.style.left = mapSwitcherWidth - targetWidth - 2 + 'px';

                }

    

                $(activeData).fadeOut(160, function () {

                    activeData.classList.remove('active');

                    relatedData.classList.add('active');

                    $(relatedData).fadeIn(160, function () {

                        mapSwitcher.classList.remove('disabled');

                    });

                });

            });

    

            return activeBtn.dataset.action;

        }

    });

    

    
    (function () {

        $modal1 = $('#modal1');

        $modal2 = $('#modal2');

    

        $modal1.on('show.bs.modal', function (e) {

            modalLogic(e);

        });

        $modal2.on('show.bs.modal', function (e) {

            modalLogic(e);

        });

    

        function modalLogic(event) {

            var xhr = new XMLHttpRequest();

    

            var currentModal = $(event.currentTarget);

            var $relatedTarget = $(event.relatedTarget);

            console.log(' $relatedTarget: ',  $relatedTarget);

            var currentForm = currentModal.find('form');

            var formName = currentForm.attr('name');

    

            var city = $relatedTarget.attr('data-city');

            var $city_selector = currentModal.find('input:radio[name="city"]');

            $city_selector.attr('checked', false);

            if (city) {

                $city_selector.filter('[value="' + city + '"]').attr('checked', true);

            } else {

                $city_selector.filter(':first').attr('checked', true);

            }

    

            var firstInput = currentModal.find('input')[0];

            if (firstInput) {

                firstInput.focus();

            }

    

            var phoneInput = currentModal.find('input[name="modal_tel"]');

            function inputPhoneValidate() {

                debugger;

                var enteredPhone = phoneInput.val();

                return Inputmask.isValid(enteredPhone, {

                    mask: phoneMask,

                });

            }

    

            var phoneMask = '+7 (999) 999-99-99';

            phoneInput.inputmask({

                mask: phoneMask,

                showMaskOnHover: false,

            });

    

            var nameInput = currentModal.find('input[name="name"]');

            var submit = currentModal.find('.modal-submit');

    

            currentForm.on('submit', function (e) {

                e.preventDefault();

    

                currentModal.modal('hide');

                xhr.onreadystatechange = function () {

                    if (xhr.readyState === 4) {

                        phoneInput.val('');

                        nameInput.val('');

    

                        submit.removeClass('loading');

    

                        if (xhr.status === 200) {

                            var response = JSON.parse(xhr.response);

                            window.location.href = window.location.hostname + '/spasibo-za-zajavku/';

                            currentForm.off();

                        } else {

                            currentForm.off();

                            currentModal.modal('hide');

                            alert('Возникла ошибка при отправке формы. Код ошибки: ' + xhr.status + ' ' + xhr.statusText);

                        }

                    }

                };

    

                var formData = new FormData(document.forms[formName]);

                xhr.open('POST', '/wp-content/themes/sanatera/formSubmit.php', true);

                xhr.send(formData);

            });

        }

    })();

    

    
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

    
    (function () {

        var inputPhone = $('.quiz__final-phone input');

        function inputPhoneValidate() {

            var enteredPhone = inputPhone.val();

            return Inputmask.isValid(enteredPhone, {

                mask: phoneMask,

            });

        }

    

        var phoneMask = '+7 (999) 999-99-99';

        inputPhone.inputmask({

            mask: phoneMask,

            showMaskOnHover: false,

        });

        // inputPhone.mask('+7 (999) 999-99-99');

    

        var quizSlider = $('.quiz__slider');

    

        var $currentSlide = $('.quiz__controls .current');

        var $totalSlides = $('.quiz__controls .total');

    

        var $prevButton = $('.quiz__previous');

        var $nextButton = $('.quiz__next');

    

        var $progressBar = $('.quiz__progress-bar');

    

        var totalSlides;

    

        var selectedBranch;

    

        // answers.on('change', function() {

        //     $nextButton.attr('disabled', false);

        // });

    

        quizSlider.on('init', function (e, slick) {

            totalSlides = slick.$slides.length;

            $totalSlides.text(totalSlides);

    

            updateStatus(slick.currentSlide, totalSlides);

    

            var answers = $(slick.$slides[slick.currentSlide]).find('.quiz__question-answer input');

    

            answers.on('change', function () {

                selectedBranch = $(this).data('question');

                $nextButton.attr('disabled', false);

            });

        });

    

        var cb;

    

        quizSlider

            .on('beforeChange', function (e, slick, currentSlide, nextSlide) {

                updateStatus(nextSlide, totalSlides);

    

                if (nextSlide === slick.$slides.length - 1) {

                    setTimeout(function () {

                        inputPhone.focus();

                    }, 500);

                }

    

                var slideDirection;

                if (Math.abs(nextSlide - currentSlide) === 1) {

                    slideDirection = nextSlide - currentSlide > 0 ? 'right' : 'left';

                } else {

                    slideDirection = nextSlide - currentSlide > 0 ? 'left' : 'right';

                }

    

                var nextStep = slick.$slides[nextSlide];

    

                if (nextSlide === 0) {

                    $prevButton.attr('disabled', true);

                } else {

                    cb = toggleQuestions($(nextStep), slideDirection);

                    $prevButton.attr('disabled', false);

                }

    

                var answers = $(slick.$slides[nextSlide]).find('.quiz__question-answer input');

                var checkedAnswer = answers.filter(':checked');

    

                if (checkedAnswer.length > 0) {

                    $nextButton.attr('disabled', false);

                } else {

                    $nextButton.attr('disabled', true);

                }

    

                answers.on('change', function () {

                    $nextButton.attr('disabled', false);

                });

    

                if (nextSlide === totalSlides - 1) {

                    $('.quiz__controls').hide();

                    $('.quiz__progress').hide();

                }

            })

            .on('afterChange', function () {

                $([document.documentElement, document.body]).animate(

                    {

                        scrollTop: quizSlider.offset().top - 120,

                    },

                    200

                );

    

                if (typeof cb === 'function') {

                    setTimeout(function () {

                        cb();

                        console.log('cb');

                        cb = null;

                    }, 0);

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

    

        $nextButton.on('click', function () {

            quizSlider.slick('slickNext');

        });

    

        $prevButton.on('click', function () {

            quizSlider.slick('slickPrev');

        });

    

        quizSlider.on('submit', function (e) {

            e.preventDefault();

    

            var formData = {

                comment: '',

                tel: inputPhone.val()   

            };

    

            var allQuestions = quizSlider.find('.quiz__question');

            allQuestions.each(function (_, question) {

                var title = $(question).find('.quiz__question-title').text().trim();

                var checkedAnwers = $(question).find('input:checked');

                if (checkedAnwers.length === 0) return;

                var checkedAnswersString = '';

                checkedAnwers.each(function (_, answer) {

                    checkedAnswersString += $(answer).val() + '; ';

                });

                formData.comment += '\n' + title + ': ' + checkedAnswersString;

            });

    

            console.log(formData.comment);

    

            afterSubmit('Спасибо, мы уже изучаем ваши ответы и свяжемся в течение 5 минут');

    

    

            $.ajax({

                type: 'POST',

                url: '/formSubmit.php',

                data: formData,

                success: function (data) {

                    afterSubmit('Спасибо, мы уже изучаем ваши ответы и свяжемся в течение 5 минут');

                },

                error: function (data) {

                    afterSubmit('Произошла ошибка при отправке формы');

                },

            });

        });

    

        function afterSubmit(title) {

            $('.quiz__final-text').hide();

            $('.quiz__final-phone').hide();

            $('.quiz__submit').hide();

    

            $('.quiz__final-title').text(title);

    

            quizSlider.slick('setPosition');

        }

    

        function updateStatus(slideIndex, totalSlides) {

            var currentSlide = slideIndex + 1;

            $currentSlide.text(currentSlide);

    

            var currentProgress = currentSlide / totalSlides;

            $progressBar.css('transform', 'scaleX(' + currentProgress + ')');

        }

    

        function toggleQuestions(step, slideDirection) {

            var questions = step.find('.quiz__question');

            var targetQuestion;

    

            if (questions.length > 1) {

                questions.each(function (_, q) {

                    $(q).hide();

                    var answers = step.find('.quiz__question-answer input');

                    answers.attr('disabled', true);

                });

    

                targetQuestion = questions.filter("[data-type='" + selectedBranch + "']");

            } else {

                targetQuestion = $(questions[0]);

            }

    

            var targetedAnswers = targetQuestion.find('.quiz__question-answer input');

            if (targetedAnswers.length === 0 && slideDirection === 'right') {

                return function () {

                    quizSlider.slick('slickNext');

                };

            } else if (targetedAnswers.length === 0 && slideDirection === 'left') {

                return function () {

                    quizSlider.slick('slickPrev');

                };

            } else {

                console.log(targetedAnswers);

                targetedAnswers.attr('disabled', false);

                targetQuestion.show();

            }

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

    
    

    
    (function () {

        

    })();

    

    
    

    
    (function() {

        var topScreenStelki = $('.top-screen-stelki');

        if (topScreenStelki.length === 0) return;

    

        if (window.matchMedia('(max-width: 480px)').matches) {

            var video = topScreenStelki.find('video source');

            video.attr('src','video/stelki_m.mp4');

        }

    })()
});
