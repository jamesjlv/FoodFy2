const modalOverlay = document.querySelector(".modalOverlay");

const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", () => {
    window.location.href = `/recipe/${card.id}`;
  });
}

// Show and hide Recipe Information

const buttonsShow = document.querySelectorAll(".title span");
console.log(buttonsShow);
