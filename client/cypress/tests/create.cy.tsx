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
    cy.wait(5000);
    cy.get('[id=bot-title]').contains('Your HAIP Playlist');
  });

  it('renders bot response list', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
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
    cy.wait(5000);
    cy.get('[id=error]').contains('Could not generate playlist, please provide a better description.');
  });

});
  
describe('Save to Spotify', () => {

  it('renders save to spotify button', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('button').contains('Save to Spotify');
  });

  it('redirects to preview after click on save to spotify', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('button').click();
    cy.url().should('eq', 'http://localhost:8080/preview');
  });

});

describe('Loading', () => {

  it('renders loading animation after click on submit bot request', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.get('[id=loader]').should('exist');
  });

  it('renders loading animation after click on save to spotify', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('button').click();
    cy.get('[id=loader]').should('exist');
  });

});

describe('Edit playlist', () => {

  it('renders edit playlist toggler correctly when closed', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('[id=edit-playlist-closed]').contains('Edit Playlist');
    cy.get('[id=edit-playlist-closed]').within(() => {
      cy.get('[id=open-edit-button]');
    });
  });

  it('renders edit playlist correctly after click on open', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('[id=open-edit-button]').click();
    cy.get('[id=edit-playlist-open]').contains('Edit Playlist');
    cy.get('[id=edit-playlist-open]').within(() => {
      cy.get('[id=close-edit-button]');
    });
  });

  it('renders edit playlist form correctly after click on open', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('Italian');
    cy.get('input[name=name]').type('My Italian Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('[id=open-edit-button]').click();
    cy.get('form').should('exist');
  });

  it('does not render edit playlist when errors in botresponse', () => {
    cy.mount(create());
    cy.get('input[name=query]').type('hdsfgahlgfhdsalgueilwYFUÖEWgfdulsgVLDASBVLKDSBAKL');
    cy.get('input[name=name]').type('My Error Playlist');
    cy.get('input[name=submit]').click();
    cy.wait(5000);
    cy.get('[id=open-edit-button]').should('not.exist');
  });

});
