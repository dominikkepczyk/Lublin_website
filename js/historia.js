document.addEventListener('DOMContentLoaded', () => {
    let historyTexts = []; // Tablica na tekst

    // Pobieranie danych z pliku JSON
    fetch('json/historiadane.json')
        .then(response => response.json()) // Przekształcanie odpowiedzi na format JSON
        .then(data => {
            historyTexts = data.texts; // Przypisanie pobranych tekstów do tablicy
            renderContent(currentTextIndex); // Renderowanie początkowego tekstu
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów podczas wczytywania danych

    // Tablica z obrazkami
    const historyImages = [
        "assets/img/timeline1.jpg",
        "assets/img/timeline2.jpg",
        "assets/img/timeline3.jpg",
        "assets/img/timeline4.jpg",
        "assets/img/timeline5.jpg",
        "assets/img/timeline6.jpg",
        "assets/img/timeline7.jpg",
        "assets/img/timeline8.jpg",
        "assets/img/timeline9.jpg",
        "assets/img/timeline10.jpg",
        "assets/img/timeline11.jpg",
        "assets/img/timeline12.jpg"
    ];

    let currentTextIndex = 0; // Bieżący indeks tekstu
    const textContent = document.getElementById('text-content'); // Element zawierający tekst
    const fixedImage = document.getElementById('fixed-image'); // Element obrazu, który będzie zmieniany
    const timelineItems = document.querySelectorAll('.timeline-item'); // Elementy osi czasu

    // Funkcja wyswietlajaca tekst na podstawie indeksu
    function renderContent(index) {
        if (historyTexts.length > 0) { // Sprawdza, czy teksty zostały załadowane
            textContent.textContent = historyTexts[index]; // Ustawienie tekstu
        }
    }

    // Obsługa przycisku poprzedni 
    document.getElementById('prevTextBtn').addEventListener('click', () => {
        if (currentTextIndex > 0) { // Sprawdzenie, czy nie jest to pierwszy tekst
            currentTextIndex--; // Zmniejszenie indeksu
            renderContent(currentTextIndex); // Renderowanie poprzedniego tekstu
        }
    });

    // Obsługa przycisku następny
    document.getElementById('nextTextBtn').addEventListener('click', () => {
        if (currentTextIndex < historyTexts.length - 1) { // Sprawdzenie, czy nie jest to ostatni tekst
            currentTextIndex++; // Zwiększenie indeksu
            renderContent(currentTextIndex); // Renderowanie następnego tekstu
        }
    });

    // Zmiana obrazu na podstawie przewijania osi czasu
    window.addEventListener('scroll', () => {
        let index = 0;
        timelineItems.forEach((item, idx) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < (window.innerHeight * 0.4) && rect.bottom >= (window.innerHeight * 0.4)) {
                index = idx; // Ustawienie indeksu na podstawie pozycji przewijania
            }
        });
        fixedImage.src = historyImages[index]; // Ustawienie obrazu na podstawie indeksu
    });
});
