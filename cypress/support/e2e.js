// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@applitools/eyes-cypress/commands'


// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-file-upload';
import 'cypress-if';
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()
// import registerCypressGrep from '@cypress/grep/src/support'
// registerCypressGrep()
import addContext from "mochawesome/addContext";
Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')