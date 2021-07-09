const cards = document.querySelectorAll(".card.recipes");

for (let card of cards) {
  card.addEventListener("click", () => {
    window.location.href = `/recipe/${card.id}`;
  });
}
