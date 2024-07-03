// Récupération de l'élément bouton avec l'ID 'click-me-button'
const clickMeButton = document.getElementById('click-me-button');

// Récupération de l'élément paragraphe avec l'ID 'message'
const message = document.getElementById('message');

// Fonction showMessage pour modifier le contenu texte du paragraphe 'message'
function showMessage() {
  message.textContent = 'mange des pistaches'; // Changement du texte du paragraphe lors du clic sur le bouton
}

// Ajout d'un écouteur d'événements pour détecter le clic sur le bouton
clickMeButton.addEventListener('click', showMessage);
