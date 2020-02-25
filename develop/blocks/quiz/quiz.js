(function() {
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
        if (!phoneValid) return;

        const data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/sendmail.php',
            data: data,
            success: function(data) {
                afterSubmit();
            },
            error: function(data) {
                afterSubmit();
                alert('Форме пока некуда уйти');
            },
        });
    });

    function afterSubmit() {
        $('.quiz__question-text').hide();
        $('.quiz__question-phone').hide();
        $('.quiz__submit').hide();

        $('.quiz__question-title').text('Спасибо, мы уже изучаем ваши ответы и свяжемся в течение 5 минут');

        quizSlider.slick('setPosition')
    }

    function updateStatus(slideIndex, totalSlides) {
        var currentSlide = slideIndex + 1;
        $currentSlide.text(currentSlide);

        var currentProgress = currentSlide / totalSlides;
        $progressBar.css('transform', 'scaleX(' + currentProgress + ')');
    }
})();
