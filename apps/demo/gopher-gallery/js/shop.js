document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const initialSpecies = params.get("species") || "all";
  renderGrid(initialSpecies);
  setActiveFilter(initialSpecies);

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const species = btn.getAttribute("data-species");
      renderGrid(species);
      setActiveFilter(species);
    });
  });
});

function setActiveFilter(species) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-species") === species);
  });
}

function renderGrid(species) {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  const list =
    species === "all" ? GOPHERS : GOPHERS.filter((g) => g.species === species);

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">No gophers in that category right now — check back soon, they're probably just underground.</p>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (g) => `
    <article class="gopher-card">
      <a href="gopher.html?id=${g.id}" class="gopher-card-media">
        ${gopherImageMarkup(g, "card-img")}
        <span class="species-tag">${g.speciesLabel}</span>
      </a>
      <div class="gopher-card-body">
        <h3><a href="gopher.html?id=${g.id}">${g.name}</a></h3>
        <p class="tagline">${g.tagline}</p>
        <div class="card-meta">
          <span class="price">$${g.price.toFixed(2)}</span>
          <span class="digging-rating" title="Digging skill">${diggingStars(g.diggingSkill)}</span>
        </div>
        <a href="gopher.html?id=${g.id}" class="btn btn-outline">View Details</a>
      </div>
    </article>
  `
    )
    .join("");
}
