document.addEventListener('DOMContentLoaded', () => {


    const imageData = [
        {
            src: "../images/UnrealManor.jpg",
            title: "Unreal Manor - Exterior View",
            description: "The Manor made in Blender and implemented inside Unreal 5."
        },
        {
            src: "../images/UnrealManor.png",
            title: "Unreal Manor - Tittle",
            description: "Main tittle of the game."
        },
        {
            src: "../images/UnrealManor2.jpg",
            title: "Unreal Manor - Hall",
            description: "The first view of the interior of the manor."
        },
        {
            src: "../images/GooseGame.png",
            title: "Goose Game - Cover Art",
            description: "Cover Art of Goose."
        },
        {
            src: "../images/extrañakawaii.png",
            title: "Extraña Kawaii - Mei's room",
            description: "Main Character's room."
        },
        {
            src: "../images/extrañakawaii2.png",
            title: "Extraña Kawaii - Cthuli dialog",
            description: "Cthuli talking to Mei."
        },
        {
            src: "../images/gyropong.jpg",
            title: "Gyro Pong Header",
            description: "Mobile game inspired by the classics Arkanoid and Pong"
        },
        
    ];

    
    const galleryGrid = document.querySelector('.gallery-grid');

    if (galleryGrid) {
        imageData.forEach((data, index) => {
            const img = document.createElement('img');
            img.src = data.src;
            img.alt = data.title; 
            img.classList.add('gallery-image');
            galleryGrid.appendChild(img);
        });
    }


    const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption'); 
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    
    if (!lightbox) return;

    let currentIndex = 0;

    
    function updateLightboxContent(index) {
        const currentImageData = imageData[index];
        lightboxImg.src = currentImageData.src;
        lightboxImg.alt = currentImageData.title;
        lightboxCaption.innerHTML = `<h4>${currentImageData.title}</h4><p>${currentImageData.description}</p>`;
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent(currentIndex);
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxContent(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxContent(currentIndex);
    }

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { 
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});