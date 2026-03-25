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
// 🔁 ROUND ROBIN (WITH STORAGE)
// ============================================

let lastAssignedIndex = JSON.parse(localStorage.getItem("assignIndex")) || {};

function getTechnician(city, selectedService) {

    let list = technicians[city]?.[selectedService];

    if (!list || list.length === 0) return null;

    let key = city + "_" + selectedService;

    if (lastAssignedIndex[key] === undefined) {
        lastAssignedIndex[key] = 0;
    }

    let index = lastAssignedIndex[key];
    let assigned = list[index];
 	
    console.log("Assigned Technician:", assigned, "| Index:", index);


    lastAssignedIndex[key] = (index + 1) % list.length;

    localStorage.setItem("assignIndex", JSON.stringify(lastAssignedIndex));

    return assigned;
}

// ============================================
// 🚀 MAIN
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // 📩 BOOKING FORM
    // ============================================

    const form = document.getElementById("bookingForm");

    if (form) {
        form.addEventListener("submit", function (e) {

            e.preventDefault();

            let name = document.getElementById("name")?.value;
            let phone = document.getElementById("phone")?.value;
            let city = document.getElementById("city")?.value;
            let selectedService = document.getElementById("service")?.value;
            let date = document.getElementById("date")?.value;
            let time = document.getElementById("time")?.value;

            if (!name || !phone || !city || !selectedService) {
                alert("Please fill all required fields");
                return;
            }

            let assignedNumber = getTechnician(city, selectedService);

            if (!assignedNumber) {
                assignedNumber = "919818185270";
            }

            let message = `🩺 *New Booking Request*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${city}
💉 Service: ${selectedService}
📅 Date: ${date}
⏰ Time: ${time}`;

            let whatsappURL = `https://wa.me/${assignedNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

            alert("Booking sent successfully!");

            form.reset();
        });
    }

    // ============================================
    // 🎞️ HERO SLIDER (FIXED)
    // ============================================

    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[index]) slides[index].classList.add("active");
    }

    if (slides.length > 0) {
        showSlide(0);

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    }

    // ============================================
    // 💰 PRICE CALCULATOR BUTTON
    // ============================================

    const calcBtn = document.getElementById("calcBtn");

    if (calcBtn) {
        calcBtn.addEventListener("click", calculatePrice);
    }

    // ============================================
    // 📅 DATE MIN = TODAY
    // ============================================

    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    // ============================================
    // 📱 PHONE VALIDATION
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

    let servicePrice = document.getElementById("estService")?.value;
    let urgency = document.getElementById("urgency")?.value;

    if (!servicePrice) {
        alert("Please select a service");
        return;
    }

    let total = Math.round(servicePrice * urgency);

    document.getElementById("estimateResult").innerHTML =
        "💰 Estimated Price: <strong>₹" + total + "</strong>";
}