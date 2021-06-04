const showAndHideButton = document.querySelectorAll(".showAndHide");

for(let button of showAndHideButton){
    button.addEventListener('click', (event)=>{
        const content = button.previousSibling.parentNode.parentNode
        content.querySelector('.sectionContent').classList.toggle('active')
        changeDescriptionButton(button)
    })
}

function changeDescriptionButton(button){
    if(button.textContent == "Esconder"){
            button.textContent = `Mostrar`
        }else if(button.textContent = "Mostrar"){
            button.textContent = `Esconder`
        }
}