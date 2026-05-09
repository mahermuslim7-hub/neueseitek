const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const imageSlots = [
  {
    src: "assets/photos/maher-upload-entruempelung.png",
    desktopSrc: "assets/photos/entruempelung-desktop.png",
    alt: "Entrümpelung mit Umzugskartons in einem hellen Raum"
  },
  {
    src: "assets/photos/maher-upload-gebaeudereinigung.png",
    desktopSrc: "assets/photos/gebaeudereinigung-desktop.png",
    alt: "Gebäudereinigung in einem gepflegten Büro mit Warnschild und Reinigungswagen"
  },
  {
    src: "assets/photos/maher-upload-glas-fensterreinigung.png",
    desktopSrc: "assets/photos/glas-fensterreinigung-desktop.png",
    alt: "Glas- und Fensterreinigung mit klarer, hochwertiger Darstellung"
  }
];

const gallery = document.querySelector("#work-gallery");
const gallerySection = document.querySelector("[data-gallery-section]");

const loadImage = ({ src, desktopSrc, alt }) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ src, desktopSrc, alt });
    image.onerror = () => resolve(null);
    image.src = src;
  });

if (gallery) {
  Promise.all(imageSlots.map(loadImage)).then((loadedImages) => {
    const availableImages = loadedImages.filter(Boolean);

    if (availableImages.length > 0) {
      if (gallerySection) {
        gallerySection.hidden = false;
      }

      gallery.innerHTML = "";
      availableImages.forEach(({ src, desktopSrc, alt }) => {
        const picture = document.createElement("picture");
        const source = document.createElement("source");
        const image = document.createElement("img");

        source.media = "(min-width: 721px)";
        source.srcset = desktopSrc;
        image.src = src;
        image.alt = alt;
        image.width = 421;
        image.height = 855;
        image.loading = "lazy";
        image.decoding = "async";

        picture.append(source, image);
        gallery.append(picture);
      });
    }
  });
}

const contactSection = document.querySelector("#kontakt");
const tallyFrame = document.querySelector("[data-tally-frame]");
const tallyFallback = document.querySelector("[data-tally-fallback]");

const toTallyEmbedUrl = (input) => {
  if (!input) return "";

  try {
    const url = new URL(input);

    if (!url.hostname.includes("tally.so")) {
      return input;
    }

    if (url.pathname.startsWith("/embed/")) {
      url.searchParams.set("alignLeft", "1");
      url.searchParams.set("hideTitle", "1");
      url.searchParams.set("transparentBackground", "1");
      url.searchParams.set("dynamicHeight", "1");
      return url.toString();
    }

    const formId = url.pathname.split("/").filter(Boolean).pop();

    if (!formId) return input;

    const embedUrl = new URL(`https://tally.so/embed/${formId}`);
    embedUrl.searchParams.set("alignLeft", "1");
    embedUrl.searchParams.set("hideTitle", "1");
    embedUrl.searchParams.set("transparentBackground", "1");
    embedUrl.searchParams.set("dynamicHeight", "1");
    return embedUrl.toString();
  } catch {
    return input;
  }
};

if (contactSection && tallyFrame && tallyFallback) {
  const tallyUrl = contactSection.getAttribute("data-tally-url")?.trim();
  const embedUrl = toTallyEmbedUrl(tallyUrl);

  if (embedUrl) {
    tallyFrame.src = embedUrl;
    tallyFrame.hidden = false;
    tallyFallback.hidden = true;

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.append(script);
  }
}

const serviceAnchors = document.querySelectorAll(
  'a[href="#glasreinigung"], a[href="#fensterreinigung"], a[href="#gebaeudereinigung"], a[href="#entruempelungen"]'
);

serviceAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target || window.matchMedia("(min-width: 721px)").matches) return;

    event.preventDefault();

    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = headerHeight + 12;

    window.scrollTo({
      top: Math.max(targetTop - offset, 0),
      behavior: "smooth"
    });

    history.pushState(null, "", targetId);
  });
});
