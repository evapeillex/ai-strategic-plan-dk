(function () {
  "use strict";

  const slides = typeof SLIDES !== "undefined" ? SLIDES : [];
  const slidesContainer = document.getElementById("slides-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const slideCounter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("progress-bar");
  const progressFill = document.getElementById("progress-fill");

  let currentIndex = 0;
  let isTransitioning = false;
  const slideRevealSteps = {};

  function getRevealStep(index) {
    return slideRevealSteps[index] ?? 0;
  }

  function setRevealStep(index, step) {
    slideRevealSteps[index] = Math.max(0, step);
  }

  function renderSlides() {
    slidesContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const el = document.createElement("div");
      const hasMediaOnly = slide.media && !slide.title;
      const hasCustomBg = slide.backgroundColor;
      el.className = `slide ${index === 0 ? "active" : ""} ${slide.subheadline ? "slide-with-subheadline" : ""} ${slide.ideas ? "slide-with-ideas" : ""} ${slide.columns ? "slide-with-columns" : ""} ${slide.media ? "slide-with-media" : ""} ${hasMediaOnly ? "slide-media-only" : ""} ${slide.theme === "light" ? "slide-theme-light" : ""} ${hasCustomBg ? "slide-custom-bg" : ""}`;
      if (hasCustomBg) {
        el.style.setProperty("--slide-bg-color", slide.backgroundColor);
      }
      el.dataset.index = index;
      el.dataset.animation = slide.animation || "fade";
      const subheadlineHtml = slide.subheadline
        ? `<p class="slide-subheadline">${escapeHtml(slide.subheadline)}</p>`
        : "";
      const contentHtml = slide.content && !slide.columns
        ? `<p class="slide-content">${escapeHtml(slide.content)}</p>`
        : "";
      let ideasHtml = "";
      if (slide.ideas && slide.ideas.length > 0) {
        ideasHtml = `
          <div class="slide-ideas">
            ${slide.ideas.map((idea, i) => `
              <div class="slide-idea-box" data-idea-index="${i}">${escapeHtml(idea)}</div>
            `).join("")}
          </div>
        `;
      }
      let columnsHtml = "";
      if (slide.columns && slide.columns.length > 0) {
        columnsHtml = slide.columns
          .map(
            (col) => {
              const contentHtml = col.content
                ? `<div class="slide-column-content">${col.content.split("\n\n").map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</div>`
                : "";
              const exampleHtml = col.example
                ? `<div class="slide-column-example"><span class="slide-column-example-title">${escapeHtml(col.example.title)}</span><ul class="slide-column-list">${col.example.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`
                : "";
              const itemsHtml = col.items
                ? `<ul class="slide-column-list">${col.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
                : "";
              return `
          <div class="slide-column">
            <h3 class="slide-column-title">${escapeHtml(col.title)}</h3>
            ${contentHtml}
            ${exampleHtml}
            ${itemsHtml}
          </div>
        `;
            }
          )
          .join("");
      }
      let mediaHtml = "";
      if (slide.media) {
        let videoHtml = "";
        if (slide.media.video) {
          const embed = getVideoEmbedUrl(slide.media.video);
          if (embed) {
            videoHtml = `<iframe class="slide-media-video slide-media-embed" src="${escapeHtml(embed)}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
          } else {
            videoHtml = `<video class="slide-media-video" src="${escapeHtml(slide.media.video)}" controls playsinline autoplay muted loop></video>`;
          }
        }
        const imageHtml = slide.media.image
          ? `<img class="slide-media-image" src="${escapeHtml(slide.media.image)}" alt="">`
          : "";
        mediaHtml = `<div class="slide-media">${videoHtml}${imageHtml}</div>`;
      }
      const titleHtml = slide.title ? renderTitle(slide.title, slide.titleHighlight) : "";
      const titleEl = titleHtml ? `<h1 class="slide-title">${titleHtml}</h1>` : "";
      el.innerHTML = `
        ${subheadlineHtml}
        <div class="slide-main">
          ${titleEl}
          ${contentHtml}
          ${ideasHtml}
          ${slide.columns ? `<div class="slide-columns">${columnsHtml}</div>` : ""}
          ${mediaHtml}
        </div>
      `;
      slidesContainer.appendChild(el);
    });
    updateRevealForSlide(currentIndex);
    updateCounter();
    updateProgress();
  }

  function updateRevealForSlide(index) {
    const slide = slides[index];
    if (!slide?.ideas) return;
    const slideEl = slidesContainer.children[index];
    if (!slideEl) return;
    const step = getRevealStep(index);
    slideEl.querySelectorAll(".slide-idea-box").forEach((box, i) => {
      box.classList.toggle("revealed", i < step);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getVideoEmbedUrl(url) {
    if (!url || typeof url !== "string") return null;
    const u = url.trim();
    const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}`;
    const vimeoMatch = u.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`;
    return null;
  }

  function renderTitle(title, highlight) {
    if (!highlight?.text) return escapeHtml(title);
    const idx = title.indexOf(highlight.text);
    if (idx === -1) return escapeHtml(title);
    const before = escapeHtml(title.slice(0, idx));
    const mid = escapeHtml(highlight.text);
    const after = escapeHtml(title.slice(idx + highlight.text.length));
    return `${before}<span class="slide-title-highlight" style="color: ${escapeHtml(highlight.color)}">${mid}</span>${after}`;
  }

  function goToSlide(index) {
    if (isTransitioning || index < 0 || index >= slides.length) return;
    if (index === currentIndex) return;

    isTransitioning = true;
    const currentSlide = slidesContainer.querySelector(".slide.active");
    const nextSlide = slidesContainer.children[index];
    const direction = index > currentIndex ? "next" : "prev";

    currentSlide.classList.add("leaving", `leave-${direction}`);
    nextSlide.classList.add(`enter-${direction}`);
    nextSlide.offsetHeight; /* force reflow */
    nextSlide.classList.add("entering");
    updateSlideshowThemeForIndex(index);

    const onTransitionEnd = (e) => {
      if (e.target !== currentSlide) return;
      currentSlide.classList.remove("active", "leaving", "leave-next", "leave-prev");
      nextSlide.classList.remove("entering", "enter-next", "enter-prev");
      nextSlide.classList.add("active");
      currentIndex = index;
      isTransitioning = false;
      updateRevealForSlide(currentIndex);
      updateCounter();
      updateProgress();
      updateSlideshowTheme();
      currentSlide.removeEventListener("transitionend", onTransitionEnd);
    };

    currentSlide.addEventListener("transitionend", onTransitionEnd, { once: true });
  }

  function next() {
    const slide = slides[currentIndex];
    const step = getRevealStep(currentIndex);
    if (slide?.ideas && step < slide.ideas.length) {
      setRevealStep(currentIndex, step + 1);
      updateRevealForSlide(currentIndex);
    } else if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function prev() {
    const slide = slides[currentIndex];
    const step = getRevealStep(currentIndex);
    if (slide?.ideas && step > 0) {
      setRevealStep(currentIndex, step - 1);
      updateRevealForSlide(currentIndex);
    } else if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  function first() {
    goToSlide(0);
  }

  function last() {
    goToSlide(slides.length - 1);
  }

  function toggleFullscreen() {
    const el = document.getElementById("slideshow");
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  }

  function updateCounter() {
    slideCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
    const anchorSlides = typeof ANCHOR_SLIDES !== "undefined" ? ANCHOR_SLIDES : [];
    document.querySelectorAll(".anchor-bubble").forEach((btn) => {
      const anchorIndex = parseInt(btn.dataset.anchor, 10);
      const slideIndex = anchorSlides[anchorIndex];
      btn.classList.toggle("active", slideIndex === currentIndex);
    });
  }

  function updateProgress() {
    const percent = slides.length > 1 ? (currentIndex / (slides.length - 1)) * 100 : 100;
    progressFill.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", Math.round(percent));
  }

  function updateSlideshowTheme() {
    updateSlideshowThemeForIndex(currentIndex);
  }

  function updateSlideshowThemeForIndex(index) {
    const slide = slides[index];
    const isLight = slide?.theme === "light";
    document.getElementById("slideshow").classList.toggle("slideshow-light", isLight);
  }

  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowRight":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        first();
        break;
      case "End":
        e.preventDefault();
        last();
        break;
      case "f":
      case "F":
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
    }
  }

  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    if (diff > threshold) next();
    else if (diff < -threshold) prev();
  }

  function init() {
    if (slides.length === 0) {
      slidesContainer.innerHTML = '<p class="no-slides">No slides in config. Edit slides.config.js.</p>';
      return;
    }

    renderSlides();
    updateSlideshowTheme();

    btnPrev.addEventListener("click", prev);
    btnNext.addEventListener("click", next);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    const anchorSlides = typeof ANCHOR_SLIDES !== "undefined" ? ANCHOR_SLIDES : [];
    document.querySelectorAll(".anchor-bubble").forEach((btn) => {
      const anchorIndex = parseInt(btn.dataset.anchor, 10);
      const slideIndex = anchorSlides[anchorIndex];
      if (slideIndex != null) {
        btn.addEventListener("click", () => goToSlide(slideIndex));
      }
    });
  }

  init();
})();
