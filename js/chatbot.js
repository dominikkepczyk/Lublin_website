// Funkcja wykonywana po załadowaniu DOM
document.addEventListener("DOMContentLoaded", function() {
    function loadHTML(file, element) {
        var xhr = new XMLHttpRequest(); // Tworzenie obiektu XMLHttpRequest
        xhr.open("GET", file, true); // Konfiguracja żądania GET
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) { // Sprawdzanie statusu odpowiedzi
                element.innerHTML = xhr.responseText; // Wstawianie odpowiedzi do elementu
                initializeChatbot(); // Inicjalizacja chatbota
            }
        };
        xhr.send(); // Wysyłanie żądania
    }

    var chatbotContainer = document.getElementById("chatbot-container"); // Pobieranie kontenera chatbota
    loadHTML("chatbot.html", chatbotContainer); // Ładowanie HTML do kontenera

    function initializeChatbot() {
        const chatbotIcon = document.getElementById("chatbot-icon"); // Pobieranie ikony chatbota
        const chatbotWindow = document.getElementById("chatbot-window"); // Pobieranie okna chatbota
        const chatbotClose = document.getElementById("chatbot-close"); // Pobieranie przycisku zamknięcia
        const chatbotSend = document.getElementById("chatbot-send"); // Pobieranie przycisku wysyłania wiadomości
        const chatbotRandomFact = document.getElementById("chatbot-random-fact"); // Pobieranie przycisku losowej ciekawostki
        const chatbotInput = document.getElementById("chatbot-input"); // Pobieranie pola tekstowego
        const chatbotMessages = document.getElementById("chatbot-messages"); // Pobieranie kontenera wiadomości
        const suggestions = document.querySelectorAll(".suggestion"); // Pobieranie wszystkich sugestii
        const resizers = document.querySelectorAll('.resizer'); // Pobieranie uchwytów do zmiany rozmiaru
        let facts = []; // Tablica na ciekawostki

        // Pobieranie danych ciekawostek z pliku JSON
        fetch('json/ciekawostki.json')
            .then(response => response.json()) // Konwertowanie odpowiedzi na JSON
            .then(data => facts = data); // Zapisywanie danych w zmiennej facts

        // Funkcja przełączająca widoczność chatbota
        const toggleChatbot = () => {
            if (chatbotWindow.classList.contains("open")) { // Sprawdzanie, czy okno jest otwarte
                chatbotWindow.classList.remove("open"); // Usuwanie klasy 'open'
                chatbotWindow.style.display = "none"; // Ukrywanie okna
            } else {
                chatbotWindow.classList.add("open"); // Dodawanie klasy 'open'
                chatbotWindow.style.display = "flex"; // Wyświetlanie okna
            }
        };

        chatbotIcon.addEventListener("click", toggleChatbot); // Dodawanie zdarzenia kliknięcia do ikony
        chatbotClose.addEventListener("click", toggleChatbot); // Dodawanie zdarzenia kliknięcia do przycisku zamknięcia

        // Funkcja wysyłająca wiadomość użytkownika
        const sendMessage = (message) => {
            const messageElement = document.createElement("div"); // Tworzenie nowego elementu div
            messageElement.textContent = message; // Ustawianie treści wiadomości
            messageElement.classList.add("user-message"); // Dodawanie klasy 'user-message'
            chatbotMessages.appendChild(messageElement); // Dodawanie wiadomości do kontenera

            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Przewijanie do dołu

            setTimeout(() => {
                const botMessageElement = document.createElement("div"); // Tworzenie nowego elementu div
                botMessageElement.classList.add("bot-message"); // Dodawanie klasy 'bot-message'
                if (message.toLowerCase().includes("histori")) { // Sprawdzanie zawartości wiadomości
                    botMessageElement.innerHTML = "Lublin ma bogatą historię sięgającą średniowiecza, aby dowiedzieć się o niej więcej naciśnij <a href='/ProjektPAI/historia.html'>tutaj</a>";
                } else if (message.toLowerCase().includes("przewodnik") || message.toLowerCase().includes("wycieczk")) {
                    botMessageElement.innerHTML= "A więc interesuje Cię wycieczka przez miasto z przewodnikiem? Oczywiście, że oferujemy taką usługę! Kliknij <a href='/ProjektPAI/form.html'>tutaj</a> aby zostać przeniesionym do rezerwacji wycieczki";
                } else if (message.toLowerCase().includes("galeri")) {
                    botMessageElement.innerHTML = "Lublin to przepiękne miasto, które warto odwiedzić z rodziną bądź przyjaciółmi, jako przedsmak obejrzyj naszą galerię klikając <a href='/ProjektPAI/galeria.html'>tutaj</a>";
                }else if (message.toLowerCase().includes("atrakcj")) {
                    botMessageElement.innerHTML = "Lublin ma do zaoferowania wiele atrakcji! Przygotowaliśmy spis niektórych z nich. Naciśnij <a href='/ProjektPAI/atrakcje.html'>tutaj</a> aby zostać przekierowanym";
                }else if (message.toLowerCase().includes("wydarze") || message.toLowerCase().includes("wiadomo")) {
                    botMessageElement.innerHTML = "Interesują Cię nadchodzące wydarzenia bądź najnowsze wiadomości z Lublina? Nasza strona główna wszystko Ci powie. Naciśnij <a href='/ProjektPAI/index.html'>tutaj</a> aby zostać przekierowanym";
                }else {
                    botMessageElement.textContent = "Przepraszam, nie rozumiem. Czy możesz zadać inne pytanie?";
                }
                chatbotMessages.appendChild(botMessageElement); // Dodawanie wiadomości bota do kontenera
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Przewijanie do dołu
            }, 1000); // Opóźnienie 1 sekundy
        };

        // Funkcja wysyłająca losową ciekawostkę
        const sendRandomFact = () => {
            if (facts.length > 0) { // Sprawdzanie, czy są dostępne ciekawostki
                const randomFact = facts[Math.floor(Math.random() * facts.length)]; // Losowanie ciekawostki
                const botMessageElement = document.createElement("div"); // Tworzenie nowego elementu div
                botMessageElement.classList.add("bot-message"); // Dodawanie klasy 'bot-message'
                botMessageElement.textContent = randomFact; // Ustawianie treści ciekawostki
                chatbotMessages.appendChild(botMessageElement); // Dodawanie ciekawostki do kontenera
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Przewijanie do dołu
            }
        };

        chatbotSend.addEventListener("click", () => {
            const message = chatbotInput.value.trim(); // Pobieranie i przycinanie wartości z pola tekstowego
            if (message) { // Sprawdzanie, czy wiadomość nie jest pusta
                sendMessage(message); // Wysyłanie wiadomości
                chatbotInput.value = ""; // Czyszczenie pola tekstowego
            }
        });

        chatbotRandomFact.addEventListener("click", sendRandomFact); // Dodawanie zdarzenia kliknięcia do przycisku losowej ciekawostki

        chatbotInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") { // Sprawdzanie, czy naciśnięto klawisz Enter
                const message = chatbotInput.value.trim(); // Pobieranie i przycinanie wartości z pola tekstowego
                if (message) { // Sprawdzanie, czy wiadomość nie jest pusta
                    sendMessage(message); // Wysyłanie wiadomości
                    chatbotInput.value = ""; // Czyszczenie pola tekstowego
                }
            }
        });

        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", () => {
                const message = suggestion.textContent.trim(); // Pobieranie i przycinanie tekstu sugestii
                sendMessage(message); // Wysyłanie wiadomości
            });
        });

        let isResizing = false; // Zmienna do śledzenia stanu zmiany rozmiaru
        let lastDownX = 0; // Ostatnia pozycja X
        let lastDownY = 0; // Ostatnia pozycja Y
        let direction; // Kierunek zmiany rozmiaru

        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', function(e) {
                isResizing = true; // Ustawienie flagi zmiany rozmiaru
                direction = resizer.classList[1].split('-')[1]; // Pobieranie kierunku z klasy
                lastDownX = e.clientX; // Ustawienie ostatniej pozycji X
                lastDownY = e.clientY; // Ustawienie ostatniej pozycji Y
                e.preventDefault(); // Zapobieganie domyślnej akcji
            });
        });

        window.addEventListener('mousemove', function(e) {
            if (!isResizing) return; // Jeśli nie zmieniamy rozmiaru, wyjście z funkcji

            if (direction === 'top') { // Zmiana rozmiaru od góry
                const offsetY = e.clientY - lastDownY; // Obliczanie przesunięcia Y
                chatbotWindow.style.height = Math.max(439, (chatbotWindow.offsetHeight - offsetY)) + 'px'; // Ustawianie nowej wysokości
                lastDownY = e.clientY; // Ustawienie nowej pozycji Y
            } else if (direction === 'right') { // Zmiana rozmiaru z prawej
                const offsetX = e.clientX - lastDownX; // Obliczanie przesunięcia X
                chatbotWindow.style.width = Math.max(405, (chatbotWindow.offsetWidth + offsetX)) + 'px'; // Ustawianie nowej szerokości
                lastDownX = e.clientX; // Ustawienie nowej pozycji X
            } else if (direction === 'bottom') { // Zmiana rozmiaru od dołu
                const offsetY = e.clientY - lastDownY; // Obliczanie przesunięcia Y
                chatbotWindow.style.height = Math.max(439, (chatbotWindow.offsetHeight + offsetY)) + 'px'; // Ustawianie nowej wysokości
                lastDownY = e.clientY; // Ustawienie nowej pozycji Y
            } else if (direction === 'left') { // Zmiana rozmiaru z lewej
                const offsetX = e.clientX - lastDownX; // Obliczanie przesunięcia X
                chatbotWindow.style.width = Math.max(405, (chatbotWindow.offsetWidth - offsetX)) + 'px'; // Ustawianie nowej szerokości
                lastDownX = e.clientX; // Ustawienie nowej pozycji X
            }
        });

        window.addEventListener('mouseup', function() {
            isResizing = false; // Zatrzymanie zmiany rozmiaru
        });
    }
});
