// ============================================
// HomeCare Health - FINAL CLEAN JS FILE
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // 1. MOBILE NAV TOGGLE
    // ============================================

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }


    // ============================================
    // 2. SMOOTH SCROLL
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // ============================================
    // 3. BOOKING FORM → WHATSAPP
    // ============================================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const city = document.getElementById("city").value;
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            if (!name || !phone || !city || !service || !date || !time) {
                alert("Please fill all fields");
                return;
            }

            if (phone.length !== 10) {
                alert("Enter valid 10 digit phone number");
                return;
            }

            const message =
`📋 New Service Booking

👤 Name: ${name}
📞 Phone: ${phone}
📍 City: ${city}
🏥 Service: ${service}

📅 Date: ${date}
⏰ Time: ${time}`;

            const whatsappNumber = "919818185270";

            const url =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            window.open(url, "_blank");

            bookingForm.reset();

        });

    }


    // ============================================
    // 4. HERO IMAGE SLIDER (AUTO)
    // ============================================

    window.onload = function () {

    let slideIndex = 0;
    const slides = document.querySelectorAll(".hero-slider img");

    function showSlides() {

        if (slides.length === 0) return;

        slides.forEach(img => {
            img.style.display = "none";
        });

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";

        setTimeout(showSlides, 3000);
    }

    showSlides();
};

    // ============================================
    // 5. STICKY HEADER (OPTIONAL)
    // ============================================

    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    // ============================================
    // 6. DATE MIN = TODAY
    // ============================================

    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }


    // ============================================
    // 7. PHONE INPUT ONLY NUMBERS
    // ============================================

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }

});


// ============================================
// 8. PRICE CALCULATOR (GLOBAL)
// ============================================

function calculatePrice() {

    const service = Number(document.getElementById("estService").value);
    const urgency = Number(document.getElementById("urgency").value);

    if (!service) {
        document.getElementById("estimateResult").innerText =
            "Please select a service";
        return;
    }

    const price = service * urgency;

    document.getElementById("estimateResult").innerText =
        "Estimated Price: ₹" + price.toLocaleString("en-IN");
}

// HERO IMAGE SLIDER
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function autoSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Show first slide
showSlide(currentSlide);

// Auto change every 3 sec
setInterval(autoSlide, 3000);