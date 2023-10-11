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

});

describe('List values', () => {

  it('renders list items with correct names', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').first().contains('Discopub');
      cy.get('[id=list-item]').next().contains('Dqueis2022');
    });
  });

  it('renders list items with correct image sources', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').first().within(() => {
        cy.get('img').should('have.attr', 'src', 'https://mosaic.scdn.co/640/ab67616d0000b273056e90910cbaf5c5b892aebaab67616d0000b2731fc9fd5d701ee05cb39b7b19ab67616d0000b2734121faee8df82c526cbab2beab67616d0000b27352038992fc6d7868f31d23b7');
      });
      cy.get('[id=list-item]').next().within(() => {
        cy.get('img').should('have.attr', 'src', 'https://mosaic.scdn.co/640/ab67616d0000b2731e340d1480e7bb29a45e3bd7ab67616d0000b2732e85e4a4d3b2756d6a8f14e4ab67616d0000b2733aabc154f1a1d9d0502556edab67616d0000b273c12767a5b413c794d2c5a569');
      });
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

describe('List hover styles', () => {

  it('renders active style when hover on list item', () => {
    cy.mount(list());
    cy.get('[id=list]').within(() => {
      cy.get('[id=list-item]').first().realHover()
        .should('have.css', 'background-color', 'rgb(120, 117, 117)');
    });
  });

});
