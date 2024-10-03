const progressImg = document.querySelectorAll('.progress-img__item');
const progressSteps = document.querySelector('.progress-steps');
const progressStepsItem = document.querySelectorAll('.progress-steps__item');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentActive = 1;

next.addEventListener('click', () => {
  currentActive = Math.min(currentActive + 1, progressStepsItem.length);
  updateUI();
});

prev.addEventListener('click', () => {
  currentActive = Math.max(currentActive - 1, 1);
  updateUI();
});

function updateUI() {
  updateSteps();
  showImg();
  updateProgress();
  updateButtons();
}

function showImg() {
  progressImg.forEach((img, indx) => {
    img.classList.toggle(
      'progress-img__item--active',
      indx === currentActive - 1
    );
  });
}

function updateSteps() {
  progressStepsItem.forEach((progressStepsItem, indx) => {
    progressStepsItem.classList.toggle(
      'progress-steps__item--active',
      indx < currentActive
    );
  });
}

function updateProgress() {
  const progressWidth =
    ((currentActive - 1) / (progressStepsItem.length - 1)) * 100;
  progressSteps.style.setProperty('--progress-width', `${progressWidth}%`);
}

function updateButtons() {
  prev.disabled = currentActive === 1;
  next.disabled = currentActive === progressStepsItem.length;
}
