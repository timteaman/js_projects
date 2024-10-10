document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('theme-toggle');

  // check local storage theme

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  // burger menu

  const burgerBtnEl = document.getElementById('burger');

  burgerBtnEl.addEventListener('click', () => {
    burgerBtnEl.classList.toggle('burger--active');
  });

  // switch Theme

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSwitch.addEventListener('change', switchTheme);
});
