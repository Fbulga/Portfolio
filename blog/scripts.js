document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('subscription-modal');
    const subscribeForm = document.getElementById('subscribe-form');
    const closeButton = document.querySelector('.close-button');

    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});