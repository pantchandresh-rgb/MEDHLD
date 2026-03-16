function calculatePrice(){

const service =
Number(document.getElementById("estService").value);

const urgency =
Number(document.getElementById("urgency").value);

if(!service){

document.getElementById("estimateResult")
.innerText="Please select a service";

return;

}

const price = service * urgency;

document.getElementById("estimateResult")
.innerText="Estimated Price: ₹"+price;

}

document
.getElementById("bookingForm")
.addEventListener("submit",function(e){

e.preventDefault();

const name =
document.getElementById("name").value;

const phone =
document.getElementById("phone").value;

const service =
document.getElementById("service").value;

const date =
document.getElementById("date").value;

const message =
`New Booking

Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}`;

const whatsapp =
"https://wa.me/919818185270?text="+
encodeURIComponent(message);

window.open(whatsapp,"_blank");

});



/* HERO IMAGE SLIDER */

document.addEventListener("DOMContentLoaded", function(){

let slides = document.querySelectorAll(".slide");
let index = 0;

function nextSlide(){

slides[index].classList.remove("active");

index = (index + 1) % slides.length;

slides[index].classList.add("active");

}

setInterval(nextSlide, 4000);

});