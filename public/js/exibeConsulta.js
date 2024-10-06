// let index = 0;

// function showSlide(n) {
//     const slides = document.querySelectorAll('.slide');
//     if (n >= slides.length) {
//         index = 0;
//     } else if (n < 0) {
//         index = slides.length - 1;
//     } else {
//         index = n;
//     }

//     slides.forEach((slide, i) => {
//         slide.style.transform = `translateX(${-index * 100}%)`;
//     });
// }

// function moveSlide(n) {
//     showSlide(index + n);
// }

// // Inicializa o carrossel
// showSlide(index);
