// ================================
// MOBILE NAVIGATION TOGGLE
// ================================


const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");


mobileToggle.addEventListener("click", function(){


    navMenu.classList.toggle("show");


    // Change menu icon

    if(navMenu.classList.contains("show")){

        mobileToggle.innerHTML = "✖";

    }else{

        mobileToggle.innerHTML = "☰";

    }


});
