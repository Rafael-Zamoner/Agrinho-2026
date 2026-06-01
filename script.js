// =========================
// ANIMAÇÃO DOS CARDS
// =========================

const boxes = document.querySelectorAll(".box");

function revealBoxes() {

    boxes.forEach(box => {

        const top = box.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            box.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealBoxes);
window.addEventListener("load", revealBoxes);


// =========================
// CARROSSEL
// =========================

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {

    const cards = carousel.querySelectorAll('.box');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let current = 0;

    function updateCarousel() {

        cards.forEach(card => {
            card.classList.remove('active');
        });

        cards[current].classList.add('active');
    }

    next.addEventListener('click', () => {

        current++;

        if (current >= cards.length) {
            current = 0;
        }

        updateCarousel();
    });

    prev.addEventListener('click', () => {

        current--;

        if (current < 0) {
            current = cards.length - 1;
        }

        updateCarousel();
    });

    setInterval(() => {

        current++;

        if (current >= cards.length) {
            current = 0;
        }

        updateCarousel();

    }, 4000);

    updateCarousel();

});