const path = require('path');
const { JSDOM } = require('jsdom');

// Charger l'HTML depuis le fichier index.html
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// Charger le contenu de index.html dans JSDOM
const html = fs.readFileSync('../index.html', 'utf-8');
const { window } = new JSDOM(html);
const { document } = window;

// Injecter le window et document dans global
global.window = window;
global.document = document;

  // Avant chaque test, initialiser le DOM avec JSDOM et charger le script ex3.js
  beforeEach(() => {
    // Créer un nouvel objet JSDOM avec l'HTML chargé
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;

    // Charger le contenu du script ex3.js dans une balise <script> du DOM simulé
    const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex1.js'), 'utf8');
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);


  });

describe('Testing addClassToElement function', function() {
  it('Should add new-class to element when button is clicked', function() {
    // Simuler un clic sur le bouton
    const addButton = document.getElementById('add-class-button');
    const element = document.getElementById('element');

    addButton.click();

    // Vérifier si la classe new-class a été ajoutée à l'élément
    assert.isTrue(element.classList.contains('new-class'), "Class 'new-class' should be added");
  });
});
