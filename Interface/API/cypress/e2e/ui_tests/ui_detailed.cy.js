describe('Vérification de la page de détails d\'un film', () => {

  it('Vérification des informations pour le film "Abracadabra"', () => {
    cy.visit('http://localhost:8080/movies/details/Abracadabra');
    cy.get('h5').contains('Abracadabra').then(() => {
    cy.get('img').should('be.visible');
      cy.get('.card-text');
      cy.get('.list-group-item')
      .should('contain', 'Année de sortie')
      .and('contain', 'Réalisateur')
      .and('contain', 'Acteurs')
      .and('contain', 'Genre')
      .and('contain', 'Durée');
    });
  });
  
})