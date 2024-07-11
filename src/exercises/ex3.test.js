const { JSDOM } = require('jsdom');

describe('Email Validation', () => {
  let document, emailForm, emailInput, validationMessage, validateEmail, init;

  beforeEach(() => {
    const dom = new JSDOM(`
      <html>
        <body>
          <form id="email-form">
            <input type="text" id="email-input">
            <button type="submit">Submit</button>
          </form>
          <p id="validation-message"></p>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    global.window = dom.window;
    document = dom.window.document;

    // Importer les fonctions du script
    const script = require('./ex3');
    init = script.init;
    validateEmail = script.validateEmail;

    // Initialiser les éléments
    init();

    // Récupérer les éléments après l'initialisation
    emailForm = document.getElementById('email-form');
    emailInput = document.getElementById('email-input');
    validationMessage = document.getElementById('validation-message');
  });

  test('should validate a correct email address', () => {
    emailInput.value = 'test@example.com';
    validateEmail();
    expect(validationMessage.textContent).toBe("Email valide !");
    expect(validationMessage.style.color).toBe("green");
  });

  test('should invalidate an incorrect email address', () => {
    emailInput.value = 'invalid-email';
    validateEmail();
    expect(validationMessage.textContent).toBe("Email non valide. Veuillez réessayer.");
    expect(validationMessage.style.color).toBe("red");
  });

  test('should prevent form submission', () => {
    const mockPreventDefault = jest.fn();
    const submitEvent = new window.Event('submit');
    submitEvent.preventDefault = mockPreventDefault;
    
    emailForm.dispatchEvent(submitEvent);

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});