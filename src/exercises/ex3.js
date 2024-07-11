// Déclaration des variables globales
let emailForm, emailInput, validationMessage;

// Fonction d'initialisation
function init() {
  emailForm = document.getElementById('email-form');
  emailInput = document.getElementById('email-input');
  validationMessage = document.getElementById('validation-message');

  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      validateEmail();
    });
  }
}

// Fonction de validation d'email
function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    validationMessage.textContent = "Email valide !";
    validationMessage.style.color = "green";
  } else {
    validationMessage.textContent = "Email non valide. Veuillez réessayer.";
    validationMessage.style.color = "red";
  }
}

// Initialisation si le document est chargé
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init, validateEmail };
}