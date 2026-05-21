const photoCount = 59;
const photos = Array.from({ length: photoCount }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `assets/photos/photo-${number}.jpeg`,
    alt: `Fotografie ${index + 1} din galeria Vila Nomad Brasov`,
  };
});

const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightbox = document.querySelector("#closeLightbox");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");
let currentIndex = 0;

function renderGallery() {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Deschide fotografia ${index + 1}`);

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = index < 6 ? "eager" : "lazy";

    const label = document.createElement("span");
    label.textContent = String(index + 1).padStart(2, "0");

    button.append(image, label);
    button.addEventListener("click", () => openLightbox(index));
    fragment.append(button);
  });

  galleryGrid.append(fragment);
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
}

function closeModal() {
  if (typeof lightbox.close === "function") {
    lightbox.close();
  } else {
    lightbox.removeAttribute("open");
  }
}

function updateLightbox() {
  const photo = photos[currentIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = `Fotografia ${currentIndex + 1} din ${photoCount}`;
}

function movePhoto(direction) {
  currentIndex = (currentIndex + direction + photoCount) % photoCount;
  updateLightbox();
}

renderGallery();

closeLightbox.addEventListener("click", closeModal);
prevPhoto.addEventListener("click", () => movePhoto(-1));
nextPhoto.addEventListener("click", () => movePhoto(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) {
    return;
  }

  if (event.key === "ArrowLeft") {
    movePhoto(-1);
  }

  if (event.key === "ArrowRight") {
    movePhoto(1);
  }
});
