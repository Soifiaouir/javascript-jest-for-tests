// script.js

// Récupération des éléments du DOM
const addButton = document.getElementById('add-class-button');
const element = document.getElementById('element');

function addClassToElement() {
  // Définition de la nouvelle classe à ajouter
  const newClass = 'new-class';

  // Vérification si la classe existe déjà sur l'élément
  if (!element.classList.contains(newClass)) {
    // Si la classe n'existe pas, on l'ajoute
    element.classList.add(newClass);
    console.log(`La classe "${newClass}" a été ajoutée à l'élément.`);
  } else {
    // Si la classe existe déjà, on affiche un message dans la console
    console.log(`La classe "${newClass}" est déjà présente sur l'élément.`);
  }
}

// Ajout de l'écouteur d'événement sur le bouton
if (addButton) {
  addButton.addEventListener('click', addClassToElement);
}

// Exportation de la fonction pour les tests
module.exports = { addClassToElement };