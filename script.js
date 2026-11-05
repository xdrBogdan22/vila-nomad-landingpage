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
const roomGalleryTracks = Array.from(document.querySelectorAll("[data-room-gallery]"));
let currentIndex = 0;

const photos = Array.from(galleryGrid.querySelectorAll(".gallery-item"), (button, index) => {
  const image = button.querySelector("img");
  button.addEventListener("click", () => openLightbox(index));
  return {
    src: image.getAttribute("src"),
    description: button.dataset.description,
    alt: image.alt,
  };
});

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
  lightboxCaption.textContent = `Fotografia ${currentIndex + 1} din ${photos.length}: ${photo.description}`;
}

function movePhoto(direction) {
  currentIndex = (currentIndex + direction + photos.length) % photos.length;
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

function setupRoomGallery(track) {
  const name = track.dataset.roomGallery;
  const figures = Array.from(track.children);

  if (!figures.length) {
    return;
  }

  const prevBtn = document.querySelector(`[data-room-gallery-prev="${name}"]`);
  const nextBtn = document.querySelector(`[data-room-gallery-next="${name}"]`);
  const dotsHost = document.querySelector(`[data-room-gallery-dots="${name}"]`);
  let activeIdx = 0;

  const dots = dotsHost
    ? figures.map((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Mergi la poza ${idx + 1}`);
        dot.addEventListener("click", () => goTo(idx));
        dotsHost.append(dot);
        return dot;
      })
    : [];

  function setActive(idx) {
    activeIdx = Math.max(0, Math.min(figures.length - 1, idx));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeIdx);
    });
  }

  function goTo(idx) {
    const target = figures[idx];
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActive(idx);
  }

  function move(direction) {
    const next = (activeIdx + direction + figures.length) % figures.length;
    goTo(next);
  }

  prevBtn?.addEventListener("click", () => move(-1));
  nextBtn?.addEventListener("click", () => move(1));

  let scrollTimer;
  track.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const trackLeft = track.scrollLeft;
      let closest = 0;
      let minDistance = Infinity;
      figures.forEach((fig, idx) => {
        const distance = Math.abs(fig.offsetLeft - track.offsetLeft - trackLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closest = idx;
        }
      });
      setActive(closest);
    }, 80);
  });

  setActive(0);
}


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

roomGalleryTracks.forEach(setupRoomGallery);
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
