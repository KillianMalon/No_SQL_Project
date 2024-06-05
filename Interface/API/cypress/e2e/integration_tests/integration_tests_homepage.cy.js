describe('Movie Search and Detail Flow', () => {
    it('should search for movies and view details', () => {
      // Visit the home page
      cy.visit('/');
  
      // Enter a search term in the search form (title)
      cy.get('input[placeholder="Rechercher par titre"]').type('Bovines');
  
      // Submit the search form
      cy.get('button').contains('Rechercher').click();
  
      // Verify that the results page is displayed
      cy.url().should('include', '/movies');
      cy.get('.card').contains('Bovines').should('be.visible');
  
      // Click on the detail button of the movie
      cy.get('.card').contains('Bovines').parent().find('a').click();
  
      // Verify that the detail page is displayed with specific details
      cy.url().should('include', '/movies/details');
      cy.get('.card-text').should('be.visible');
      cy.get('.list-group-item')
        .should('contain', 'Année de sortie')
        .and('contain', 'Réalisateur')
        .and('contain', 'Acteurs')
        .and('contain', 'Genre')
        .and('contain', 'Durée');
    });
  });
  