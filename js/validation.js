'use strict';

const initFormValidation = () => {
    const form = document.getElementById('contactForm');
    const alertBox = document.getElementById('successAlert');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        // Dacă formularul nu trece regulile HTML5 de validare
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            if (alertBox) alertBox.classList.add('d-none');
        } else {
            // Dacă totul este corect, simulăm trimiterea cu succes
            event.preventDefault(); 
            if (alertBox) {
                alertBox.classList.remove('d-none');
                // Scroll lin către alerta de succes
                alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
            form.classList.remove('was-validated');
            return;
        }

        form.classList.add('was-validated');
    }, false);
};

document.addEventListener('DOMContentLoaded', initFormValidation);