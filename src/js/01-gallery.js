import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryContainerEl = document.querySelector('.gallery');
const galleryItemEl = createGalleryItem(galleryItems);

function createGalleryItem(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
       <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
       </a>
    </li>`;
    })
    .join('');
}

galleryContainerEl.insertAdjacentHTML('beforeend', galleryItemEl);

galleryContainerEl.addEventListener('click', onItemClick);

function onItemClick(event) {
  event.preventDefault();

  if (event.target.classList.value !== 'gallery__image') {
    return;
  }

  const lightbox = new SimpleLightbox('.gallery__link', {
    captionsData: 'alt',
    captionDelay: '250',
  });

  galleryContainerEl.removeEventListener('click', onItemClick);
}
