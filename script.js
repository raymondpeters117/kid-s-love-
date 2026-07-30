/* ===========================================
   Kid's Love Nursery & Daycare Centre
   Mobile Navigation & Active Link
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Mobile Menu
    // ==========================

    const menuBtn = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            // Change menu icon
            if (navMenu.classList.contains("show")) {
                menuBtn.innerHTML = "&times;";
            } else {
                menuBtn.innerHTML = "☰";
            }

        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a, .nav-menu a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");
                menuBtn.innerHTML = "☰";

            });

        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                !menuBtn.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {

                navMenu.classList.remove("show");
                menuBtn.innerHTML = "☰";

            }

        });

    }

    // ==========================
    // Active Navigation Link
    // ==========================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a, .nav-menu a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

    // ==========================
    // Smooth Scrolling
    // ==========================

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

    // ==========================
    // Fade-in Animation
    // ==========================

    const elements = document.querySelectorAll(
        ".card, .block, .project-card, .info-box, .contact-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.7s ease";

        observer.observe(el);

    });

});
