/* eslint-disable no-undef */

describe('Main Page Test', () => {
  it('should add a new repo', () => {
    const repo = 'pgomesdev/simple-apollo-hooks-example';
    cy.visit('/');

    cy.get('input[name=repo]').type(repo);
    cy.get('button[type=submit]').click();

    cy.get('li').should('contain', repo);
  });
});