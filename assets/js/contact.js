// contact.js - Validación y procesamiento seguro del formulario

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    // Función auxiliar para sanitizar cadenas (Previene XSS)
    function sanitizeInput(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML.trim();
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Verificación Honeypot (Anti-Spam Bot)
        const honeypot = document.getElementById('b_website').value;
        if (honeypot !== '') {
            // Si un bot rellenó este campo oculto, abortamos silenciosamente
            console.warn('Bot detectado.');
            return;
        }

        // 2. Obtención y sanitización de inputs
        const name = sanitizeInput(document.getElementById('name').value);
        const email = sanitizeInput(document.getElementById('email').value);
        const message = sanitizeInput(document.getElementById('message').value);

        // 3. Validaciones básicas de cliente
        if (!name || !email || !message) {
            alert('Por favor, rellena todos los campos del formulario.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        // 4. Feedback de envío al usuario
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

        try {
            // Aquí se conectará con la API de envío (EmailJS, Formspree o Cloudflare Worker)
            // Simulación de envío exitoso por ahora:
            await new Promise(resolve => setTimeout(resolve, 1200));

            alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo lo antes posible.');
            contactForm.reset();
        } catch (error) {
            console.error('Error enviando el formulario:', error);
            alert('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
});