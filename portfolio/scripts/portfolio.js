document.addEventListener('DOMContentLoaded', () => {

    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#home';
    backToTopButton.classList.add('back-to-top-btn');
    backToTopButton.innerHTML = '&#8593;';

    document.body.appendChild(backToTopButton);

    const aboutSection = document.getElementById('about');
    const scrollThreshold = aboutSection ? aboutSection.offsetTop : 600;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            backToTopButton.classList.add('visible');
        }
        if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
            backToTopButton.classList.remove('visible');
        }
        lastScrollY = currentScrollY;
    });

    
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



    const navLinks = document.querySelectorAll('.navbar-capsule a');

    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href');
        try {
            return document.querySelector(id);
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
                    });
                    const activeLink = document.querySelector(`.navbar-capsule a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
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



});