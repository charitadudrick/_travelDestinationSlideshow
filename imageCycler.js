// Helper function
const $ = (id) => document.getElementById(id);

// Global variables
let bnrCntr = 0;
let slides = [];
let timer;
let isPaused = false;

// Load JSON data
const loadSlides = async () => {
    try {
        const response = await fetch('slides.json');
        if (!response.ok) throw new Error('Could not find slides.json');

        slides = await response.json();

        if (slides.length > 0) {
            setupControls();
            cycle();
        }
    } catch (error) {
        console.error("Error loading slideshow:", error);
    }
};

// Pause slideshow
const pauseSlideshow = () => {
    const btn = $('btnToggle');
    isPaused = true;
    if (btn) {
        btn.innerHTML = "Continue";
        btn.classList.add('paused');
    }
    clearTimeout(timer);
};

// Setup pause/continue button
const setupControls = () => {
    const btn = $('btnToggle');
    if (btn) {
        btn.onclick = () => {
            if (isPaused) {
                isPaused = false;
                btn.innerHTML = "Pause";
                btn.classList.remove('paused');
                cycle();
            } else {
                pauseSlideshow();
            }
        };
    }
};

// Open popup window
const openOffsetWindow = (url) => {
    pauseSlideshow();

    const width = 600, height = 500, left = 150, top = 150;
    window.open(
        url,
        'NZDetailWindow',
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
};

// Main slideshow loop
const cycle = () => {
    if (isPaused) return;

    const currentSlide = slides[bnrCntr];
    const slide_image = $('slide_image');

    if (slide_image) {
        slide_image.src = currentSlide.src;

        slide_image.classList.remove("fade-in");
        void slide_image.offsetWidth;
        slide_image.classList.add("fade-in");

        slide_image.onclick = () => openOffsetWindow(currentSlide.url);
    }

    bnrCntr = (bnrCntr + 1) % slides.length;

    timer = setTimeout(cycle, 3000);
};
