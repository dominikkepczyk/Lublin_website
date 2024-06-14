// Funkcja wykonywana po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {

    const apiKey = '826fd66755e203999c6e0ccb79823911'; // Klucz API dla OpenWeatherMap
    const city = 'Lublin'; // Miasto dla którego pobierana jest pogoda
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`; // URL do API pogody

    // Pobieranie danych pogodowych z OpenWeatherMap
    fetch(weatherUrl)
        .then(response => response.json()) // Konwertowanie odpowiedzi na JSON
        .then(data => {
            console.log('Weather data:', data); // Wyświetlanie danych pogodowych w konsoli
            const weatherContainer = document.getElementById('weather'); // Pobieranie kontenera na dane pogodowe
            weatherContainer.innerHTML = `
                <h3>Pogoda w Lublinie</h3>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Warunki: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Ikona pogody">
            `; // Wyświetlanie danych pogodowych w HTML
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów

    const rssUrl = 'https://lublin.eu/rss/pl/66/2.xml'; // URL do RSS z wiadomościami

    // Pobieranie danych RSS z wiadomościami
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`)
        .then(response => response.json()) // Konwertowanie odpowiedzi na JSON
        .then(data => {
            const parser = new DOMParser(); // Tworzenie parsera XML
            const rssData = parser.parseFromString(data.contents, "application/xml"); // Parsowanie danych XML
            const items = rssData.querySelectorAll("item"); // Pobieranie elementów <item>
            const newsContainer = document.getElementById('news'); // Pobieranie kontenera na wiadomości
            let newsHtml = '<h3>Najnowsze wiadomości</h3>'; // Inicjalizacja HTML z nagłówkiem
            items.forEach((item, index) => {
                if(index < 5) { // Wyświetlanie maksymalnie 5 wiadomości
                    const title = item.querySelector("title").textContent; // Pobieranie tytułu wiadomości
                    const link = item.querySelector("link").textContent; // Pobieranie linku do wiadomości
                    const pubDate = new Date(item.querySelector("pubDate").textContent).toLocaleDateString(); // Konwertowanie daty publikacji
                    newsHtml += `
                        <div class="news-item">
                            <h4><a href="${link}" target="_blank">${title}</a></h4>
                            <p>${pubDate}</p>
                        </div>
                    `; // Dodawanie wiadomości do HTML
                }
            });
            newsContainer.innerHTML = newsHtml; // Wyświetlanie wiadomości w HTML
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów

    const eventsRssUrl = 'https://lublin.eu/rss/pl/41/2.xml'; // URL do RSS z wydarzeniami

    // Pobieranie danych RSS z wydarzeniami
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(eventsRssUrl)}`)
        .then(response => response.json()) // Konwertowanie odpowiedzi na JSON
        .then(data => {
            const parser = new DOMParser(); // Tworzenie parsera XML
            const rssData = parser.parseFromString(data.contents, "application/xml"); // Parsowanie danych XML
            const items = rssData.querySelectorAll("item"); // Pobieranie elementów <item>
            const eventsContainer = document.getElementById('events'); // Pobieranie kontenera na wydarzenia
            let eventsHtml = '<h3>Nadchodzące wydarzenia</h3>'; // Inicjalizacja HTML z nagłówkiem
            items.forEach((item, index) => {
                if(index < 5) { // Wyświetlanie maksymalnie 5 wydarzeń
                    const title = item.querySelector("title").textContent; // Pobieranie tytułu wydarzenia
                    const link = item.querySelector("link").textContent; // Pobieranie linku do wydarzenia
                    const pubDate = new Date(item.querySelector("pubDate").textContent).toLocaleDateString(); // Konwertowanie daty publikacji
                    const description = item.querySelector("description").textContent; // Pobieranie opisu wydarzenia
                    eventsHtml += `
                        <div class="event-item">
                            <h4><a href="${link}" target="_blank">${title}</a></h4>
                            <p>${pubDate}</p>
                            <p>${description}</p>
                        </div>
                    `; // Dodawanie wydarzenia do HTML
                }
            });
            eventsContainer.innerHTML = eventsHtml; // Wyświetlanie wydarzeń w HTML
        })
        .catch(error => console.error('Błąd wczytywania danych:', error)); // Obsługa błędów
});
