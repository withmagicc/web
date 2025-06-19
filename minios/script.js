document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[data-target]');
    const heartOverlay = document.getElementById('heart-transition-overlay');
    const heartSvg = heartOverlay.querySelector('.heart-svg');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            const currentPage = document.querySelector('.page.active');

            if (targetPage && !targetPage.isSameNode(currentPage)) {
                transitionWithHeart(currentPage, targetPage);
            }
        });
    });

    function transitionWithHeart(currentPage, targetPage) {
        // Mostrar overlay y animar corazón creciendo
        heartOverlay.classList.add('active', 'grow');
        heartOverlay.classList.remove('shrink');

        setTimeout(() => {
            // Cambiar página mientras el corazón cubre la pantalla
            currentPage.classList.remove('active');
            targetPage.classList.add('active');
            // Animar corazón encogiéndose
            heartOverlay.classList.remove('grow');
            heartOverlay.classList.add('shrink');
        }, 600);

        // Ocultar overlay después de la animación
        setTimeout(() => {
            heartOverlay.classList.remove('active', 'shrink');
        }, 1100);

        history.pushState(null, '', `#${targetPage.id}`);
    }
});