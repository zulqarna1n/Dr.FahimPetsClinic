/*==================================================
Dr. Fahim Pet Clinic
booking.js

Part 1

WhatsApp Appointment System

==================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    Configuration
    ==============================================*/

    const WHATSAPP_NUMBER = "+923029468953";

    /*==============================================
    Form
    ==============================================*/

    const form =
        document.getElementById("appointmentForm");

    if (!form) return;

    /*==============================================
    Submit
    ==============================================*/

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        /*==========================================
        Fields
        ==========================================*/

        const ownerName =
            document.getElementById("ownerName")
            .value.trim();

        const phone =
            document.getElementById("phone")
            .value.trim();

        const petName =
            document.getElementById("petName")
            .value.trim();

        const petType =
            document.getElementById("petType")
            .value.trim();

        const breed =
            document.getElementById("breed")
            .value.trim();

        const age =
            document.getElementById("age")
            .value.trim();

        const service =
            document.getElementById("service")
            .value.trim();

        const preferredDate =
            document.getElementById("preferredDate")
            .value;

        const preferredTime =
            document.getElementById("preferredTime")
            .value;

        const notes =
            document.getElementById("notes")
            .value.trim();

        /*==========================================
        Validation
        ==========================================*/

        if (
            !ownerName ||
            !phone ||
            !petName ||
            !petType ||
            !service ||
            !preferredDate ||
            !preferredTime
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }

        /*==========================================
        Phone Validation
        ==========================================*/

        const phoneRegex =
            /^[0-9+\-\s]{8,20}$/;

        if (!phoneRegex.test(phone)) {

            alert(
                "Please enter a valid phone number."
            );

            return;

        }

        /*==========================================
        Date Validation
        ==========================================*/

        const today = new Date();

        today.setHours(0,0,0,0);

        const selected =
            new Date(preferredDate);

        if (selected < today) {

            alert(
                "Please choose a future appointment date."
            );

            return;

        }

        /*==========================================
        Build Message
        ==========================================*/

        const message =
`🐾 *Appointment Request*

👤 Owner
${ownerName}

📞 Phone
${phone}

🐶 Pet Name
${petName}

🐾 Pet Type
${petType}

🦴 Breed
${breed || "N/A"}

🎂 Age
${age || "N/A"}

💉 Required Service
${service}

📅 Preferred Date
${preferredDate}

⏰ Preferred Time
${preferredTime}

📝 Additional Notes
${notes || "None"}

Thank you.`;
        /*==========================================
        Encode WhatsApp Message
        ==========================================*/

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        /*==========================================
        Submit Button
        ==========================================*/

        const submitButton =
            form.querySelector('button[type="submit"]');

        const originalText =
            submitButton ? submitButton.innerHTML : "";

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp...';

        }

        /*==========================================
        Open WhatsApp
        ==========================================*/

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        /*==========================================
        Success Feedback
        ==========================================*/

        setTimeout(() => {

            alert(
                "Your appointment request has been prepared. Please send the WhatsApp message to complete your booking."
            );

            form.reset();

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML = originalText;

            }

        }, 800);

    });

    /*==============================================
    Minimum Date
    ==============================================*/

    const dateInput =
        document.getElementById("preferredDate");

    if (dateInput) {

        const today = new Date();

        const yyyy = today.getFullYear();

        const mm = String(today.getMonth() + 1)
            .padStart(2, "0");

        const dd = String(today.getDate())
            .padStart(2, "0");

        dateInput.min = `${yyyy}-${mm}-${dd}`;

    }

    /*==============================================
    Phone Number Formatting
    ==============================================*/

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^0-9+\-\s]/g,
                ""
            );

        });

    }

    /*==============================================
    Console Message
    ==============================================*/

    console.log(
        "%c✓ WhatsApp Booking Ready",
        "color:#22C55E;font-weight:bold;"
    );

});