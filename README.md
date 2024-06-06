#### CARUELLE Nathan, MALON Killian, BERNIGOLE Quentin, I1 C2
# Projet de Tests Automatisés

## Barème

Voici un tableau listant les éléments évalués, et leur présence dans le projet.

| Requirement | Présence dans le projet |
|-------------|-------------------------|
| Secrets non visibles | ✅ |
| Tests créés pour le projet | ✅ |
| Posséder une base de données | ✅ : (MongoDB) |
| Tests Unitaires | ✅ : Interface/API/test/movie.test.js |
| Tests graphiques| ✅ : Interface/API/cypress/e2e/ui_tests/ |
| Tests d'Intégration| ✅ : Interface/API/cypress/e2e/integration_tests/integration_tests_homepage.cy.js |
| Déclanchement automatique des tests | ✅ : Via GitActions. .github/workflows |
| Isolation BDD TU | ✅ : cf Interface/API/test/movie.test.js| 
| Isolation BDD TI et Tests Graphiques | ✅ : BDD clonée et variable d'environnement (Github Actions) connecter à cette BDD de tests | 
