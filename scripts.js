const modalOverlay = document.querySelector('.modalOverlay')

const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        modalOverlay.classList.toggle('active')
        modalOverlay.querySelector('img').src = `${card.querySelector('img').src}`
        modalOverlay.querySelector('.nameRecipe').textContent = `${card.querySelector('.nameRecipe').textContent}`
        modalOverlay.querySelector('.author').textContent = `${card.querySelector('.authorRecipe').textContent}`
    })
}

const closeModal = document.querySelector('.closeModal')
closeModal.addEventListener('click', () => {
    modalOverlay.classList.toggle('active')
})

