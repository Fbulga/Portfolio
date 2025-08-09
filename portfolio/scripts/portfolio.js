document.addEventListener('DOMContentLoaded', () => {

    // --- Menú de Hamburguesa (lógica simplificada) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navbar-capsule');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.navbar-capsule a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Botón "Volver Arriba" ---
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#home';
    backToTopButton.classList.add('back-to-top-btn');
    backToTopButton.innerHTML = '&#8593;';
    document.body.appendChild(backToTopButton);

    const triggerElement = document.querySelector('#about h2');
    if (triggerElement) {
        window.addEventListener('scroll', () => {
            const triggerPosition = triggerElement.getBoundingClientRect().top;
            const screenMiddle = window.innerHeight / 2;
            if (triggerPosition <= screenMiddle) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }

    // --- Formulario de Contacto y Modal ---
    const subscribeForm = document.getElementById('subscribe-form');
    const modal = document.getElementById('subscription-modal');
    const closeButton = document.querySelector('.close-button');

    if (subscribeForm && modal && closeButton) {
        const publicKey = 'GNn3lf5OJJspaNz1e';
        const serviceID = 'service_8byjz24';
        const templateID = 'template_zkwh72q';

        emailjs.init(publicKey);

        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitButton.textContent = originalButtonText;
                    modal.style.display = 'block';
                    subscribeForm.reset();
                }, (err) => {
                    submitButton.textContent = originalButtonText;
                    alert('Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                    console.error('Error de EmailJS:', JSON.stringify(err));
                });
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // --- Navegación Activa con Scroll (Intersection Observer) ---
    const navLinks = document.querySelectorAll('.navbar-capsule a');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href');
        try {
            if (id && id.startsWith('#')) {
                return document.querySelector(id);
            }
            return null;
        } catch (e) {
            return null;
        }
    }).filter(section => section !== null);

    if (sections.length > 0) {
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observerOptions = {
            rootMargin: '-30% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }

    // --- Nave Espacial que Sigue al Mouse ---
    const mouseFollower = document.getElementById('mouse-follower');
    if (mouseFollower) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        const easing = 0.1;

        document.addEventListener('mousemove', (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
        });

        document.addEventListener('click', () => {
            const laser = document.createElement('div');
            laser.classList.add('laser-beam');
            document.body.appendChild(laser);

            const angleInRadians = Math.atan2(targetY - currentY, targetX - currentX);
            const angleInDegrees = angleInRadians * (180 / Math.PI);

            const noseX = currentX + Math.cos(angleInRadians) * 25;
            const noseY = currentY + Math.sin(angleInRadians) * 25;

            laser.style.left = `${noseX}px`;
            laser.style.top = `${noseY}px`;
            laser.style.transform = `translate(-50%, -50%) rotate(${angleInDegrees + 90}deg)`;

            setTimeout(() => {
                const travelDistance = 500;
                laser.style.transform += ` translateY(-${travelDistance}px)`;
                laser.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                laser.remove();
            }, 500);
        });

        const animateShip = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            currentX += dx * easing;
            currentY += dy * easing;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            mouseFollower.style.transform = `translate3d(${currentX - 12.5}px, ${currentY}px, 0) rotate(${angle + 90}deg)`;

            requestAnimationFrame(animateShip);
        };
        animateShip();
    }
});