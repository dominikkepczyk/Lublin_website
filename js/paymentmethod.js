document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm');
    const paymentMethod = document.getElementById('paymentMethod');
    const blikPayment = document.getElementById('blikPayment');
    const przelewPayment = document.getElementById('przelewPayment');
    const blikCode = document.getElementById('blikCode');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVV = document.getElementById('cardCVV');
    const tourHours = document.getElementById('tourHours');
    const totalPrice = document.getElementById('totalPrice');

    const editForm = document.getElementById('editForm');
    const editPaymentMethod = document.getElementById('editPaymentMethod');
    const editBlikPayment = document.getElementById('editBlikPayment');
    const editPrzelewPayment = document.getElementById('editPrzelewPayment');
    const editBlikCode = document.getElementById('editBlikCode');
    const editCardNumber = document.getElementById('editCardNumber');
    const editCardExpiry = document.getElementById('editCardExpiry');
    const editCardCVV = document.getElementById('editCardCVV');
    const editTourHours = document.getElementById('editTourHours');
    const editTotalPrice = document.getElementById('editTotalPrice');

    // Funkcja do aktualizacji ceny końcowej
    const updateTotalPrice = () => {
        let price = 0;
        if (tourHours.value) {
            price += parseInt(tourHours.value) * 150;
        }
        if (document.getElementById('rozszerzona').selected) price += 100;
        if (document.getElementById('option1').checked) price += 50;
        if (document.getElementById('option2').checked) price += 100;
        if (document.getElementById('option3').checked) price += 70;

        totalPrice.textContent = `${price} zł`;
    };

    const updateEditTotalPrice = () => {
        let price = 0;
        if (editTourHours.value) {
            price += parseInt(editTourHours.value) * 150;
        }
        if (document.getElementById('editRozszerzona').selected) price += 100;
        if (document.getElementById('editOption1').checked) price += 50;
        if (document.getElementById('editOption2').checked) price += 100;
        if (document.getElementById('editOption3').checked) price += 70;

        editTotalPrice.textContent = `${price} zł`;
    };

    // Obsługa wyboru sposobu płatności
    paymentMethod.addEventListener('change', function () {
        blikPayment.style.display = 'none';
        przelewPayment.style.display = 'none';

        if (paymentMethod.value === 'blik') {
            blikPayment.style.display = 'block';
        } else if (paymentMethod.value === 'przelew') {
            przelewPayment.style.display = 'block';
        }
    });

    editPaymentMethod.addEventListener('change', function () {
        editBlikPayment.style.display = 'none';
        editPrzelewPayment.style.display = 'none';

        if (editPaymentMethod.value === 'blik') {
            editBlikPayment.style.display = 'block';
        } else if (editPaymentMethod.value === 'przelew') {
            editPrzelewPayment.style.display = 'block';
        }
    });

    // Walidacja kodu BLIK
    blikCode.addEventListener('input', function () {
        const isValid = /^\d{6}$/.test(blikCode.value);
        blikCode.classList.toggle('is-invalid', !isValid);
        blikCode.classList.toggle('is-valid', isValid);
    });

    editBlikCode.addEventListener('input', function () {
        const isValid = /^\d{6}$/.test(editBlikCode.value);
        editBlikCode.classList.toggle('is-invalid', !isValid);
        editBlikCode.classList.toggle('is-valid', isValid);
    });

    // Walidacja numeru karty
    cardNumber.addEventListener('input', function () {
        const isValid = /^\d{16}$/.test(cardNumber.value);
        cardNumber.classList.toggle('is-invalid', !isValid);
        cardNumber.classList.toggle('is-valid', isValid);
    });

    editCardNumber.addEventListener('input', function () {
        const isValid = /^\d{16}$/.test(editCardNumber.value);
        editCardNumber.classList.toggle('is-invalid', !isValid);
        editCardNumber.classList.toggle('is-valid', isValid);
    });

    // Walidacja daty ważności
    cardExpiry.addEventListener('input', function () {
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.value);
        cardExpiry.classList.toggle('is-invalid', !isValid);
        cardExpiry.classList.toggle('is-valid', isValid);
    });

    editCardExpiry.addEventListener('input', function () {
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(editCardExpiry.value);
        editCardExpiry.classList.toggle('is-invalid', !isValid);
        editCardExpiry.classList.toggle('is-valid', isValid);
    });

    // Walidacja kodu CVV
    cardCVV.addEventListener('input', function () {
        const isValid = /^\d{3}$/.test(cardCVV.value);
        cardCVV.classList.toggle('is-invalid', !isValid);
        cardCVV.classList.toggle('is-valid', isValid);
    });

    editCardCVV.addEventListener('input', function () {
        const isValid = /^\d{3}$/.test(editCardCVV.value);
        editCardCVV.classList.toggle('is-invalid', !isValid);
        editCardCVV.classList.toggle('is-valid', isValid);
    });

    // Aktualizacja ceny końcowej przy zmianach
    form.addEventListener('input', updateTotalPrice);
    form.addEventListener('change', updateTotalPrice);

    editForm.addEventListener('input', updateEditTotalPrice);
    editForm.addEventListener('change', updateEditTotalPrice);


});
