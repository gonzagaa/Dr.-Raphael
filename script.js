const lenis = new Lenis({
  smooth: true,
  duration: 1.1,
  easing: (t) => 1 - Math.pow(1 - t, 4),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Os carrosséis ficam abaixo da dobra: inicializar o Swiper apenas quando
// o usuário se aproximar deles tira esse custo do carregamento inicial.
function iniciarSwipers() {
  const larguraDaTela = window.innerWidth;

  if (larguraDaTela < 800) {
    new Swiper(".mySwiper3", {
      grabCursor: true,
      effect: "creative",
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -1],
        },
        next: {
          translate: ["110%", 0, 0],
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    new Swiper(".mySwiper3", {
      slidesPerView: 4,
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}

const carrosseis = document.querySelectorAll(".mySwiper3");

if (carrosseis.length > 0) {
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas, obs) => {
        if (entradas.some((e) => e.isIntersecting)) {
          obs.disconnect();
          iniciarSwipers();
        }
      },
      { rootMargin: "800px 0px" }
    );
    carrosseis.forEach((el) => observador.observe(el));
  } else {
    iniciarSwipers();
  }
}
