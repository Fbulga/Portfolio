document.addEventListener('DOMContentLoaded', () => {
    const animationWrapper = document.getElementById('animation-wrapper');
    const portfolioContainer = document.getElementById('portfolio-container');
    let isAnimating = false;

    // --- El script lee la variable de velocidad del CSS ---
    const rootStyles = getComputedStyle(document.documentElement);
    const rotationSpeedString = rootStyles.getPropertyValue('--rotation-speed').trim();
    // Convierte el string (ej: "2s") a milisegundos (ej: 2000)
    const rotationSpeedMs = parseFloat(rotationSpeedString) * 1000;

    animationWrapper.addEventListener('click', () => {
        if (isAnimating) {
            return;
        }
        isAnimating = true;

        // 1. Inicia la animación CSS
        animationWrapper.classList.add('animate');

        // 2. Usa el valor leído del CSS para el temporizador
        setTimeout(() => {
            animationWrapper.style.opacity = '0';
            portfolioContainer.style.clipPath = 'circle(150% at 50% 50%)';
        }, rotationSpeedMs); // ¡Usa la variable!

        // 3. Oculta todo al final, dejando un margen
        setTimeout(() => {
            animationWrapper.style.display = 'none';
        }, rotationSpeedMs + 800); // La variable + un tiempo extra
    });
});