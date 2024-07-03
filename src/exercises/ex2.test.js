const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Charger l'HTML depuis le fichier index.html
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// Déclaration des variables pour le DOM et le document
let dom;
let document;

// Avant chaque test, initialiser le DOM avec JSDOM et charger le script ex2.js
beforeEach(() => {
  // Créer un nouvel objet JSDOM avec l'HTML chargé
  dom = new JSDOM(html, { runScripts: "dangerously" });
  document = dom.window.document;

  // Charger le contenu du script ex2.js dans une balise <script> du DOM simulé
  const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex2.js'), 'utf8');
  const scriptElement = document.createElement("script");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement);
});

// Décrire le groupe de tests pour ex2.js
describe('ex2', () => {
  // Test spécifique : vérifie que cliquer sur le bouton met à jour le texte du message
  test('Clicking the button updates the message text', () => {
    // Récupérer les éléments du DOM nécessaires pour le test
    const clickMeButton = document.getElementById('click-me-button');
    const message = document.getElementById('message');

    // Vérifier que le texte initial est correct avant le clic sur le bouton
    expect(message.textContent).toBe('Hello, World!');

    // Simuler un clic sur le bouton
    clickMeButton.click();

    // Vérifier que le texte du message a été mis à jour après le clic sur le bouton
    expect(message.textContent).toBe('mange des pistaches');
  });
});
