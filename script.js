document.addEventListener("DOMContentLoaded", function(){

// HERO SLIDER

const slides = document.querySelectorAll(".slide");
let index=0;

function nextSlide(){

slides.forEach(s=>s.classList.remove("active"));

index++;

if(index>=slides.length){
index=0;
}

slides[index].classList.add("active");

}

setInterval(nextSlide,4000);


// BOOKING FORM

const bookingForm=document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value;
const phone=document.getElementById("phone").value;
const city=document.getElementById("city").value;
const service=document.getElementById("service").value;
const date=document.getElementById("date").value;
const time=document.getElementById("time").value;

const message=
`New Booking

Name: ${name}
Phone: ${phone}
City: ${city}
Service: ${service}
Date: ${date}
Time: ${time}`;

const url="https://wa.me/919818185270?text="+encodeURIComponent(message);

window.open(url);

});

}

});


// PRICE CALCULATOR

function calculatePrice(){

const service=document.getElementById("estService").value;
const urgency=document.getElementById("urgency").value;

if(service===""){
document.getElementById("estimateResult").innerText="Select service";
return;
}

const price=service*urgency;

document.getElementById("estimateResult").innerText=
"Estimated Price: ₹"+price;

}