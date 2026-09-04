document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  initCarousel();
});

function renderFeatured() {
  const el = document.getElementById("featuredGopher");
  if (!el) return;
  const featured = GOPHERS.find((g) => g.featured) || GOPHERS[0];
  el.innerHTML = `
    <div class="featured-media">
      ${gopherImageMarkup(featured, "featured-img")}
    </div>
    <div class="featured-body">
      <span class="species-tag">${featured.speciesLabel}</span>
      <h3>${featured.name}</h3>
      <p class="tagline">${featured.tagline}</p>
      <p>${featured.description}</p>
      <div class="featured-meta">
        <span class="price">$${featured.price.toFixed(2)}</span>
        <span class="digging-rating" title="Digging skill">${diggingStars(featured.diggingSkill)}</span>
      </div>
      <a href="gopher.html?id=${featured.id}" class="btn btn-primary">Meet ${featured.name}</a>
    </div>
  `;
}

function initCarousel() {
  const el = document.getElementById("testimonialCarousel");
  if (!el) return;
  let index = 0;

  function render() {
    const t = TESTIMONIALS[index];
    el.innerHTML = `
      <button class="carousel-arrow prev" aria-label="Previous testimonial">&#8249;</button>
      <div class="carousel-slide">
        <p class="quote">&ldquo;${t.quote}&rdquo;</p>
        <p class="author">— ${t.author}</p>
      </div>
      <button class="carousel-arrow next" aria-label="Next testimonial">&#8250;</button>
    `;
    el.querySelector(".prev").addEventListener("click", () => {
      index = (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      render();
    });
    el.querySelector(".next").addEventListener("click", () => {
      index = (index + 1) % TESTIMONIALS.length;
      render();
    });
  }

  render();
  setInterval(() => {
    index = (index + 1) % TESTIMONIALS.length;
    render();
  }, 6000);
}

function diggingStars(level) {
  const full = "⛏".repeat(level);
  const empty = "·".repeat(5 - level);
  return `${full}${empty} <span class="digging-label">(${level}/5)</span>`;
}

function gopherImageMarkup(g, cssClass) {
  if (g.image) {
    return `<img src="${g.image}" alt="${g.imageAlt}" class="${cssClass}" loading="lazy">`;
  }
  return `<div class="${cssClass} illustration-wrap">${illustrationFor(g.species)}</div>`;
}

function illustrationFor(species) {
  const palette = {
    Plains: { body: "#c9995f", belly: "#f3dcb8", accent: "#8a6136" },
    Giant: { body: "#8a5a34", belly: "#d8b98c", accent: "#5c3a1f" },
    Bottas: { body: "#e0b98a", belly: "#f8e9d2", accent: "#b4895a" }
  };
  const p = palette[species] || palette.Plains;
  const scale = species === "Giant" ? 1.15 : species === "Bottas" ? 0.85 : 1;
  return `
    <svg viewBox="0 0 200 200" class="gopher-illustration">
      <g transform="translate(100,105) scale(${scale}) translate(-100,-105)">
        <ellipse cx="100" cy="140" rx="62" ry="46" fill="${p.body}"/>
        <ellipse cx="100" cy="140" rx="40" ry="30" fill="${p.belly}"/>
        <circle cx="68" cy="92" r="36" fill="${p.body}"/>
        <circle cx="46" cy="66" r="12" fill="${p.body}"/>
        <circle cx="46" cy="66" r="6" fill="${p.belly}"/>
        <circle cx="86" cy="62" r="10" fill="${p.body}"/>
        <circle cx="86" cy="62" r="5" fill="${p.belly}"/>
        <circle cx="58" cy="90" r="5" fill="#2b1c12"/>
        <circle cx="78" cy="86" r="5" fill="#2b1c12"/>
        <ellipse cx="66" cy="106" rx="9" ry="6" fill="${p.belly}"/>
        <rect x="61" y="108" width="4" height="9" fill="#fff"/>
        <rect x="68" y="108" width="4" height="9" fill="#fff"/>
        <path d="M150,165 q30,-8 26,18" stroke="${p.accent}" stroke-width="9" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
  `;
}
