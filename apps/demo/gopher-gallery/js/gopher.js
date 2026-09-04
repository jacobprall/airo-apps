document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const gopher = GOPHERS.find((g) => g.id === id) || GOPHERS[0];
  renderDetail(gopher);
  document.title = `${gopher.name} the ${gopher.speciesLabel} — Gopher Gallery`;
});

function renderDetail(g) {
  const el = document.getElementById("gopherDetail");
  if (!el) return;
  el.innerHTML = `
    <div class="detail-media">
      ${gopherImageMarkup(g, "detail-img")}
      ${g.image ? `<p class="photo-credit-inline">Photo: ${g.imageCredit}</p>` : ""}
    </div>
    <div class="detail-body">
      <span class="species-tag">${g.speciesLabel}</span>
      <h1>${g.name}</h1>
      <p class="tagline">${g.tagline}</p>
      <p class="price-large">$${g.price.toFixed(2)}</p>
      <p class="description">${g.description}</p>
      <dl class="stat-list">
        <div class="stat-row">
          <dt>Temperament</dt>
          <dd>${g.temperament}</dd>
        </div>
        <div class="stat-row">
          <dt>Diet</dt>
          <dd>${g.diet}</dd>
        </div>
        <div class="stat-row">
          <dt>Digging Skill</dt>
          <dd>${diggingStars(g.diggingSkill)}</dd>
        </div>
      </dl>
      <a href="contact.html?gopher=${encodeURIComponent(g.name)}" class="btn btn-primary btn-large">Adopt ${g.name} Now</a>
    </div>
  `;
}
