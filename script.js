// ============================================
// 🔧 TECHNICIAN DATABASE (UNCHANGED)
// ============================================

const technicians = {
    Haldwani: {
        Injection: ["919900000001", "919900000002"],
        "IV Drip": ["919900000003"],
        ECG: ["919900000004"],
        "Nurse Visit": ["919900000005"],
        Physiotherapy: ["919900000006"],
        "Blood Test": ["919900000007"],
        "Wound Dressing": ["919900000008"]
    },
    Kathgodam: {
        Injection: ["919800000001"],
        "IV Drip": ["919800000002"],
        ECG: ["919800000003"],
        "Nurse Visit": ["919800000004"],
        Physiotherapy: ["919800000005"],
        "Blood Test": ["919800000006"],
        "Wound Dressing": ["919800000007"]
    },
    Nainital: {
        Injection: ["919700000001"],
        "IV Drip": ["919700000002"],
        ECG: ["919700000003"],
        "Nurse Visit": ["919700000004"],
        Physiotherapy: ["919700000005"],
        "Blood Test": ["919700000006"],
        "Wound Dressing": ["919700000007"]
    }
};

// ============================================
// 🔁 ROUND ROBIN MEMORY (UPGRADED)
// ============================================

let lastAssignedIndex = JSON.parse(localStorage.getItem("assignIndex")) || {};

// ============================================
// 👨‍⚕️ ASSIGN TECHNICIAN
// ============================================

function getTechnician(city, service) {

    let list = technicians[city]?.[service];

    if (!list || list.length === 0) return null;

    let key = city + "_" + service;

    if (lastAssignedIndex[key] === undefined) {
        lastAssignedIndex[key] = 0;
    }

    let index = lastAssignedIndex[key];
    let assigned = list[index];

    // update index
    lastAssignedIndex[key] = (index + 1) % list.length;

    // save to localStorage
    localStorage.setItem("assignIndex", JSON.stringify(lastAssignedIndex));

    return assigned;
}

// ============================================
// 🚀 MAIN
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // 1. BOOKING FORM → SMART ASSIGNMENT
    // ============================================

    const form = document.getElementById("bookingForm");

    if (form) {
        form.addEventListener("submit", function (e) {

            e.preventDefault();

            let name = document.getElementById("name").value;
            let phone = document.getElementById("phone").value;
            let city = document.getElementById("city").value;
            let service = document.getElementById("service").value;
            let date = document.getElementById("date").value;
            let time = document.getElementById("time").value;

            if (!name || !phone || !city || !service) {
                alert("Please fill all required fields");
                return;
            }

            // 🔥 ASSIGN TECHNICIAN
            let assignedNumber = getTechnician(city, service);

            if (!assignedNumber) {
                assignedNumber = "919818185270";
            }

            let message = `🩺 *New Booking Request*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${city}
💉 Service: ${service}
📅 Date: ${date}
⏰ Time: ${time}`;

            let whatsappURL = `https://wa.me/${assignedNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

            alert("Booking sent successfully!");

            form.reset();
        });
    }

    // ============================================
    // 2. HERO SLIDER (FIXED)
    // ============================================

    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[index]) slides[index].classList.add("active");
    }

    if (slides.length > 0) {
        showSlide(0); // 🔥 IMPORTANT FIX

        setInterval(function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    }

    // ============================================
    // 3. PRICE CALCULATOR BUTTON FIX
    // ============================================

    const calcBtn = document.getElementById("calcBtn");

    if (calcBtn) {
        calcBtn.addEventListener("click", calculatePrice);
    }

    // ============================================
    // 4. DATE MIN = TODAY
    // ============================================

    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    // ============================================
    // 5. PHONE VALIDATION
    // ============================================

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
        });
    }

});

// ============================================
// 💰 PRICE CALCULATOR (GLOBAL)
// ============================================

function calculatePrice() {

    let service = document.getElementById("estService").value;
    let urgency = document.getElementById("urgency").value;

    if (!service) {
        alert("Please select a service");
        return;
    }

    let total = Math.round(service * urgency);

    document.getElementById("estimateResult").innerHTML =
        "💰 Estimated Price: <strong>₹" + total + "</strong>";
}