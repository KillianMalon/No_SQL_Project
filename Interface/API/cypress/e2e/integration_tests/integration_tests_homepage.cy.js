// cypress/e2e/ui_tests/ui_homepage.cy.js

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Movies from '../../../models/movies.js';

let mongoServer;

describe('Integration Test', () => {
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        const movies = [
            { title: 'Movie 1', realisator: 'Realisator 1' },
            { title: 'Movie 2', realisator: 'Realisator 2' },
            { title: 'Movie 3', realisator: 'Realisator 1' }
        ];
        await Movies.insertMany(movies);
    });

    afterEach(async () => {
        await Movies.deleteMany();
    });

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
