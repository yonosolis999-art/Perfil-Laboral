// main.js - Lógica general e interactividad de la UI

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // Resaltado de menú de navegación según la sección visible
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-700', 'font-bold');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-blue-700', 'font-bold');
            }
        });
    });
});