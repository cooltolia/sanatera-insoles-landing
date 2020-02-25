(function() {
    $modal = $('#modal1');
    $modal.on('show.bs.modal', function(event) {
        var invoker = $(event.relatedTarget);

        function inputPhoneValidate() {
            debugger;
            var enteredPhone = inputPhone.val();
            return Inputmask.isValid(enteredPhone, {
                mask: phoneMask,
            });
        }

        var phoneMask = '+7 (999) 999-99-99';
        var inputPhone = $('#modal_tel');
        inputPhone.inputmask({
            mask: phoneMask,
            showMaskOnHover: false,
        });

        var xhr = new XMLHttpRequest();

        var currentModal = $(this);
        var currentForm = $(this).find('form');
        var formName = currentForm.attr('name');

        var firstInput = $(this).find('input')[0];
        if (firstInput) {
            firstInput.focus();
        }

        var mobileInput = $(this).find('input[name="phone"]');
        var submit = $(this).find('.modal-submit');

        var invokerText = invoker.data('button');
        submit.text(invokerText || 'Отправить');

        currentForm.on('submit', function(e) {
            e.preventDefault();

            var phoneValid = inputPhoneValidate();
            debugger;
            if (!phoneValid) return;

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    mobileInput.val('');
                    submit.removeClass('loading');

                    if (xhr.status === 200) {
                        $('#success').modal();
                        currentForm.off();
                    } else {
                        currentForm.off();
                        alert('Возникла ошибка при отправке формы. Код ошибки: ' + xhr.status + ' ' + xhr.statusText);
                    }
                }
            };

            currentModal.modal('hide');
            var formData = new FormData(document.forms[formName]);
            xhr.open('POST', 'sendform.php', true);
            xhr.send(formData);
        });
    });
})();
