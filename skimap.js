let currentLang = "it";

// Attiva Panzoom
const map = document.querySelector("#map");
const panzoom = Panzoom(map, {
  maxScale: 5,
  minScale: 0.7,
  contain: "outside",
});
map.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
map.addEventListener("touchmove", (e) => e.preventDefault(), {
  passive: false,
});

// Aggiunge tutti gli hotspot dalla lista IMPIANTI
window.IMPIANTI.forEach((i) => {
  const el = document.createElement("div");
  el.className = "hotspot";
  el.style.top = i.top;
  el.style.left = i.left;
  el.style.background = "transparent";
  el.dataset.info = JSON.stringify(i); // Salva tutti i dati come stringa JSON
  map.appendChild(el);
});

// Gestione modale
const modal = document.getElementById("info-modal");
const modalTitle = document.getElementById("modal-title");
const modalInfo = document.getElementById("modal-info");
const closeModal = document.getElementById("close-modal");

document.querySelectorAll(".hotspot").forEach((hs) => {
  hs.addEventListener("click", () => {
    const data = JSON.parse(hs.dataset.info);

    // Traduci nome in base alla lingua
    modalTitle.textContent = data.nome[currentLang];

    modalInfo.innerHTML = `
      ${
        data.immagine
          ? `<img src="${data.immagine}" alt="${data.nome[currentLang]}" class="modal-img">`
          : ""
      }
      <p><strong>${currentLang === "it" ? "Posti" : "Seats"}:</strong> ${
      data.posti
    }</p>
      <p><strong>${
        currentLang === "it" ? "Lunghezza" : "Length"
      }:</strong> ${data.lunghezza.toFixed(2)} m</p>
      <p><strong>${
        currentLang === "it" ? "Dislivello" : "Vertical drop"
      }:</strong> ${data.dislivello.toFixed(2)} m</p>
      <p><strong>${
        currentLang === "it" ? "Quota alla cima" : "Altitude at top"
      }:</strong> ${data.quota.toFixed(2)} m</p>
    `;

    modal.classList.remove("hidden");
  });
});

document.querySelectorAll("#language-selector button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;

    document
      .querySelectorAll("#language-selector button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
