const loadingBg = document.getElementById('loadingBg');
const loadingText = document.getElementById('loadingText');

let load = 0;
let int = setInterval(blurring, 50);

function blurring() {
  load++;

  if (load > 99) {
    clearInterval(int);
  }

  loadingText.innerText = `${load}%`;
  loadingText.style.opacity = scale(load, 0, 100, 1, 0);
  loadingBg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
