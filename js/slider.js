/*==================================================
Dr. Fahim Pet Clinic
slider.js

Premium Testimonial Slider
Part 1

- Initialization
- Active Slides
- Auto Play
- Dot Navigation
- Previous / Next

==================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    Elements
    ==============================================*/

    const slider = document.querySelector(".testimonial-slider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".testimonial-card");

    const dots = slider.querySelectorAll(".dot");

    const prevBtn = slider.querySelector(".slider-prev");

    const nextBtn = slider.querySelector(".slider-next");

    if (slides.length === 0) return;

    /*==============================================
    Configuration
    ==============================================*/

    let currentSlide = 0;

    let autoPlay;

    const AUTO_PLAY_DELAY = 5000;

    const totalSlides = slides.length;

    /*==============================================
    Update Slider
    ==============================================*/

    function updateSlider(index) {

        slides.forEach((slide, i) => {

            slide.classList.remove("active");

            slide.setAttribute("aria-hidden", "true");

            if (i === index) {

                slide.classList.add("active");

                slide.setAttribute("aria-hidden", "false");

            }

        });

        dots.forEach((dot, i) => {

            dot.classList.toggle("active", i === index);

            dot.setAttribute(
                "aria-selected",
                i === index ? "true" : "false"
            );

        });

        currentSlide = index;

    }

    /*==============================================
    Next Slide
    ==============================================*/

    function nextSlide() {

        let next = currentSlide + 1;

        if (next >= totalSlides) {

            next = 0;

        }

        updateSlider(next);

    }

    /*==============================================
    Previous Slide
    ==============================================*/

    function previousSlide() {

        let previous = currentSlide - 1;

        if (previous < 0) {

            previous = totalSlides - 1;

        }

        updateSlider(previous);

    }

    /*==============================================
    Auto Play
    ==============================================*/

    function startAutoPlay() {

        stopAutoPlay();

        autoPlay = setInterval(() => {

            nextSlide();

        }, AUTO_PLAY_DELAY);

    }

    function stopAutoPlay() {

        clearInterval(autoPlay);

    }

    /*==============================================
    Button Events
    ==============================================*/

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            nextSlide();

            startAutoPlay();

        });

    }

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            previousSlide();

            startAutoPlay();

        });

    }

    /*==============================================
    Dot Navigation
    ==============================================*/

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            updateSlider(index);

            startAutoPlay();

        });

    });

    /*==============================================
    Initialize
    ==============================================*/

    updateSlider(0);

    startAutoPlay();
    /*==============================================
Pause On Hover
==============================================*/

slider.addEventListener("mouseenter", () => {

    stopAutoPlay();

});

slider.addEventListener("mouseleave", () => {

    startAutoPlay();

});


/*==============================================
Keyboard Navigation
==============================================*/

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        startAutoPlay();

    }

    if (event.key === "ArrowLeft") {

        previousSlide();

        startAutoPlay();

    }

});


/*==============================================
Touch Swipe Support
==============================================*/

let touchStartX = 0;

let touchEndX = 0;

const SWIPE_THRESHOLD = 50;

slider.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);

slider.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);

function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < SWIPE_THRESHOLD)
        return;

    if (distance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }

    startAutoPlay();

}


/*==============================================
Visibility Change
Pause Slider When Tab Is Hidden
==============================================*/

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            stopAutoPlay();

        } else {

            startAutoPlay();

        }

    }
);


/*==============================================
Focus Support
==============================================*/

slides.forEach(slide => {

    slide.addEventListener("focusin", () => {

        stopAutoPlay();

    });

    slide.addEventListener("focusout", () => {

        startAutoPlay();

    });

});


/*==============================================
Resize Handling
==============================================*/

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        updateSlider(currentSlide);

    }, 150);

});


/*==============================================
Prevent Dragging Images
==============================================*/

slides.forEach(slide => {

    const images = slide.querySelectorAll("img");

    images.forEach(image => {

        image.setAttribute(
            "draggable",
            "false"
        );

    });

});


/*==============================================
Slider Observer
Auto Play Only When Visible
==============================================*/

if ("IntersectionObserver" in window) {

    const sliderObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startAutoPlay();

                    } else {

                        stopAutoPlay();

                    }

                });

            },

            {
                threshold: 0.25
            }

        );

    sliderObserver.observe(slider);

}
/*==============================================
Accessibility Enhancements
==============================================*/

slides.forEach((slide, index) => {

    slide.setAttribute("role", "group");

    slide.setAttribute(
        "aria-label",
        `Testimonial ${index + 1} of ${totalSlides}`
    );

});

dots.forEach((dot, index) => {

    dot.setAttribute("role", "tab");

    dot.setAttribute(
        "aria-label",
        `Go to testimonial ${index + 1}`
    );

});


/*==============================================
Public Slider API
==============================================*/

window.testimonialSlider = {

    next() {

        nextSlide();

        startAutoPlay();

    },

    previous() {

        previousSlide();

        startAutoPlay();

    },

    goTo(index) {

        if (
            index >= 0 &&
            index < totalSlides
        ) {

            updateSlider(index);

            startAutoPlay();

        }

    },

    current() {

        return currentSlide;

    }

};


/*==============================================
Safety Check
==============================================*/

if (currentSlide >= totalSlides) {

    updateSlider(0);

}


/*==============================================
Restart Auto Play
==============================================*/

startAutoPlay();


/*==============================================
Console Message
==============================================*/

console.log(
    "%c✓ Testimonial Slider Ready",
    "color:#22C55E;font-weight:bold;"
);


/*==============================================
Close DOMContentLoaded
==============================================*/

});