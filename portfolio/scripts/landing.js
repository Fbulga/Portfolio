document.addEventListener('DOMContentLoaded', () => {
    const enterHexagon = document.getElementById('enter-hexagon');
    const portfolioContainer = document.getElementById('portfolio-container');
    let isAnimating = false;

    enterHexagon.addEventListener('click', () => {
        if (isAnimating) {
            return;
        }
        isAnimating = true;

        enterHexagon.style.transform = 'translate(-50%, -50%) rotate(-360deg)';
        
        setTimeout(() => {
            enterHexagon.style.opacity = '0';
            portfolioContainer.style.clipPath = 'circle(100% at 50% 50%)';
        }, 750);

        setTimeout(() => {
            enterHexagon.style.display = 'none';
        }, 1500);
    });
});