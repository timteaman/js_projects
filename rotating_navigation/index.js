const hero = document.getElementById('hero');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  hero.classList.toggle('hero--active');
  nav.classList.toggle('nav--active');
});
