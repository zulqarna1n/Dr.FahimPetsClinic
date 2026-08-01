/*==================================================
Dr. Fahim Pet Clinic
script.js

Part 1

Navigation
Sticky Navbar
Mobile Menu
Smooth Scrolling
Active Navigation

==================================================*/

"use strict";

/*==================================================
DOM Ready
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    Elements
    ==============================================*/

    const navbar = document.querySelector(".navbar");

    const header = document.getElementById("header");

    const hamburger = document.querySelector(".hamburger");

    const navLinks = document.querySelector(".nav-links");

    const navItems = document.querySelectorAll(".nav-links a");

    const sections = document.querySelectorAll("section");



    /*==============================================
    Sticky Navbar
    ==============================================*/

    function stickyNavbar() {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    stickyNavbar();

    window.addEventListener("scroll", stickyNavbar);



    /*==============================================
    Mobile Menu
    ==============================================*/

    if (hamburger) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");

            navLinks.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

    }



    /*==============================================
    Close Menu When Clicking Link
    ==============================================*/

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });



    /*==============================================
    Close Mobile Menu Clicking Outside
    ==============================================*/

    document.addEventListener("click", (event) => {

        if (!navLinks.contains(event.target)
            &&
            !hamburger.contains(event.target)) {

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });



    /*==============================================
    Smooth Scrolling
    ==============================================*/

    document.querySelectorAll('a[href^="#"]')

        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const target = document.querySelector(

                    this.getAttribute("href")

                );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });



    /*==============================================
    Active Navigation Link
    ==============================================*/

    function activeNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.clientHeight;

            if (

                pageYOffset >= sectionTop &&

                pageYOffset < sectionTop + sectionHeight

            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (!href) return;

            if (href.includes(currentSection)) {

                link.classList.add("active");

            }

        });

    }

    activeNavigation();

    window.addEventListener(

        "scroll",

        activeNavigation

    );



    /*==============================================
    Navbar Shadow Enhancement
    ==============================================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 200) {

            header.style.backdropFilter = "blur(18px)";

        } else {

            header.style.backdropFilter = "none";

        }

    });



    /*==============================================
    Prevent Body Scroll
    ==============================================*/

    const observer = new MutationObserver(() => {

        if (

            document.body.classList.contains("menu-open")

        ) {

            document.body.style.overflow = "hidden";

        }

        else {

            document.body.style.overflow = "";

        }

    });

    observer.observe(document.body, {

        attributes: true,

        attributeFilter: ["class"]

    });


/*==============================================
Reveal on Scroll
==============================================*/

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }

    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/*==============================================
Animated Statistics Counter
==============================================*/

const counterElements = document.querySelectorAll("[data-counter]");

function animateCounter(counter) {

    const target = Number(counter.dataset.counter);

    const duration = 1800;

    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const value = Math.floor(progress * target);

        counter.textContent = value.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent = target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}

if ("IntersectionObserver" in window && counterElements.length) {

    const counterObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.4
        }

    );

    counterElements.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/*==============================================
Scroll To Top Button
==============================================*/

const scrollTopButton = document.getElementById("scrollTopBtn");

function toggleScrollButton() {

    if (!scrollTopButton) return;

    if (window.scrollY > 500) {

        scrollTopButton.classList.add("show");

    } else {

        scrollTopButton.classList.remove("show");

    }

}

toggleScrollButton();

window.addEventListener("scroll", toggleScrollButton);

if (scrollTopButton) {

    scrollTopButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==============================================
Lazy Image Enhancement
==============================================*/

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ("IntersectionObserver" in window && lazyImages.length) {

    const imageObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("loaded");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.1
        }

    );

    lazyImages.forEach(image => {

        imageObserver.observe(image);

    });

}


/*==============================================
Header Shrink Effect
==============================================*/

function shrinkHeader() {

    if (!navbar) return;

    if (window.scrollY > 120) {

        navbar.classList.add("compact");

    } else {

        navbar.classList.remove("compact");

    }

}

shrinkHeader();

window.addEventListener("scroll", shrinkHeader);


/*==============================================
Scroll Performance Optimization
==============================================*/

let ticking = false;

function handleScroll() {

    stickyNavbar();

    activeNavigation();

    toggleScrollButton();

    shrinkHeader();

    ticking = false;

}

window.addEventListener("scroll", () => {

    if (!ticking) {

        window.requestAnimationFrame(handleScroll);

        ticking = true;

    }

});
// ==============================
// Dark Mode Toggle
// ==============================

const darkToggle = document.getElementById("theme-toggle");


if(darkToggle){

    darkToggle.addEventListener("click",()=>{


        document.body.classList.toggle("dark-mode");


        const icon = darkToggle.querySelector("i");


        if(document.body.classList.contains("dark-mode")){

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");


            localStorage.setItem("darkMode","enabled");


        }else{


            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");


            localStorage.setItem("darkMode","disabled");

        }


    });


}


// Load saved mode

if(localStorage.getItem("darkMode") === "enabled"){

    document.body.classList.add("dark-mode");


    const icon = document.querySelector("#darkModeToggle i");


    if(icon){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

}

/*==============================================
Image Fallback
==============================================*/

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function () {

        this.src = "assets/images/placeholder.jpg";

    });

});


/*==============================================
Dynamic Copyright
==============================================*/

const copyrightYear =
    document.getElementById("currentYear");

if (copyrightYear) {

    copyrightYear.textContent =
        new Date().getFullYear();

}


/*==============================================
Keyboard Accessibility
==============================================*/

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

        if (hamburger) {

            hamburger.classList.remove("active");

        }

        document.body.classList.remove("menu-open");

    }

});


/*==============================================
Button Ripple Effect
==============================================*/

document.querySelectorAll(
    ".btn-primary, .btn-secondary"
).forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple =
            document.createElement("span");

        ripple.className = "ripple";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX - rect.left) + "px";

        ripple.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*==============================================
Page Loader
==============================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*==============================================
Resize Handler
==============================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        navLinks.classList.remove("active");

        hamburger.classList.remove("active");

        document.body.classList.remove("menu-open");

        document.body.style.overflow = "";

    }

});


/*==============================================
Console Greeting
==============================================*/

console.log(
"%c🐾 Dr. Fahim Pet Clinic Website",
"color:#2563EB;font-size:18px;font-weight:bold;"
);

console.log(
"%cDeveloped using HTML5 • CSS3 • Vanilla JavaScript",
"color:#0EA5E9;font-size:13px;"
);


/*==============================================
Initialization
==============================================*/

function initializeWebsite() {

    stickyNavbar();

    activeNavigation();

    toggleScrollButton();

    shrinkHeader();

}

initializeWebsite();
});