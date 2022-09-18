import { galleryItems } from "./gallery-items.js";
// Change code below this line

// HTML population:
const galleryHTML = document.querySelector(".gallery");

const galleryArray = galleryItems.map(({ preview, original, description }) => {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src=""
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
});

galleryHTML.innerHTML = galleryArray.join("");

// LazyLoad execution:
const galleryImgRef = document.querySelectorAll(".gallery img");

const onEntry = (observerEntries) => {
  observerEntries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      let source = target.dataset.source;
      target.src = source;
    }
  });
};

const observer = new IntersectionObserver(onEntry);

galleryImgRef.forEach((element) => observer.observe(element));

// Lightbox generation:
let lightboxModal = {};

document.addEventListener("keydown", () => {
  if (basicLightbox.visible()) {
    lightboxModal.close();
  }
});

galleryHTML.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("gallery__image")) {
    lightboxModal = basicLightbox.create(`
    <img src="${event.target.dataset.source}">
`);
    lightboxModal.show();
  }
});
