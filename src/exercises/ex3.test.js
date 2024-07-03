
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Charger l'HTML depuis le fichier index.html
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// Déclarer les variables pour le DOM et le document
let dom;
let document;
let emailInput;
let validationMessage;

  // Avant chaque test, initialiser le DOM avec JSDOM et charger le script ex3.js
  beforeEach(() => {
    // Créer un nouvel objet JSDOM avec l'HTML chargé
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;

    // Charger le contenu du script ex3.js dans une balise <script> du DOM simulé
    const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex3.js'), 'utf8');
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

 // Sélectionner les éléments du DOM nécessaires pour les tests
 emailInput = document.getElementById('email-input');
 validationMessage = document.getElementById('validation-message');
  });

  // Test unitaire pour la fonction validateEmail
test('validateEmail - empty email', () => {
    // Simuler une soumission de formulaire avec un email vide
    emailInput.value = '';
    emailForm.dispatchEvent(new dom.window.Event('submit'));
  
    // Vérifier que le message de validation est correct
    expect(validationMessage.textContent).toBe('Email cannot be empty');
    expect(validationMessage.style.color).toBe('red');
  });
  
  test('validateEmail - invalid email format', () => {
    // Simuler une soumission de formulaire avec un email invalide
    emailInput.value = 'invalidemail';
    emailForm.dispatchEvent(new dom.window.Event('submit'));
  
    // Vérifier que le message de validation est correct
    expect(validationMessage.textContent).toBe('Please enter a valid email address');
    expect(validationMessage.style.color).toBe('red');
  });
  
  test('validateEmail - valid email', () => {
    // Simuler une soumission de formulaire avec un email valide
    emailInput.value = 'test@example.com';
    emailForm.dispatchEvent(new dom.window.Event('submit'));
  
    // Vérifier que le message de validation est correct
    expect(validationMessage.textContent).toBe('Email is valid ✔️');
    expect(validationMessage.style.color).toBe('green');
  });
  