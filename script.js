// ============================================
// 🔧 TECHNICIAN DATABASE (UNCHANGED)
// ============================================

const technicians = {
    Haldwani: {

        "Rampur Road": {
            Injection: ["919900000001", "919900000002"],
            "IV Drip": ["919900000003"],
            ECG: ["919900000004"],
            "Nurse Visit": ["919900000005"],
            Physiotherapy: ["919900000006"],
            "Blood Test": ["919900000007"]
        },

        "Kaladhungi Road": {
            Injection: ["919900000008"],
            "IV Drip": ["919900000009"],
            ECG: ["919900000010"],
            "Nurse Visit": ["919900000011"]
        },

        "Nainital Road": {
            Injection: ["919900000012"],
            Physiotherapy: ["919900000013"],
            "Blood Test": ["919900000014"]
        },

        "Mukhani": {
            Injection: ["919900000015"],
            "IV Drip": ["919900000016"],
            "Nurse Visit": ["919900000017"],
            Physiotherapy: ["919900000018"]
        },

        "Heera Nagar": {
            Injection: ["919900000019"],
            ECG: ["919900000020"]
        },

        "Kusumkhera": {
            Injection: ["919900000021"],
            "Blood Test": ["919900000022"]
        },

        "Panchakki": {
            Injection: ["919900000023"],
            "IV Drip": ["919900000024"]
        },

        "Bareilly Road": {
            Injection: ["919900000025"],
            "Nurse Visit": ["919900000026"]
        },

        "Transport Nagar": {
            Injection: ["919900000027"],
            Physiotherapy: ["919900000028"]
        }
    },

    Kathgodam: {

        "Kathgodam Market": {
            Injection: ["919900000029"],
            "IV Drip": ["919900000030"],
            ECG: ["919900000031"]
        },

        "Gaula Barrage": {
            Injection: ["919900000032"],
            "Blood Test": ["919900000033"]
        },

        "Shish Mahal": {
            Injection: ["919900000034"],
            "Nurse Visit": ["919900000035"]
        },

        "Ranibagh": {
            Injection: ["919900000036"],
            Physiotherapy: ["919900000037"]
        },

        "Lalkuan Road": {
            Injection: ["919900000038"],
            "IV Drip": ["919900000039"]
        }
    }
};


// ============================================
// 🔁 ROUND ROBIN (WITH STORAGE)
// ============================================

// ==============================
// 🔹 ROUND ROBIN + FALLBACK LOGIC
// ==============================

let lastAssignedIndex = JSON.parse(localStorage.getItem("assignIndex")) || {};

function getTechnician(city, area, selectedService) {

    // 🔹 1. Try exact area match
    let list = technicians[city]?.[area]?.[selectedService];
    let key = city + "_" + area + "_" + selectedService;

    // 🔹 2. FALLBACK: if no technician in area
    if (!list || list.length === 0) {

        console.log("No tech in selected area → using fallback");

        let allAreas = technicians[city];
        let combinedList = [];

        for (let areaName in allAreas) {
            let services = allAreas[areaName][selectedService];
            if (services) {
                combinedList = combinedList.concat(services);
            }
        }

        if (combinedList.length === 0) return null;

        list = combinedList;
        key = city + "_ALL_" + selectedService;
    }

    // 🔹 3. ROUND ROBIN
    if (lastAssignedIndex[key] === undefined) {
        lastAssignedIndex[key] = 0;
    }

    let index = lastAssignedIndex[key];
    let assigned = list[index];

    console.log("Assigned:", assigned, "| Key:", key, "| Index:", index);

    lastAssignedIndex[key] = (index + 1) % list.length;

    localStorage.setItem("assignIndex", JSON.stringify(lastAssignedIndex));

    return assigned;
}


// ============================================
// 🚀 MAIN
// ============================================



    // ============================================
    // 📩 BOOKING FORM
    // ============================================

    document.addEventListener("DOMContentLoaded", function (e	document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let area = document.getElementById("area").value;
    let address = document.getElementById("address").value.trim();
    let selectedService = document.getElementById("service").value;

        if (!name || !phone || !selectedService || !area || !address) {
    alert("Please fill all fields");
    return;
}

        let message = `🩺 *New Booking Request*

👤 Name: ${name}
📞 Phone: ${phone}
📌 Area: ${area}
🏠 Address: ${address}
💉 Service: ${selectedService}
📅 Date: ${date}
⏰ Time: ${time}
📝 Notes: ${notes || "N/A"}

🚀 Requested via: Website Booking Form`;

        let whatsappURL = `https://wa.me/${assignedNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

        form.reset();

        document.querySelectorAll("input, select, textarea").forEach(el => {
            el.value = "";
        });

        alert("Booking sent successfully!");

    });
}
 


   // ============================================
    // 🎞️ HERO SLIDER (FIXED)
    // ============================================
let slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
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

     
    form.reset();

// force clear (extra safety)
document.querySelectorAll("input, select, textarea").forEach(el => {
    el.value = "";
});


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

const calcBtn = document.getElementById("calcBtn");

if (calcBtn) {
    calcBtn.addEventListener("click", function () {

        let servicePrice = document.getElementById("estService").value;
        let urgency = document.getElementById("urgency").value;

        if (!servicePrice || !urgency) {
            alert("Please select all options");
            return;
        }

        let total = Math.round(servicePrice * urgency);

        document.getElementById("estimateResult").innerHTML =
            "💰 Estimated Price: ₹" + total;

    });
}