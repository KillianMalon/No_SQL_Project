describe('Vérification que les informations sont présentes pour la création d\'un compte', () => {

  it('Les informations de connexions sont visibles par l\'utilisateur', () => {
    cy.visit('http://localhost:8080/auth/register');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    });
});
