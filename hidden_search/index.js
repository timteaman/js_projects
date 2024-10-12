import { books } from './books.js';

const bookList = document.getElementById('bookList');
const template = document.querySelector('template');
const searchInput = document.getElementById('searchInput');
const bookNotFoundMessage = document.getElementById('bookNotFoundMessage');

// renders list of books

function displayBooks(books) {
  const fragment = new DocumentFragment();
  for (const book of books) {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.book-list__title').textContent = book.title;
    clone.querySelector('.book-list__author').textContent = book.author;
    clone.querySelector('.book-list__country').textContent = book.country;
    clone.querySelector('.book-list__year').textContent = book.publicationDate;
    clone.querySelector('.book-list__ganre').textContent = book.genre;

    fragment.appendChild(clone);
  }

  bookList.appendChild(fragment);
}

// clear book list

function clearBookList() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}

// filtered books based on searchInput

function filterBooks(valueSeachInput) {
  const trueBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const country = book.country.toLowerCase();
    const genre = book.genre.toLowerCase();

    return (
      title.includes(valueSeachInput) ||
      author.includes(valueSeachInput) ||
      country.includes(valueSeachInput) ||
      genre.includes(valueSeachInput)
    );
  });

  return trueBooks;
}

// filters books and displays results
function handleSearch() {
  const valueSeachInput = searchInput.value.toLowerCase();

  clearBookList();

  bookNotFoundMessage.classList.remove('book-list__messageNotFound--active');

  const filteredBooks = filterBooks(valueSeachInput);

  if (filteredBooks.length === 0) {
    bookNotFoundMessage.classList.add('book-list__messageNotFound--active');
  } else {
    displayBooks(filteredBooks);
  }
}

// input update

searchInput.addEventListener('input', () => {
  handleSearch();
});

displayBooks(books);

// filter of country

const countryFilter = document.getElementById('countryFilter');

countryFilter.addEventListener('change', () => {
  if (countryFilter.value) {
    const filteredBooks = books.filter((book) => {
      return book.country === countryFilter.value;
    });

    clearBookList();
    displayBooks(filteredBooks);
  }
});

// filter of genre

const genreFilter = document.getElementById('genreFilter');

genreFilter.addEventListener('change', () => {
  if (genreFilter.value) {
    const filteredBooks = books.filter((book) => {
      return book.genre === genreFilter.value;
    });

    clearBookList();
    displayBooks(filteredBooks);
  }
});

// filter of years

const yearsFilter = document.getElementById('yearFilter');

yearsFilter.addEventListener('change', () => {
  if (yearsFilter.value) {
    const filteredBooks = books.filter((book) => {
      const year = parseInt(book.publicationDate.split('-')[0]);

      if (yearsFilter.value === 'Before 1900') {
        return year < 1900;
      } else if (yearsFilter.value === '1900-1950') {
        return year >= 1900 && year <= 1950;
      } else if (yearsFilter.value === '1951-2000') {
        return year >= 1951 && year <= 2000;
      } else if (yearsFilter.value === 'After 2000') {
        return year > 2000;
      }
      return true;
    });

    clearBookList();
    displayBooks(filteredBooks);
  }
});

// sorting books

const sortOptions = document.getElementById('sortOptions');

sortOptions.addEventListener('change', () => {
  if (sortOptions.value) {
    let sortedBooks;

    if (sortOptions.value === 'titleAsc') {
      sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOptions.value === 'titleDesc') {
      sortedBooks = books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOptions.value === 'dateAsc') {
      sortedBooks = books.sort((a, b) =>
        a.publicationDate.toString().localeCompare(b.publicationDate.toString())
      );
    } else if (sortOptions.value === 'dateDesc') {
      sortedBooks = books.sort((a, b) =>
        b.publicationDate.toString().localeCompare(a.publicationDate.toString())
      );
    } else if (sortOptions.value === 'authorAsc') {
      sortedBooks = books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortOptions.value === 'authorDesc') {
      sortedBooks = books.sort((a, b) => b.author.localeCompare(a.author));
    }

    clearBookList();
    displayBooks(sortedBooks);
  }
});

// serach input animation

const searchButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('search');

searchButton.addEventListener('click', () => {
  console.log(213312);
  searchContainer.classList.toggle('search--active');
  searchInput.focus();
});
