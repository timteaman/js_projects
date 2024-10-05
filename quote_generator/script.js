import { localQuotes } from './quotes.js';

const newQuoteButton = document.getElementById('newQuoteButton');
const tweetQuoteButton = document.getElementById('tweetQuoteButton');
const quoteTextElement = document.getElementById('quoteText');
const quoteAuthorElement = document.getElementById('quoteAuthor');
const loaderElement = document.getElementById('loader');
const quoteContainer = document.getElementById('quote');

// loading spinner

function toggleVisibility(elementToShow, elementToHide) {
  elementToShow.classList.remove('quote--hidden');
  elementToShow.classList.add('quote--visible');

  elementToHide.classList.remove('quote--visible');
  elementToHide.classList.add('quote--hidden');
}

// show loading spinner

function loadingShow() {
  toggleVisibility(loaderElement, quoteContainer);
}

// hide loading spinner

function loadingHide() {
  toggleVisibility(quoteContainer, loaderElement);
}

// get random new quote

function newQuote() {
  const randomQuote =
    localQuotes[Math.floor(Math.random() * localQuotes.length)];
  return {
    text: randomQuote.text,
    author: randomQuote.author || 'Unkown',
  };
}

// update quote

function updateQuote() {
  loadingShow();

  setTimeout(() => {
    const quote = newQuote();
    quoteTextElement.lastChild.textContent = ` ${quote.text}`;
    quoteAuthorElement.textContent = quote.author;

    loadingHide();
  }, 501);
}

updateQuote();

// generate new quote

newQuoteButton.addEventListener('click', updateQuote);

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://x.com/intent/tweet?text=${quoteTextElement.textContent} - ${quoteAuthorElement.textContent}`;
  window.open(twitterUrl, '_blank');
}

tweetQuoteButton.addEventListener('click', tweetQuote);
