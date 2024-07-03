// script.js

// Sélection des éléments du DOM
const emailForm = document.getElementById('email-form');
const emailInput = document.getElementById('email-input');
const validationMessage = document.getElementById('validation-message');

// Fonction pour valider l'email
function validateEmail() {
  // Récupérer la valeur de l'email entré par l'utilisateur et supprimer les espaces vides autour
  const email = emailInput.value.trim();

  // Expression régulière pour la validation d'email (simple pour cet exemple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Vérifier si l'email est vide
  if (email === '') {
    // Afficher un message d'erreur si l'email est vide
    validationMessage.textContent = 'Email cannot be empty';
    validationMessage.style.color = 'red';
    return; // Arrêter l'exécution de la fonction
  }

  // Vérifier si l'email ne correspond pas au format requis par l'expression régulière
  if (!emailRegex.test(email)) {
    // Afficher un message d'erreur si l'email n'est pas valide
    validationMessage.textContent = 'Please enter a valid email address';
    validationMessage.style.color = 'red';
    return; // Arrêter l'exécution de la fonction
  }

  // Si toutes les validations passent, afficher un message de confirmation que l'email est valide
  validationMessage.textContent = 'Email is valid ✔️';
  validationMessage.style.color = 'green';
}

// Écouter l'événement de soumission du formulaire
emailForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Empêcher le comportement par défaut du formulaire (rechargement de la page)
  validateEmail(); // Appeler la fonction pour valider l'email
});
