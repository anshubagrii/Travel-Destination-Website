/* =============================================
   booking.js — Booking form validation & submission
   Uses Web3Forms (free) for GitHub Pages deployment
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('bookingSubmitBtn');
    if (!form) return;

    // ─── Pre-select destination from URL params ─────
    const params = new URLSearchParams(window.location.search);
    const preselectedDest = params.get('dest');
    if (preselectedDest) {
        const destSelect = document.getElementById('bookingDest');
        if (destSelect) {
            const option = destSelect.querySelector(`option[value="${preselectedDest}"]`);
            if (option) {
                destSelect.value = preselectedDest;
            }
        }
    }

    // ─── Set min dates ──────────────────────────────
    const checkinInput = document.getElementById('bookingCheckin');
    const checkoutInput = document.getElementById('bookingCheckout');
    const today = new Date().toISOString().split('T')[0];

    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
            if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
                checkoutInput.value = '';
            }
        });
    }


    // ─── Validation helpers ─────────────────────────
    function setError(groupId) {
        document.getElementById(groupId)?.classList.add('error');
    }

    function clearAllErrors() {
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    }

    function validateForm() {
        clearAllErrors();
        let valid = true;

        const name = document.getElementById('bookingName').value.trim();
        const email = document.getElementById('bookingEmail').value.trim();
        const dest = document.getElementById('bookingDest').value;
        const checkin = document.getElementById('bookingCheckin').value;
        const checkout = document.getElementById('bookingCheckout').value;
        const guests = document.getElementById('bookingGuests').value;

        if (!name || name.length < 2) { setError('nameGroup'); valid = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('emailGroup'); valid = false; }
        if (!dest) { setError('destGroup'); valid = false; }
        if (!checkin) { setError('checkinGroup'); valid = false; }
        if (!checkout || (checkin && checkout <= checkin)) { setError('checkoutGroup'); valid = false; }
        if (!guests || guests < 1 || guests > 20) { setError('guestsGroup'); valid = false; }

        return valid;
    }


    // ─── Form submission via Web3Forms ──────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('error', 'Validation Error', 'Please fix the highlighted fields.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Processing...';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showToast('success', 'Booking Confirmed! 🎉', 'We\'ve received your booking and will contact you within 24 hours.');
                form.reset();
                clearAllErrors();
                // Re-set min dates after reset
                if (checkinInput) checkinInput.min = today;
                if (checkoutInput) checkoutInput.min = today;
            } else {
                showToast('error', 'Submission Failed', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            showToast('error', 'Network Error', 'Could not submit the form. Please check your connection.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-check-circle"></i> Confirm Booking';
        }
    });

    // ─── Real-time validation feedback ──────────────
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group) group.classList.remove('error');
        });
    });
});
