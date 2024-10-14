const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');

let loadedImagesCount = 0;
let totalImagesInBatch = 0;
let imagesDataArray = [];

const pexelsApiKey = '2faaUZVru2WxeqRFW6t58ld6S47E2zWXpMxiwRsWjUUPdNod4uFYpJex';
let randomPageNumber = Math.floor(Math.random() * 100) + 1;

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
    src: data.src.medium,
    alt: data.alt || 'Image from Pexels',
  });
  galleryImage.addEventListener('load', handleImageLoad);

  return template;
}

// fetch images

async function fetchImages() {
  loader.hidden = false;
  randomPageNumber++;
  const pexelsApiUrl = `https://api.pexels.com/v1/curated?per_page=10&page=${randomPageNumber}`;
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
}

// scroll

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    loader.hidden = true;
    fetchImages();
  }
});

fetchImages();
