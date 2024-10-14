const loadingInner = document.getElementById('loadingInner');
const loadingBg = document.getElementById('loadingBg');
const loadingText = document.getElementById('loadingText');
const loadingProgress = document.getElementById('loadingProgress');
const loadingProgressLine = document.getElementById('loadingProgressLine');
const loadingContainer = document.getElementById('loading');

const messages = [
  'Searching for the other sock...',
  'Downloading the virus...',
  'Using Divine Shield... Running away like a true hero.',
  'Restarting loading process...',
  'Please wait while we mine cryptocurrency...',
  'Are you sure you closed the fridge?',
  'Mowing the lawn',
];

let load = 0;
let int = setInterval(blurring, 100);

function blurring() {
  load++;

  if (load > 30) {
    loadingProgress.classList.add('loading-progress--active');
  }
  if (load >= 100) {
    clearInterval(int);
    loadingInner.classList.add('loading__inner--active');
    loadingProgress.classList.add('loading-progress--run');
  }

  loadingProgressLine.style.height = `${load}%`;

  if (load % 10 === 0) {
    loadingText.textContent = messages[load % messages.length];
  }

  loadingBg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
