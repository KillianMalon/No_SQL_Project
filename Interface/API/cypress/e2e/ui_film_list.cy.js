describe('Vérification de la page de liste des films', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/movies');
  });

  it('Vérifie qu\'il y ait un titre "Liste des films"', () => {
    cy.get('h1').should('contain.text', 'Liste des films');
  });

  it('Vérifie le label "Titre", l\'input pour le titre, et le placeholder "Rechercher par titre" existent', () => {
    cy.get('label').contains('Titre').should('be.visible');
    cy.get('input[placeholder="Rechercher par titre"]').should('be.visible');
  });

  it('Vérifie le label "Réalisateur", l\'input pour le réalisateur, et le placeholder "Rechercher par réalisateur" existent', () => {
    cy.get('label').contains('Réalisateur').should('be.visible');
    cy.get('input[placeholder="Rechercher par réalisateur"]').should('be.visible');
  });

  it('Vérifie que la recherche par "titre" fonctionne"', () => {
    cy.get('input[placeholder="Rechercher par titre"]').type('abracadabra');
    cy.get('button').contains('Rechercher').click();
  });

  it('Vérifie que la recherche par "réalisateur" fonctionne', () => {
    cy.get('input[placeholder="Rechercher par réalisateur"]').type('Michael Dowse');
    cy.get('button').contains('Rechercher').click();
  });

  it('Vérifie qu\'un film contient une image, un titre, une année, un genre et un bouton "voir le film"', () => {
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('img').should('be.visible');
      cy.wrap($card).find('h4').should('be.visible'); // Titre du film
      cy.wrap($card).find('.card-text').should('be.visible'); // Année et Genre du film
      cy.wrap($card).find('a').contains('Voir le film').should('be.visible');
    });
  });

});
