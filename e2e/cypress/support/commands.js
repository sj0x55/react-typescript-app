const COMMAND_DELAY = Cypress.env('COMMAND_DELAY') || 0;

if (COMMAND_DELAY > 0) {
  for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) => {
        setTimeout(() => resolve(origVal), COMMAND_DELAY);
      });
    });
  }
}

const findOptions = {
  prevSubject: true,
};

const getByDataAttr = (name, value, ...args) => {
  return cy.get(`[data-${name}=${value}]`, ...args);
};

const findByDataAttr = (subject, name, value, ...args) => {
  return subject.find(`[data-${name}=${value}]`, ...args);
};

Cypress.Commands.add('getByDataAttr', getByDataAttr);
Cypress.Commands.add('getByTestAttr', (value, ...args) => {
  return getByDataAttr('test', value, ...args);
});

Cypress.Commands.add('findByDataAttr', findOptions, findByDataAttr);
Cypress.Commands.add('findByTestAttr', findOptions, (subject, value, ...args) => {
  return findByDataAttr(subject, 'test', value, ...args);
});
