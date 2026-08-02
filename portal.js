/* =====================================================
   KID'S LOVE NURSERY
   MOBILE NAVIGATION TOGGLE
===================================================== */


const mobileToggle = document.getElementById("mobileToggle");

const navMenu = document.getElementById("navMenu");



if(mobileToggle && navMenu){


    mobileToggle.addEventListener("click",()=>{


        navMenu.classList.toggle("show");


        // Change button icon

        if(navMenu.classList.contains("show")){

            mobileToggle.innerHTML="✖";

        }

        else{

            mobileToggle.innerHTML="☰";

        }


    });



    // Close menu when clicking a link

    document.querySelectorAll(".nav-links a")
    .forEach(link=>{


        link.addEventListener("click",()=>{

            navMenu.classList.remove("show");

            mobileToggle.innerHTML="☰";

        });


    });



}
