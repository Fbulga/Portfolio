document.addEventListener('DOMContentLoaded', () => {

    const config = {
        particleCount: 20,
        minSpeed: 15,
        maxSpeed: 25,
        minSize: 20,
        maxSize: 80,
        color: 'rgba(32, 48, 83, 0.4)'
    };


    const getRandom = (min, max) => Math.random() * (max - min) + min;


    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'animated-background';
    document.body.prepend(backgroundContainer);

    for (let i = 0; i < config.particleCount; i++) {
        const particle = document.createElement('span');

        const size = getRandom(config.minSize, config.maxSize);
        const speed = getRandom(config.minSpeed, config.maxSpeed);
        const delay = getRandom(0, config.minSpeed);
        const position = getRandom(0, 100);

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${position}%`;
        particle.style.animationDuration = `${speed}s`;
        particle.style.animationDelay = `${delay}s`;

        backgroundContainer.appendChild(particle);
    }

    const css = `
        .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            z-index: -1;
        }
        .animated-background span {
            position: absolute;
            display: block;
            border-radius: 50%;
            background-color: ${config.color};
            box-shadow: 0 0 10px ${config.color};
            animation: move_particles linear infinite;
            bottom: -${config.maxSize * 1.5}px; /* Inician fuera de la pantalla */
        }
        @keyframes move_particles {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-120vh);
                opacity: 0;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
});