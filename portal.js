// ==========================================
// WEBSITE MAIN JAVASCRIPT
// ==========================================


// ==========================================
// MOBILE NAVIGATION MENU
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");


    if (mobileToggle && navMenu) {


        mobileToggle.addEventListener("click", () => {

            navMenu.classList.toggle("show");


            // Change menu icon

            if (navMenu.classList.contains("show")) {

                mobileToggle.innerHTML = "✖";

            } else {

                mobileToggle.innerHTML = "☰";

            }

        });



        // Close menu when clicking a link

        document.querySelectorAll("#navMenu a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                mobileToggle.innerHTML = "☰";

            });

        });



        // Close menu outside click

        document.addEventListener("click", (event) => {

            if (
                !navMenu.contains(event.target) &&
                !mobileToggle.contains(event.target)
            ) {

                navMenu.classList.remove("show");

                mobileToggle.innerHTML = "☰";

            }

        });


    }



// ==========================================
// SMOOTH SCROLLING
// ==========================================


document.querySelectorAll('a[href^="#"]').forEach(anchor => {


    anchor.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });


});




// ==========================================
// BACK TO TOP BUTTON
// ==========================================


const topButton = document.getElementById("backTop");


if(topButton){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 300){

            topButton.style.display="block";

        }else{

            topButton.style.display="none";

        }


    });



    topButton.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });


}




// ==========================================
// FOOTER YEAR AUTOMATIC UPDATE
// ==========================================


const year = document.getElementById("year");


if(year){

    year.textContent = new Date().getFullYear();

}




// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================


const passwordInput = document.getElementById("password");

const showPassword = document.getElementById("showPassword");


if(passwordInput && showPassword){


    showPassword.addEventListener("click",()=>{


        if(passwordInput.type === "password"){


            passwordInput.type="text";

            showPassword.innerHTML="🙈";


        }else{


            passwordInput.type="password";

            showPassword.innerHTML="👁️";


        }


    });


}




// ==========================================
// LOGIN VALIDATION
// ==========================================


const loginForm = document.getElementById("loginForm");


if(loginForm){


    loginForm.addEventListener("submit",(e)=>{


        e.preventDefault();



        const username =
        document.getElementById("username").value.trim();


        const password =
        document.getElementById("password").value.trim();



        if(username === "" || password === ""){


            alert("Please fill all fields");

            return;

        }



        // Example login

        if(username === "admin" && password === "1234"){


            alert("Login Successful");


            window.location.href="index.html";


        }else{


            alert("Wrong username or password");


        }



    });


}




// ==========================================
// CONTACT FORM VALIDATION
// ==========================================


const contactForm = document.getElementById("contactForm");


if(contactForm){


    contactForm.addEventListener("submit",(e)=>{


        e.preventDefault();



        alert("Thank you! Your message has been sent.");


        contactForm.reset();


    });


}



// ==========================================
// DARK MODE TOGGLE
// ==========================================


const darkToggle = document.getElementById("darkToggle");


if(darkToggle){


    darkToggle.addEventListener("click",()=>{


        document.body.classList.toggle("dark-mode");



        localStorage.setItem(

            "darkMode",

            document.body.classList.contains("dark-mode")

        );


    });



    // Load saved mode

    if(localStorage.getItem("darkMode") === "true"){


        document.body.classList.add("dark-mode");


    }


}



});
