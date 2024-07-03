// script.js
const addButton = document.getElementById('add-class-button');
const element = document.getElementById('element');

function addClassToElement() {
  // Ajoute une classe CSS à l'élément 'element'.
  element.classList.add('new-class');
  console.log(pistache);
}

addButton.addEventListener('click', addClassToElement);