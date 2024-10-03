import { localQuotes } from './quotes.js';

const newQuoteButton = document.getElementById('newQuoteButton');
const tweetQuoteButton = document.getElementById('tweetQuoteButton');
const quoteTextElement = document.getElementById('quoteText');
const quoteAuthorElement = document.getElementById('quoteAuthor');
const loaderElement = document.getElementById('loader');
const quoteContainer = document.getElementById('quote');

// show loading spinner

function loadingShow() {
  loaderElement.classList.toggle('hidden');
  loaderElement.classList.add('visible');

  quoteContainer.classList.toggle('visible');
  quoteContainer.classList.add('hidden');
}

// hide loading spinner

function loadingHide() {
  quoteContainer.classList.remove('hidden');
  quoteContainer.classList.add('visible');

  loaderElement.classList.remove('visible');
  loaderElement.classList.add('hidden');
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
    quoteTextElement.textContent = quote.text;
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
