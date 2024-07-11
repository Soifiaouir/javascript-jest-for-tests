const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

global.fetch = fetch;

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex4.js'), 'utf8');

describe('Weather App', () => {
  let dom;
  let document;
  let window;
  let fetchData, displayData, removeParagraph;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;

    window.fetch = jest.fn();

    const scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

    // Attendre que le script soit chargé et exécuté
    return new Promise(resolve => {
      scriptElement.onload = resolve;
    }).then(() => {
      fetchData = window.fetchData;
      displayData = window.displayData;
      removeParagraph = window.removeParagraph;
    });
  });

  test('fetchData récupère et convertit correctement la température', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ main: { temp: 293.15 } })
    };
    window.fetch.mockResolvedValue(mockResponse);

    const result = await fetchData();
    expect(result).toBe('20.00');
  });

  test('fetchData gère correctement les erreurs', async () => {
    window.fetch.mockRejectedValue(new Error('Network error'));

    const result = await fetchData();
    expect(result).toBeNull();
  });

  test('displayData affiche la température correctement', async () => {
    const mockFetchData = jest.fn().mockResolvedValue('20.00');
    await displayData(mockFetchData);

    const paragraph = document.getElementById('paragraph');
    expect(paragraph.textContent).toBe('La température actuelle à Bordeaux est de 20.00°C');
  });

  test('displayData affiche un message d\'erreur en cas d\'échec', async () => {
    const mockFetchData = jest.fn().mockResolvedValue(null);
    await displayData(mockFetchData);

    const paragraph = document.getElementById('paragraph');
    expect(paragraph.textContent).toBe('Impossible de récupérer la température');
  });

  test('removeParagraph supprime le contenu du paragraphe', () => {
    const paragraphContainer = document.getElementById('paragraph-container');
    paragraphContainer.innerHTML = '<p>Test content</p>';

    removeParagraph();

    expect(paragraphContainer.innerHTML).toBe('');
  });

  test('Le bouton de suppression est correctement lié à removeParagraph', () => {
    const removeButton = document.getElementById('remove-paragraph-button');
    const paragraphContainer = document.getElementById('paragraph-container');
    paragraphContainer.innerHTML = '<p>Test content</p>';

    removeButton.click();

    expect(paragraphContainer.innerHTML).toBe('');
  });

  test('displayData est appelé au chargement de la page', () => {
    const mockDisplayData = jest.fn();
    window.displayData = mockDisplayData;

    // Simuler le chargement du DOM
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    expect(mockDisplayData).toHaveBeenCalled();
  });
});