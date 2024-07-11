const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
let dom;
let document;

beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
  
    const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex5.js'), 'utf8');
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
});

describe('ex5', () => {
  test('mouseover', () => {
    const hoverArea = document.getElementById('hover-area');//appel les constantes à tester
    const interactionResult = document.getElementById('interaction-result');

    // Vérifier que le texte initial est correct avant le survol
    expect(interactionResult.textContent).toBe('Hover over the area.');

    // Simuler un survol sur la zone
    hoverArea.dispatchEvent(new dom.window.MouseEvent('mouseover'));

    // Vérifier que le texte du message a été mis à jour après le survol
    expect(interactionResult.textContent).toBe('You are hovering over the area!');
    expect(hoverArea.style.backgroundColor).toBe('red');

    // Simuler la fin du survol
    hoverArea.dispatchEvent(new dom.window.MouseEvent('mouseout'));

    // Vérifier que tout est revenu à l'état initial
    expect(interactionResult.textContent).toBe('Hover over the area.');
    expect(hoverArea.style.backgroundColor).toBe('greenyellow');
  });
});