const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');

let isReadyForNewImages = false;
let loadedImagesCount = 0;
let totalImagesInBatch = 0;
let imagesDataArray = [];

const pexelsApiKey = '2faaUZVru2WxeqRFW6t58ld6S47E2zWXpMxiwRsWjUUPdNod4uFYpJex';
const randomPageNumber = Math.floor(Math.random() * 100) + 1;
const pexelsApiUrl = `https://api.pexels.com/v1/curated?per_page=10&page=${randomPageNumber}`;

function applyAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function handleImageLoad() {
  loadedImagesCount++;
  if (loadedImagesCount === totalImagesInBatch) {
    isReadyForNewImages = true;
    if (loadedImagesCount > 0) {
      loader.hidden = true;
    }
  }
}

function createGalleryItem(data) {
  const template = document.getElementById('template').content.cloneNode(true);

  const imageLink = template.querySelector('.gallery__link');
  applyAttributes(imageLink, {
    href: data.url,
    target: '_blank',
    rel: 'noopener noreferrer',
  });

  const galleryImage = template.querySelector('.gallery__photo');
  applyAttributes(galleryImage, {
    src: data.src.original,
    alt: data.alt || 'Image from Pexels',
  });
  galleryImage.addEventListener('load', handleImageLoad);

  return template;
}

async function fetchImages() {
  loader.hidden = false;
  const response = await fetch(pexelsApiUrl, {
    headers: {
      Authorization: pexelsApiKey,
    },
  });
  const data = await response.json();
  imagesDataArray = data.photos;
  loadedImagesCount = 0;
  totalImagesInBatch = imagesDataArray.length;

  imagesDataArray.forEach((imageData) => {
    const galleryItem = createGalleryItem(imageData);
    galleryContainer.appendChild(galleryItem);
  });
  isReadyForNewImages = true;
}

// throttler
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}

window.addEventListener(
  'scroll',
  throttle(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
      isReadyForNewImages
    ) {
      isReadyForNewImages = false;
      loader.hidden = false;
      fetchImages();
    }
  }, 1000)
);

fetchImages();
