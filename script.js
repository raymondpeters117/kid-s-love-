```javascript
/* ===========================================
   Kid's Love Nursery & Daycare Centre
   Mobile Navigation, Active Link,
   Smooth Scrolling & Fade-in Animation
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    const menuBtn = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        // Open / close mobile menu
        menuBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            navMenu.classList.toggle("show");

            // Change menu icon
            if (navMenu.classList.contains("show")) {
                menuBtn.innerHTML = "&times;";
                menuBtn.setAttribute("aria-expanded", "true");
            } else {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu when navigation link is clicked
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");

            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navMenu.classList.remove("show");

                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");

            }

        });

        // Close menu when pressing Escape
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                navMenu.classList.remove("show");

                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");

            }

        });

    }


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    let currentPage = window.location.pathname.split("/").pop();

    // If URL ends with "/" treat it as index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    const allNavLinks = document.querySelectorAll(
        "#navMenu a, .nav-links a, .nav-menu a"
    );

    allNavLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (!href) return;

        // Ignore anchor links such as #about
        if (href.startsWith("#")) return;

        // Remove query strings and hashes
        const cleanHref = href
            .split("?")[0]
            .split("#")[0];

        const linkPage = cleanHref.split("/").pop();

        if (
            linkPage === currentPage ||
            (currentPage === "index.html" && linkPage === "")
        ) {
            link.classList.add("active");
        }

    });


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    const smoothLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    smoothLinks.forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ==========================================
    // FADE-IN ANIMATION
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".card, .block, .project-card, .info-box, .contact-card"
    );

    // Check if browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        // Stop observing after animation
                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(40px)";
            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(element);

        });

    } else {

        // Fallback for older browsers
        animatedElements.forEach(element => {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        });

    }


    // ==========================================
    // RESET MOBILE MENU ON DESKTOP
    // ==========================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768 && navMenu && menuBtn) {

            navMenu.classList.remove("show");

            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-expanded", "false");

        }

    });

});
```
