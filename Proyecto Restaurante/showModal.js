document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.ident');
    for (const card of cards) {
        card.addEventListener('click', function () {
            const imageURL = card.getAttribute('data-image');
            const description = card.getAttribute('data-description');

            // Llenar el contenido del modal
            const extendedInfoImage = document.getElementById('extendedInfoImage');
            extendedInfoImage.src = imageURL;

            const extendedInfoDescription = document.getElementById('extendedInfoDescription');
            extendedInfoDescription.textContent = description;

            // Abrir el modal
            $('#extendedInfoModal').modal('show');
        });
    }
});