/* ===================================================
   KID'S LOVE NURSERY
   ACADEMICS PAGE JAVASCRIPT
=================================================== */


/* ===============================
   MOBILE NAVIGATION
================================ */

document.addEventListener("DOMContentLoaded",()=>{


const toggleBtn=document.getElementById("mobileToggle");

const navMenu=document.getElementById("navMenu");



if(toggleBtn && navMenu){


toggleBtn.addEventListener("click",()=>{


    navMenu.classList.toggle("show");

    toggleBtn.classList.toggle("active");


});




// close menu after clicking link

document.querySelectorAll(".nav-links a").forEach(link=>{


link.addEventListener("click",()=>{


    navMenu.classList.remove("show");

    toggleBtn.classList.remove("active");


});


});


}



});





/* ===============================
   HERO SLIDESHOW
================================ */


const slides=[


"IMG-20260707-WA0017.jpg",

"IMG-20260707-WA0018.jpg",

"IMG-20260707-WA0019.jpg",

"IMG-20260707-WA0020.jpg"


];


let currentSlide=0;


function changeHero(){


const hero=document.querySelector(".academic-hero");


if(!hero) return;



hero.style.backgroundImage=`

linear-gradient(
rgba(0,0,0,.55),
rgba(0,0,0,.55)
),

url('${slides[currentSlide]}')

`;



currentSlide++;



if(currentSlide >= slides.length){

currentSlide=0;

}



}



setInterval(changeHero,5000);





/* ===============================
   COUNTER ANIMATION
================================ */


const counters=document.querySelectorAll(".counter");


counters.forEach(counter=>{


counter.innerText="0";


const updateCounter=()=>{


const target=+counter.getAttribute("data-target");


const value=+counter.innerText;


const increment=target/100;



if(value < target){


counter.innerText=Math.ceil(value+increment);


setTimeout(updateCounter,25);


}

else{


counter.innerText=target;


}


};


updateCounter();


});





/* ===============================
   SCROLL REVEAL ANIMATION
================================ */


const revealElements=document.querySelectorAll(
".academic-card, .subject-card, .program-card"
);



const revealOnScroll=()=>{


revealElements.forEach(element=>{


const position=
element.getBoundingClientRect().top;


const screen=
window.innerHeight - 100;



if(position < screen){


element.classList.add("show");


}


});


};



window.addEventListener(
"scroll",
revealOnScroll
);



revealOnScroll();





/* ===============================
   BACK TO TOP BUTTON
================================ */


const topBtn=document.getElementById("topBtn");


if(topBtn){


window.addEventListener("scroll",()=>{


if(window.scrollY > 400){


topBtn.style.display="block";


}

else{


topBtn.style.display="none";


}


});



topBtn.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};
/* ===================================
KID'S LOVE NURSERY
ADMISSION SYSTEM
=================================== */


document.addEventListener("DOMContentLoaded",()=>{


const form=document.getElementById("admissionForm");


if(form){


form.addEventListener("submit",(e)=>{

e.preventDefault();



let students =
JSON.parse(localStorage.getItem("students")) || [];



let student={


id:Date.now(),

name:
document.getElementById("childName").value,


class:
document.getElementById("className").value,


gender:
document.getElementById("gender").value,


parent:
document.getElementById("parentName").value,


date:
new Date().toLocaleDateString()


};



students.push(student);



localStorage.setItem(
"students",
JSON.stringify(students)
);



alert("Child admission saved successfully");


form.reset();


});


}


});

}
