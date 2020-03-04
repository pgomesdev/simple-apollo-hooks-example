/* eslint-disable no-undef */

describe('Repository Page Test', () => {
  it('should add a new repo and move to details page', () => {
    const repo = 'pgomesdev/simple-apollo-hooks-example';
    cy.visit('/');

    cy.get('input[name=repo]').type(repo);
    cy.get('button[type=submit]').click();

    cy.contains('Detalhes').click();

    cy.url().should('include', '/repository');
    cy.get('h1').should('contain', repo);
    cy.get('p').should(
      'contain',
      'This is a simple implementation of the apollo hooks using the github api.'
    );
  });

  it('should add a new repo, open the details and go back to the main page', () => {
    const repo = 'pgomesdev/simple-apollo-hooks-example';
    cy.visit('/');

    cy.get('input[name=repo]').type(repo);
    cy.get('button[type=submit]').click();

    cy.contains('Detalhes').click();

    cy.url().should('include', '/repository');
    cy.get('h1').should('contain', repo);
    cy.get('p').should(
      'contain',
      'This is a simple implementation of the apollo hooks using the github api.'
    );

    cy.contains('Voltar à listagem').click();

    cy.get('h1').should('contain', 'Type the owner and repository name');
  });
});