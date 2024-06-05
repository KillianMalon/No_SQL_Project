describe('Vérification que les informations sont présentes pour la création d\'un compte', () => {

  it('Les informations de connexions sont visibles par l\'utilisateur', () => {
    cy.visit('http://localhost:8080/auth/login');
    cy.get('label[for="email-input"]').should('contain', 'Adresse email');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('label[for="password-input"]').should('contain', 'Mot de passe');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Se connecter');
    cy.get('a[href="register"]').should('be.visible').and('contain', 'Inscrivez-vous');
  });
});
