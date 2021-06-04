function addIngredient() {
  const ingredients = document.querySelector(".ingredient");
  const fieldContainer = document.querySelectorAll(".ingredient input");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  if (newField.value == "") return false;
  newField.value = "";
  ingredients.appendChild(newField);
}

function addPreparation() {
  const preparation = document.querySelector(".preparation");
  const fieldContainer = document.querySelectorAll(".preparation input");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  if (newField.value == "") return false;
  newField.value = "";
  preparation.appendChild(newField);
}

document
  .querySelector(".add-preparation")
  .addEventListener("click", addPreparation);

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);
