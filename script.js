/**
 * Global function for Confetti Animation (Thank You Page)
 */
function startConfetti() {
    const confettiCount = 100;
    const colors = ['#007BFF', '#FF8C00', '#FFD700', '#46b8da', '#ff69b4'];
    const body = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize position and color
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = 1;

        // Apply animation
        const duration = Math.random() * 2 + 3; // 3 to 5 seconds
        const delay = Math.random() * 0.5;
        const xStart = (Math.random() - 0.5) * 500; // start x-offset
        const xEnd = (Math.random() - 0.5) * 500; // end x-offset
        
        confetti.style.transform = `translate(${xStart}px, 0) rotate(0deg)`;
        confetti.style.animation = `fall ${duration}s ease-in-out ${delay}s forwards, spin ${duration}s linear infinite`;

        // Add keyframes dynamically for cleaner CSS (optional, but ensures only this page uses them)
        if (!document.getElementById('confetti-keyframes')) {
            const style = document.createElement('style');
            style.id = 'confetti-keyframes';
            style.innerHTML = `
                @keyframes fall {
                    0% { transform: translateY(-100vh) translateX(${xStart}px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) translateX(${xEnd}px) rotate(720deg); opacity: 0; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        body.appendChild(confetti);

        // Remove element after animation to save memory
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}


/**
 * Form Validation and Redirection (Form Page)
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop default form submission

            if (validateForm()) {
                // If validation passes, simulate submission and redirect
                console.log("Form successfully validated and submitted.");
                alert("Order placed successfully! Redirecting to thank you page.");
                window.location.href = 'thankyou.html';
            } else {
                alert("Please correct the errors in the form before submitting.");
            }
        });
    }

    /**
     * Performs all necessary form validation checks.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    function validateForm() {
        let isValid = true;

        // 1. Basic HTML5 validation check (required fields, email format)
        if (!form.checkValidity()) {
            // Trigger browser's built-in validation messages
            form.reportValidity();
            isValid = false;
        }

        // 2. Custom check for shoe size selection
        const size = document.getElementById('size').value;
        if (size === "") {
            isValid = false;
        }
        
        // 3. Custom check for payment method (since radio group check can be tricky)
        const paymentRadios = document.getElementsByName('payment');
        let paymentSelected = false;
        for (const radio of paymentRadios) {
            if (radio.checked) {
                paymentSelected = true;
                break;
            }
        }
        if (!paymentSelected) {
            isValid = false;
        }

        return isValid;
    }
});
