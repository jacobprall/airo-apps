document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gopherParam = params.get("gopher");
  const select = document.getElementById("gopherChoice");
  if (gopherParam && select) {
    const match = Array.from(select.options).find((o) =>
      o.value.toLowerCase().includes(gopherParam.toLowerCase())
    );
    if (match) select.value = match.value;
  }

  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".accordion-trigger").forEach((t) => {
        t.setAttribute("aria-expanded", "false");
        t.closest(".accordion-item").classList.remove("open");
      });
      if (!expanded) {
        trigger.setAttribute("aria-expanded", "true");
        item.classList.add("open");
      }
    });
  });

  const form = document.getElementById("reservationForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      document.getElementById("formSuccess").hidden = false;
      form.querySelectorAll("input, textarea, select").forEach((elm) => {
        elm.disabled = true;
      });
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.textContent = "Reservation Sent!";
      submitBtn.disabled = true;
    });
  }
});
