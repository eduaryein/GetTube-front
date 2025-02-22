function sendForm(formId, url, method = 'POST') {
    const form = $(`#${formId}`);
    const submitButton = form.find('button[type="submit"]');
    let isValid = true;

    // Validar que los campos con la clase 'validate' no estén vacíos
    const inputs = form.find('input.validate, textarea.validate, select.validate');
    inputs.each(function() {
        const input = $(this);
        const errorSpan = input.next('.invalid-feedback');

        if (input.val().trim() === '') {
            isValid = false;
            input.addClass('is-invalid');
            if (!errorSpan.length) {
                // Crear un nuevo mensaje de error
                const errorMessage = $('<span class="invalid-feedback" role="alert"><strong>This field is required</strong></span>');
                input.parent().append(errorMessage);
            }
        } else {
            input.removeClass('is-invalid');
            if (errorSpan.length) {
                errorSpan.remove(); // Eliminar mensaje de error si existe
            }
        }

        // Agregar evento para eliminar mensajes al escribir
        input.on('input', function() {
            if (input.val().trim() !== '') {
                input.removeClass('is-invalid');
                const errorFeedback = input.next('.invalid-feedback');
                if (errorFeedback.length) {
                    errorFeedback.remove();
                }
            }
        });
    });

    if (!isValid) {
        return; // Salir si hay campos vacíos
    }

    // Cambiar el texto del botón y deshabilitarlo
    const originalButtonText = submitButton.html();
    submitButton.html('Loading...');
    submitButton.prop('disabled', true);

    // Bloquear la interfaz de usuario usando l2block
    form.l2block();

    $.ajax({
        url: url,
        type: method,
        data: form.serialize(),
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                response = JSON.parse(response);
            if (response.status === 0) {
                Notiflix.Notify.Warning(response.message);
            } else if (response.status === 1) {
                Notiflix.Notify.Success(response.message);
                form[0].reset();

                if (response.route) {
                    setTimeout( function(){
                        window.location = response.route;
                    }, 800)
                }
            } else if (response.status === 2) {
                Notiflix.Notify.Info(response.message);
            } 
        },
        error: function(xhr) {
            console.log("xhr", xhr.message);            
        },
        complete: function() {
            // Desbloquear la interfaz de usuario usando l2unblock
            form.l2unblock();
            // Resetear el formulario y el botón
            // form[0].reset();
            submitButton.html(originalButtonText);
            submitButton.prop('disabled', false);
        }
    });
}
