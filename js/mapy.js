let map; // Deklaracja zmiennej dla mapy
let marker; // Deklaracja zmiennej dla znacznika na mapie
let currentIndex = 0; // Bieżący indeks wybranej lokalizacji
let currentImageIndex = 0; // Bieżący indeks wybranego zdjęcia
let locations = []; // Tablica przechowująca dane o lokalizacjach

// Funkcja inicjująca mapę
function initMap() {
    fetch('json/atrakcjedane.json') // Pobieranie danych z pliku JSON
        .then(response => response.json())
        .then(data => {
            locations = data.attractions; // Przypisanie danych do zmiennej locations
            const initialLocation = locations[currentIndex]; // Ustawienie początkowej lokalizacji

            // Inicjalizacja mapy Google
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 14, // Powiększenie mapy
                center: { lat: initialLocation.lat, lng: initialLocation.lng }, // Środek mapy
                mapTypeControl: false // Wyłącza kontrolki "Satelita" i "Mapa"
            });

            //znacznik na mapie
            marker = new google.maps.Marker({
                position: { lat: initialLocation.lat, lng: initialLocation.lng },
                map: map,
                mapTypeControl: false // Wyłącza kontrolki "Satelita" i "Mapa"
            });

            updateLocation(currentIndex); // Aktualizacja informacji o lokalizacji
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów
}

// Funkcja aktualizująca informacje o lokalizacji
function updateLocation(index) {
    const location = locations[index]; // Pobieranie danych o lokalizacji
    document.getElementById('gallery-title').innerText = location.title; // Aktualizacja tytułu
    document.getElementById('gallery-image').src = location.images[currentImageIndex]; // Aktualizacja zdjęcia
    document.getElementById('gallery-text').innerText = location.text; // Aktualizacja opisu

    const newCenter = { lat: location.lat, lng: location.lng }; // Nowy środek mapy
    map.setCenter(newCenter); // Ustawienie nowego środka mapy
    marker.setPosition(newCenter); // Ustawienie nowej pozycji znacznika
}

// Obsługa zdarzeń po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
    // Obsługa przycisku poprzednia lokalizacja
    document.getElementById('prevLocationBtn').addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? locations.length - 1 : currentIndex - 1; // Zmiana indeksu
        currentImageIndex = 0; // Reset indeksu zdjęcia
        updateLocation(currentIndex); // Aktualizacja informacji o lokalizacji
    });

    // Obsługa przycisku następna lokalizacja
    document.getElementById('nextLocationBtn').addEventListener('click', function () {
        currentIndex = (currentIndex === locations.length - 1) ? 0 : currentIndex + 1; // Zmiana indeksu
        currentImageIndex = 0; // Reset indeksu zdjęcia
        updateLocation(currentIndex); // Aktualizacja informacji o lokalizacji
    });

    // Obsługa przycisku następne zdjęcie
    document.getElementById('nextImageBtn').addEventListener('click', function () {
        const images = locations[currentIndex].images; // Pobranie zdjęć dla bieżącej lokalizacji
        currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1; // Zmiana indeksu zdjęcia
        document.getElementById('gallery-image').src = images[currentImageIndex]; // Aktualizacja zdjęcia
    });

    // Obsługa przycisku poprzednie zdjęcie
    document.getElementById('prevImageBtn').addEventListener('click', function () {
        const images = locations[currentIndex].images; // Pobranie zdjęć dla bieżącej lokalizacji
        currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1; // Zmiana indeksu zdjęcia
        document.getElementById('gallery-image').src = images[currentImageIndex]; // Aktualizacja zdjęcia
    });

    updateLocation(currentIndex); // Aktualizacja informacji o lokalizacji
});

// Inicjalizacja mapy Google
window.initMap = initMap;
