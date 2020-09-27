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
