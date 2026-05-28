const photoCount = 59;
const photoDescriptions = [
  "Colț de relaxare cu fotolii și plante",
  "Cameră dublă cu pat queen și prosoape pregătite",
  "Intrarea proprietății de pe Strada Traian",
  "Fațada vilei și balconul exterior",
  "Alee pavată în curtea interioară",
  "Terasă acoperită la intrare",
  "Zonă de bar și living comun",
  "Cameră dublă cu TV și dulap",
  "Masă mare în livingul comun",
  "Zonă de lounge cu canapele",
  "Cameră luminoasă la mansardă",
  "Living comun cu zonă de luat masa",
  "Cameră dublă cu fereastră mare",
  "Spațiu comun de luat masa",
  "Scară interioară cu balustradă",
  "Detaliu de servire în zona comună",
  "Cameră dublă cu lumină naturală",
  "Cameră dublă cu perete decorativ",
  "Cameră dublă cu dulap și radiator",
  "Cameră dublă cu oglindă și masă de lucru",
  "Pat dublu lângă fereastră",
  "Hol interior către camere",
  "Balcon exterior cu scaune",
  "Cameră cu acces către baie",
  "Logo Vila Nomad Brașov",
  "Cameră dublă spațioasă cu pardoseală din lemn",
  "Cameră cu birou și fereastră",
  "Scară și hol interior",
  "Pat dublu pregătit pentru oaspeți",
  "Colț de relaxare cu fotolii și plante",
  "Detaliu decorativ în zona de bar",
  "Cameră cu perete accent și pat dublu",
  "Terasă exterioară cu scaune",
  "Masă de lucru în cameră",
  "Colț de birou și plante",
  "Hol cu oglindă și acces către camere",
  "Cameră dublă cu oglindă și dulap",
  "Cameră cu TV, birou și dulap",
  "Living comun cu mese și TV",
  "Terasă și acces exterior",
  "Scară interioară luminată",
  "Detaliu decorativ cu candelabru",
  "Cameră dublă spațioasă",
  "Hol interior cu plante",
  "Pat dublu cu prosoape pregătite",
  "Coridor interior luminat",
  "Cameră cu pat dublu și dulap",
  "Baie privată cu duș și chiuvetă",
  "Baie cu duș din sticlă și obiecte sanitare",
  "Articole de baie pentru oaspeți",
  "Baie cu cabină de duș și finisaje maro",
  "Baie cu duș, chiuvetă și toaletă",
  "Baie cu finisaje calde",
  "Baie privată cu duș walk-in",
  "Cameră cu TV și mobilier din lemn",
  "Cameră cu TV și fereastră mare",
  "Cameră cu acces către baie",
  "Baie modernă cu oglindă și radiator",
  "Cameră dublă cu oglindă și dressing",
];
const photos = Array.from({ length: photoCount }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const description = photoDescriptions[index];
  return {
    src: `assets/photos/photo-${number}.jpeg`,
    description,
    alt: `Vila Nomad Brașov - ${description}`,
  };
});

const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightbox = document.querySelector("#closeLightbox");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");
const galleryBand = document.querySelector("#galerie");
const guestReviewsTrack = document.querySelector("#guestReviewsTrack");
const prevReview = document.querySelector("#prevReview");
const nextReview = document.querySelector("#nextReview");
let currentIndex = 0;

function renderGallery() {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Deschide fotografia ${index + 1}: ${photo.description}`);

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
  document.body.classList.add("is-lightbox-open");

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
}

function closeModal() {
  document.body.classList.remove("is-lightbox-open");

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
  lightboxCaption.textContent = `Fotografia ${currentIndex + 1} din ${photoCount}: ${photo.description}`;
}

function movePhoto(direction) {
  currentIndex = (currentIndex + direction + photoCount) % photoCount;
  updateLightbox();
}

function moveReview(direction) {
  const firstCard = guestReviewsTrack?.querySelector(".guest-review-card");

  if (!firstCard) {
    return;
  }

  const gap = 16;
  const distance = firstCard.getBoundingClientRect().width + gap;
  guestReviewsTrack.scrollBy({
    left: direction * distance,
    behavior: "smooth",
  });
}

renderGallery();

if ("IntersectionObserver" in window) {
  const galleryObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("is-gallery-active", entry.isIntersecting);
    },
    { threshold: 0.05 },
  );

  galleryObserver.observe(galleryBand);
}

closeLightbox.addEventListener("click", closeModal);
prevPhoto.addEventListener("click", () => movePhoto(-1));
nextPhoto.addEventListener("click", () => movePhoto(1));
prevReview?.addEventListener("click", () => moveReview(-1));
nextReview?.addEventListener("click", () => moveReview(1));
lightbox.addEventListener("close", () => {
  document.body.classList.remove("is-lightbox-open");
});

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
