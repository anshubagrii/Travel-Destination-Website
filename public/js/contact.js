/* =============================================
   contact.js — Contact form validation & submission
   Uses Web3Forms (free) for GitHub Pages deployment
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    if (!form) return;

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

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || name.length < 2) { setError('contactNameGroup'); valid = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('contactEmailGroup'); valid = false; }
        if (!subject || subject.length < 3) { setError('contactSubjectGroup'); valid = false; }
        if (!message || message.length < 10) { setError('contactMessageGroup'); valid = false; }

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
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showToast('success', 'Message Sent! ✉️', 'Thank you! We\'ll get back to you within 24 hours.');
                form.reset();
                clearAllErrors();
            } else {
                showToast('error', 'Send Failed', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            showToast('error', 'Network Error', 'Could not submit the form. Please check your connection.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        }
    });

    // ─── Real-time validation feedback ──────────────
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group) group.classList.remove('error');
        });
    });
});
