document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery'); // Pobieranie elementu galerii

    // Pobieranie danych z pliku JSON
    fetch('json/galeriadane.json')
        .then(response => response.json()) // Przekształcanie na format JSON
        .then(data => {
            const images = data.images; // Przypisanie pobranych obrazów do zmiennej
            images.forEach(image => {
                // Tworzenie elementu obrazu
                const imgElement = document.createElement('img');
                imgElement.src = image.src; // Ustawienie źródła obrazu
                imgElement.alt = image.title; // Ustawienie opisu
                imgElement.classList.add('img-thumbnail', 'col-4', 'm-2'); // Dodanie klas do stylizacji
                imgElement.style.cursor = 'pointer'; // Ustawienie stylu kursora
                // Dodanie obsługi kliknięcia, otwierającej okienko z obrazem
                imgElement.addEventListener('click', () => openModal(image));
                gallery.appendChild(imgElement); // Dodanie obrazu do galerii
            });
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów podczas pobierania danych

    // Funkcja otwierająca okienko z pełnym obrazem
    function openModal(image) {
        const modal = document.createElement('div'); // Tworzenie okna
        modal.classList.add('modal', 'fade'); // Dodanie klas do okna
        modal.id = 'imageModal'; // Ustawienie ID
        modal.tabIndex = -1; // Ustawienie indexu
        modal.setAttribute('role', 'dialog'); // Ustawienie atrybutu
        // Ustawienie zawartości
        modal.innerHTML = `
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${image.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${image.src}" class="img-fluid" alt="${image.title}">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal); // Dodanie okna do dokumentu
        const bootstrapModal = new bootstrap.Modal(modal); // Inicjalizacja Bootstrapa
        bootstrapModal.show(); // Wyświetlenie okna
        // Usuwanie po zamknięciu
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }
});
