// test.js ou addClassToElement.test.js

const { JSDOM } = require('jsdom');

describe('addClassToElement function', () => {
  let document;
  let addButton;
  let element;
  let addClassToElement;

  beforeEach(() => {
    const dom = new JSDOM(`
      <html>
        <body>
          <button id="add-class-button">Add Class</button>
          <div id="element" class="initial-class"></div>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    document = dom.window.document;
    addButton = document.getElementById('add-class-button');
    element = document.getElementById('element');

    // Réinitialiser le module avant chaque test
    jest.resetModules();
    const script = require('./ex1');
    addClassToElement = script.addClassToElement;
  });

  test('should add new-class to the element when function is called', () => {
    addClassToElement();
    expect(element.classList.contains('new-class')).toBeTruthy();
  });

  test('should keep the initial-class on the element', () => {
    addClassToElement();
    expect(element.classList.contains('initial-class')).toBeTruthy();
  });

  test('should not add new-class multiple times', () => {
    addClassToElement();
    addClassToElement();
    expect(element.classList.toString().split(' ').filter(c => c === 'new-class').length).toBe(1);
  });
});