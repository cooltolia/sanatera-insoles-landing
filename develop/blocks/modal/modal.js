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
