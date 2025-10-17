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
  el.style.background = i.colore || "red";
  el.dataset.title = i.nome;
  el.dataset.info = i.descrizione;
  map.appendChild(el);
});

// Gestione modale
const modal = document.getElementById("info-modal");
const modalTitle = document.getElementById("modal-title");
const modalInfo = document.getElementById("modal-info");
const closeModal = document.getElementById("close-modal");

document.querySelectorAll(".hotspot").forEach((hs) => {
  hs.addEventListener("click", () => {
    modalTitle.textContent = hs.dataset.title;
    modalInfo.textContent = hs.dataset.info;
    modal.classList.remove("hidden");
  });
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
