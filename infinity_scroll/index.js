const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('searchInput');
const pexelsApiKey = '2faaUZVru2WxeqRFW6t58ld6S47E2zWXpMxiwRsWjUUPdNod4uFYpJex';

let randomPageNumber = Math.floor(Math.random() * 100) + 1;
let isLoading = false;

async function fetchImages() {
  if (isLoading) return;
  isLoading = true;
  loader.hidden = false;

  randomPageNumber++;
  const pexelsApiUrl = `https://api.pexels.com/v1/curated?per_page=10&page=${randomPageNumber}`;

  try {
    const response = await fetch(pexelsApiUrl, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });
    const data = await response.json();

    data.photos.forEach((imageData) => {
      const galleryItem = createGalleryItem(imageData);
      galleryContainer.appendChild(galleryItem);
    });
  } catch (error) {
    console.error(error);
  } finally {
    loader.hidden = true;
    isLoading = false;
  }
}

function createGalleryItem(data) {
  const template = document.getElementById('template').content.cloneNode(true);

  const galleryImage = template.querySelector('.gallery__photo');
  galleryImage.src = data.src.medium;
  galleryImage.alt = data.alt || 'Image from Pexels';

  const detailsPhotographer = template.querySelector('.details__photographer');
  detailsPhotographer.textContent = data.photographer;

  const detailsDownload = template.querySelector('.details__download');
  detailsDownload.addEventListener('click', (event) => {
    event.preventDefault();
    const downloadUrl = `https://images.pexels.com/photos/${data.id}/pexels-photo-${data.id}.jpeg?cs=srgb&dl=pexels-${data.photographer}-${data.id}.jpg&fm=jpg`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${data.id}.jpeg`;
    link.click();
  });

  return template;
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    !isLoading
  ) {
    fetchImages();
  }
});

fetchImages();
