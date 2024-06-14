// Funkcja wykonywana po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm'); // Formularz zamówienia
    const clearFormBtn = document.getElementById('clearFormBtn'); // Przycisk czyszczenia formularza
    const orderPreview = document.getElementById('orderPreview'); // Podgląd zamówienia
    const submitBtn = document.getElementById('submitBtn'); // Przycisk wysłania formularza
    const editOrderBtn = document.getElementById('editOrderBtn'); // Przycisk edycji zamówienia

    const editFormContainer = document.getElementById('editFormContainer'); // Kontener formularza edycji
    const editForm = document.getElementById('editForm'); // Formularz edycji
    const saveChangesBtn = document.getElementById('saveChangesBtn'); // Przycisk zapisywania zmian

    // Wzorce dla walidacji pól formularza
    const regexPatterns = {
        firstName: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/, // Wzorzec dla imienia
        lastName: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/, // Wzorzec dla nazwiska
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Wzorzec dla adresu email
        phone: /^\d{9}$/ // Wzorzec dla numeru telefonu
    };

    // Definicje pól formularza i ich walidatorów
    const fields = [
        { id: 'firstName', validator: value => regexPatterns.firstName.test(value) },
        { id: 'lastName', validator: value => regexPatterns.lastName.test(value) },
        { id: 'email', validator: value => regexPatterns.email.test(value) },
        { id: 'phone', validator: value => regexPatterns.phone.test(value) },
        { id: 'tourDate', validator: value => value && value >= new Date().toISOString().split('T')[0] }, // Sprawdzanie, czy data nie jest przeszła
        { id: 'tourType', validator: value => !!value } // Sprawdzanie, czy pole jest wypełnione
    ];

    // Funkcja walidująca pojedyncze pola formularza
    const validateField = (field, validator) => {
        const value = field.value.trim(); // Pobieranie wartości i przycinanie białych znaków
        const isValid = validator(value); // Sprawdzanie poprawności wartości
        field.classList.toggle('is-invalid', !isValid); // Dodanie/Usunięcie klasy 'is-invalid'
        field.classList.toggle('is-valid', isValid); // Dodanie/Usunięcie klasy 'is-valid'
        return isValid; // Zwracanie wyniku walidacji
    };

    // Funkcja walidująca cały formularz
    const validateForm = () => {
        const isValid = fields.every(({ id, validator }) => validateField(document.getElementById(id), validator)); // Walidacja wszystkich pól
        submitBtn.disabled = !isValid; // Wyłączenie przycisku wysłania jeśli formularz jest niepoprawny
        submitBtn.classList.toggle('disabled', !isValid); // Dodanie/Usunięcie klasy 'disabled'
        return isValid; // Zwracanie wyniku walidacji
    };

    // Walidacja formularza przy wpisywaniu danych
    form.addEventListener('input', validateForm); // Walidacja przy każdym wpisaniu danych
    form.addEventListener('change', validateForm); // Walidacja przy każdej zmianie wartości

    // Obsługa zdarzenia wysłania formularza
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Zapobieganie domyślnej akcji wysyłania formularza
        if (!validateForm()) return; // Jeśli formularz nie jest poprawny, zakończenie funkcji

        // Pobieranie danych z formularza
        const formData = fields.reduce((data, { id }) => {
            data[id] = document.getElementById(id).value.trim(); // Pobieranie i przycinanie wartości pól
            return data;
        }, {});

        // Dodanie opcji z pól typu checkbox
        formData.options = {
            englishGuide: document.getElementById('option1').checked, // Sprawdzanie zaznaczenia opcji przewodnika anglojęzycznego
            museumTour: document.getElementById('option2').checked, // Sprawdzanie zaznaczenia opcji zwiedzania muzeum
            foodTasting: document.getElementById('option3').checked // Sprawdzanie zaznaczenia opcji degustacji jedzenia
        };

        formData.additionalInfo = document.getElementById('additionalInfo').value.trim(); // Pobieranie dodatkowych informacji

        // Zapisanie danych w sessionStorage
        sessionStorage.setItem('tourOrder', JSON.stringify(formData)); // Zapisanie danych w formacie JSON
        showPreview(); // Wyświetlenie podglądu
        Swal.fire({
            title: 'Dziękujemy!',
            text: 'Twoja wycieczka została zamówiona.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }); // Wyświetlenie komunikatu o sukcesie
        form.reset(); // Czyszczenie formularza
        document.querySelectorAll('.form-control').forEach(field => field.classList.remove('is-valid', 'is-invalid')); // Usunięcie klas walidacji z pól
        submitBtn.disabled = true; // Wyłączenie przycisku wysłania
        submitBtn.classList.add('disabled'); // Dodanie klasy 'disabled'
        editOrderBtn.style.display = 'block'; // Wyświetlenie przycisku edycji zamówienia
    });

    // Obsługa przycisku czyszczenia formularza
    clearFormBtn.addEventListener('click', function () {
        form.reset(); // Czyszczenie formularza
        sessionStorage.removeItem('tourOrder'); // Usunięcie danych z sessionStorage
        showPreview(); // Wyświetlenie podglądu
        document.querySelectorAll('.form-control').forEach(field => field.classList.remove('is-valid', 'is-invalid')); // Usunięcie klas walidacji z pól
        submitBtn.disabled = true; // Wyłączenie przycisku wysłania
        submitBtn.classList.add('disabled'); // Dodanie klasy 'disabled'
        hideEditForm(); // Ukrycie formularza edycji
        editOrderBtn.style.display = 'none'; // Ukrycie przycisku edycji zamówienia
    });

    // Funkcja wyświetlająca podgląd zamówienia
    function showPreview() {
        const order = sessionStorage.getItem('tourOrder'); // Pobieranie zamówienia z sessionStorage
        orderPreview.textContent = order ? JSON.stringify(JSON.parse(order), null, 2) : 'Brak zamówienia'; // Wyświetlanie zamówienia lub komunikatu o jego braku
    }

    // Funkcja wyświetlająca formularz edycji
    function showEditForm() {
        const order = JSON.parse(sessionStorage.getItem('tourOrder')); // Pobieranie i parsowanie zamówienia z sessionStorage
        if (order) {
            editFormContainer.style.display = 'block'; // Wyświetlanie kontenera formularza edycji
            document.getElementById('editFirstName').value = order.firstName; // Ustawianie wartości pól formularza edycji
            document.getElementById('editLastName').value = order.lastName;
            document.getElementById('editEmail').value = order.email;
            document.getElementById('editPhone').value = order.phone;
            document.getElementById('editTourDate').value = order.tourDate;
            document.getElementById('editTourType').value = order.tourType;
            document.getElementById('editOption1').checked = order.options.englishGuide;
            document.getElementById('editOption2').checked = order.options.museumTour;
            document.getElementById('editOption3').checked = order.options.foodTasting;
            document.getElementById('editAdditionalInfo').value = order.additionalInfo;
        }
    }

    // Funkcja ukrywająca formularz edycji
    function hideEditForm() {
        editFormContainer.style.display = 'none'; // Ukrywanie kontenera formularza edycji
    }

    // Funkcja walidująca formularz edycji
    const validateEditForm = () => {
        const editFields = [
            { id: 'editFirstName', validator: value => regexPatterns.firstName.test(value) },
            { id: 'editLastName', validator: value => regexPatterns.lastName.test(value) },
            { id: 'editEmail', validator: value => regexPatterns.email.test(value) },
            { id: 'editPhone', validator: value => regexPatterns.phone.test(value) },
            { id: 'editTourDate', validator: value => value && value >= new Date().toISOString().split('T')[0] }, // Sprawdzanie, czy data nie jest przeszła
            { id: 'editTourType', validator: value => !!value } // Sprawdzanie, czy pole jest wypełnione
        ];
        const isValid = editFields.every(({ id, validator }) => validateField(document.getElementById(id), validator)); // Walidacja wszystkich pól formularza edycji
        saveChangesBtn.disabled = !isValid; // Wyłączenie przycisku zapisywania zmian jeśli formularz jest niepoprawny
        saveChangesBtn.classList.toggle('disabled', !isValid); // Dodanie/Usunięcie klasy 'disabled'
        return isValid; // Zwracanie wyniku walidacji
    };

    // Walidacja formularza edycji przy wpisywaniu danych
    editForm.addEventListener('input', validateEditForm); // Walidacja przy każdym wpisaniu danych
    editForm.addEventListener('change', validateEditForm); // Walidacja przy każdej zmianie wartości

    // Obsługa przycisku edycji zamówienia
    editOrderBtn.addEventListener('click', function () {
        form.style.display = 'none'; // Ukrycie formularza zamówienia
        showEditForm(); // Wyświetlenie formularza edycji
    });

    // Obsługa przycisku zapisywania zmian w formularzu edycji
    saveChangesBtn.addEventListener('click', function () {
        if (!validateEditForm()) return; // Jeśli formularz edycji nie jest poprawny, zakończenie funkcji

        const editedOrder = {
            firstName: document.getElementById('editFirstName').value.trim(), // Pobieranie i przycinanie wartości pól
            lastName: document.getElementById('editLastName').value.trim(),
            email: document.getElementById('editEmail').value.trim(),
            phone: document.getElementById('editPhone').value.trim(),
            tourDate: document.getElementById('editTourDate').value.trim(),
            tourType: document.getElementById('editTourType').value,
            options: {
                englishGuide: document.getElementById('editOption1').checked, // Sprawdzanie zaznaczenia opcji przewodnika anglojęzycznego
                museumTour: document.getElementById('editOption2').checked, // Sprawdzanie zaznaczenia opcji zwiedzania muzeum
                foodTasting: document.getElementById('editOption3').checked // Sprawdzanie zaznaczenia opcji degustacji jedzenia
            },
            additionalInfo: document.getElementById('editAdditionalInfo').value.trim() // Pobieranie dodatkowych informacji
        };

        sessionStorage.setItem('tourOrder', JSON.stringify(editedOrder)); // Zapisanie danych w formacie JSON
        Swal.fire({
            title: 'Sukces!',
            text: 'Twoje zamówienie zostało edytowane.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }); // Wyświetlenie komunikatu o sukcesie

        showPreview(); // Wyświetlenie podglądu
        form.style.display = 'block'; // Ponowne wyświetlenie formularza zamówienia
        hideEditForm(); // Ukrycie formularza edycji
    });

    // Wyświetlenie podglądu oraz sprawdzenie, czy formularz edycji powinien być widoczny
    showPreview(); // Wyświetlenie podglądu zamówienia
    if (sessionStorage.getItem('tourOrder')) {
        editOrderBtn.style.display = 'block'; // Wyświetlenie przycisku edycji zamówienia, jeśli istnieje zapisane zamówienie
    }
});
