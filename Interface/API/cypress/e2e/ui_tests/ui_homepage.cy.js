describe('Test page accueil', () => {

// Les tests réalisés permettent de tester TOUS les éléments de la page d'accueil ainsi qu'une combinaison d'écrans

  it('Affiche le titre de la page', () => {
    // Possible de rajouter un viewport pour modifier la taille de la page. Si on laisse nature ça fonctionne quand même
    cy.visit('/');
    cy.get('h1').should('contain', 'Bienvenue sur Projet Cinéma');
  });

  it('Reconnait le placeholder', () => {
    cy.visit('/');
    cy.get('input[placeholder="Rechercher par titre"]').should('be.visible');
    cy.get('input[placeholder="Rechercher par réalisateur"]').should('be.visible');
  });

  it('Affiche les films récents', () => {
    cy.visit('/');
    cy.get('h2').should('contain', 'Les films les plus récents');
  });

  it('Affiche la page lorsqu\'on clique sur voir le film', () => {
    cy.visit('/');
    cy.get('.card-body').first().find('a').click();
    cy.url().should('include', '/movies/details');
  });

  it('Rechercher un film par titre sur la page d\'accueil', () => {
    cy.visit('/');
    cy.get('input[placeholder="Rechercher par titre"]').type('abracadabra');
    cy.get('button').contains('Rechercher').click();
});

it('Rechercher un film par réalisateur sur la page d\'accueil', () => {
  cy.visit('/');
  cy.get('input[placeholder="Rechercher par réalisateur"]').type('Romain Bicard');
  cy.get('button').contains('Rechercher').click();
});

// -- Début des tests impliquant d'autres écrans -- \\

  it('Doit cliquer sur S\'inscrire', () => {
    cy.visit('/');
    cy.get('a').contains("S'inscrire").click();
    cy.url().should('include', '/auth/register');
    cy.get('h1').should('contain', "S'inscrire");
  });
  
  it('Doit cliquer sur Se connecter', () => {
    cy.visit('/');
    cy.get('a').contains("Se connecter").click();
    cy.url().should('include', '/auth/login');
    cy.get('h1').should('contain', "Se connecter");
  });

  it('Doit cliquer sur Accueil', () => {
    cy.visit('/');
    cy.get('a').contains("Accueil").click();
    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'Bienvenue sur Projet Cinéma');
  });

  // -- Fin des tests impliquant d'autres écrans -- \\
  
});
