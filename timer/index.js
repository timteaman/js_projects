const timerInput = document.getElementById('timerInput');
const timerButtonStart = document.getElementById('timerButtonStart');
const timerButtonReset = document.getElementById('timerButtonReset');

const countdownMinTens = document.getElementById('countdownMinTens');
const countdownMin = document.getElementById('countdownMin');
const countdownSecTens = document.getElementById('countdownSecTens');
const countdownSec = document.getElementById('countdownSec');

let inputValue = 0;
let interval;
let isRunning = false;

timerInput.addEventListener('input', () => {
  let value = parseInt(timerInput.value);
  if (value > 60) {
    timerInput.value = 60;
  } else if (value < 1 || isNaN(value)) {
    timerInput.value = '';
  }
});

function updateDisplay(minutes, seconds) {
  countdownMinTens.textContent = Math.floor(minutes / 10);
  countdownMin.textContent = minutes % 10;
  countdownSecTens.textContent = Math.floor(seconds / 10);
  countdownSec.textContent = seconds % 10;
}

function startTimer() {
  interval = setInterval(() => {
    if (inputValue <= 0) {
      clearInterval(interval);
      isRunning = false;
      timerButtonStart.textContent = 'Start timer';
      updateDisplay(0, 0);
    } else {
      let minutes = Math.floor(inputValue / 60);
      let seconds = inputValue % 60;
      updateDisplay(minutes, seconds);
      inputValue--;
    }
  }, 1000);
}

timerButtonStart.addEventListener('click', () => {
  if (!isRunning) {
    if (inputValue === 0) {
      let minutes = parseInt(timerInput.value) || 0;
      if (minutes < 1) minutes = 1;
      if (minutes > 60) minutes = 60;
      inputValue = minutes === 60 ? 59 * 60 + 59 : minutes * 60;
    }
    isRunning = true;
    timerButtonStart.textContent = 'Pause timer';
    startTimer();
  } else {
    clearInterval(interval);
    isRunning = false;
    timerButtonStart.textContent = 'Start timer';
  }
});

timerButtonReset.addEventListener('click', () => {
  clearInterval(interval);
  inputValue = 0;
  isRunning = false;
  timerButtonStart.textContent = 'Start timer';
  updateDisplay(0, 0);
});
