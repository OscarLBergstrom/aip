import React from 'react'
import ListPresenter from '../../src/components/presenters/listPresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { playlists } from "../fixtures/playlists";


const list = () => {
  const haipModel = new HaipModel();
  haipModel.loggedIn = true;
  haipModel.playlists = playlists;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <ListPresenter model={haipModel}/>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

describe('List', () => {
  
  it('renders list title', () => {
    cy.mount(list());
    cy.get('[id=list-title]').contains('Your Playlists');
  });

  it('renders list items with image and name', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').each(() => {
        cy.get('img').should('have.class', 'list-item-image');
        cy.get('div').should('have.class', 'list-item-name');
      });
    });
  });

  it('renders list item with correct name', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').first().contains('Discopub');
    });
  });

});

describe('List item click', () => {
  
  it('Click on list item redirects to preview', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').first().click();
    });
    cy.url().should('eq', 'http://localhost:8080/preview');
  });

});
