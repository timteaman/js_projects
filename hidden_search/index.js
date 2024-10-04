function initSearchToggle(searchContainerId, inputId, buttonId, activeClass) {
  const searchContainer = document.getElementById(searchContainerId);
  const searchInput = document.getElementById(inputId);
  const searchButton = document.getElementById(buttonId);

  searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle(activeClass);
    searchInput.focus();
  });
}

initSearchToggle('search', 'searchInput', 'searchButton', 'search--active');
initSearchToggle(
  'searchSecond',
  'searchSecondInput',
  'searchSecondButton',
  'search-second--active'
);
initSearchToggle(
  'searchThird',
  'searchThirdInput',
  'searchThirdButton',
  'search-third--active'
);
