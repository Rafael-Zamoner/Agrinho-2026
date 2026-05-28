const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", () => {

    boxes.forEach(box => {

        const top = box.getBoundingClientRect().top;

        if(top < window.innerHeight - 80){

            box.classList.add("show");

        }

    });

});