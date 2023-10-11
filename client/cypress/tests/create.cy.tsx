import React from 'react'
import CreatePresenter from '../../src/components/presenters/createPresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const create = () => {
  const haipModel = new HaipModel();
  haipModel.loggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <CreatePresenter model={haipModel}/>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

describe('Create Form', () => {
  
    it('renders create title', () => {
      cy.mount(create());
      cy.get('[id=create-title]').contains('Create Playlist');
    });

    it('renders form with correct inputs', () => {
        cy.mount(create());
        cy.get('form').within(() => {
            cy.get('input[name=query]');
            cy.get('input[name=name]');
            cy.get('input[name=numberOfTracks]');
            cy.get('input[name=submit]');
        })
    });
  
});

describe('Bot response', () => {

  it('renders bot response title', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(3000);
    cy.get('[id=bot-title]').contains('Your HAIP Playlist');
  });

  it('renders bot response list', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(3000);
    cy.get('[id=botlist]').within(() => {
      cy.get('[id=botlist-item]').each(() => {
        cy.get('[id=title]').should('have.class', 'botlist-item-title');
        cy.get('[id=artist]').should('have.class', 'botlist-item-artist');
      });
    });
  });

  it('renders error when cannot create playlist', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('hdsfgahlgfhdsalgueilwYFUÖEWgfdulsgVLDASBVLKDSBAKL');
    cy.get('input[name=name]').type('My Error Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(3000);
    cy.get('[id=error]').contains('Could not generate playlist, please provide a better description.');
  });

});
  
describe('Save to Spotify', () => {

  it('renders save to spotify button', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(3000);
    cy.get('button').contains('Save to Spotify');
  });

  it('redirects to preview after click on save to spotify', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(3000);
    cy.get('button').click();
    cy.url().should('eq', 'http://localhost:8080/preview');
  });


});
