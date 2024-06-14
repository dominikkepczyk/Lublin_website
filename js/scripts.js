window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0; // Zmienna do przechowywania pozycji przewijania
    const mainNav = document.getElementById('mainNav'); // Pobieranie elementu nawigacji

    if (mainNav) { // Sprawdzanie, czy element nawigacji istnieje
        const headerHeight = mainNav.clientHeight; // Pobieranie wysokości nagłówka
        window.addEventListener('scroll', function() {
            const currentTop = document.body.getBoundingClientRect().top * -1; // Obliczanie bieżącej pozycji przewijania w pionie

            if (currentTop < scrollPos) { // Jeżeli przewijanie jest w górę
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible'); // Dodawanie klasy "is-visible", jeżeli przewijanie jest w górę i nawigacja jest już zafiksowana
                } else {
                    console.log(123); //wyświetlenie informacji w konsoli
                    mainNav.classList.remove('is-visible', 'is-fixed'); // Usuwanie klas "is-visible" i "is-fixed" w przeciwnym wypadku
                }
            } else { // Jeżeli przewijanie jest w dół
                mainNav.classList.remove('is-visible'); // Usuwanie klasy "is-visible"
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed'); // Dodawanie klasy "is-fixed", jeżeli pozycja przewijania przekroczyła wysokość nagłówka
                }
            }
            scrollPos = currentTop; // Aktualizacja zmiennej pozycji przewijania
        });
    }
});

