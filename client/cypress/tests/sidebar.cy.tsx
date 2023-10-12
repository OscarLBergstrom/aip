import React from 'react'
import SidebarPresenter from '../../src/components/presenters/sidebarPresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const sidebar = (loggedIn: boolean) => {
  const haipModel = new HaipModel();
  if(loggedIn) {
    haipModel.loggedIn = true
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <SidebarPresenter model={haipModel}/>
      }/>
    </Routes>
  </BrowserRouter>
  );
};

describe('Sidebar button logged in ', () => {

    it('renders toggle sidebar button when logged in', () => {
        cy.mount(sidebar(true));
        cy.get('[id=menu-toggler]').should('exist');
    });
    
});

describe('Show sidebar logged in', () => {

    it('renders sidebar after click on open sidebar', () => {
        cy.mount(sidebar(true));
        cy.get('[id=menu-toggler]').click();
        cy.get('[id=menu]').should('have.class', 'sidebar open');
    });

    it('renders no sidebar after click on close sidebar', () => {
        cy.mount(sidebar(true));
        cy.get('[id=menu-toggler]').click();
        cy.get('[id=menu-toggler]').click();
        cy.get('[id=menu]').should('have.class', 'sidebar');
    });

});

describe('Sidebar button not logged in', () => {
    
    it('renders no toggle sidebar button when not logged in', () => {
        cy.mount(sidebar(false));
        cy.get('[id=menu-toggler]').should('not.exist');
    });

});

describe('Menu items', () => {

    it('renders correct menu items', () => {
        cy.mount(sidebar(true));
        cy.get('[id=menu-toggler]').click();
        cy.get('[id=menu]').within(() => {
            cy.get('[id=menu-item-home]').contains('Home');
            cy.get('[id=menu-item-create]').contains('Create Playlist');
            cy.get('[id=menu-item-list]').contains('Your Playlists');
        });
    });

});

describe('Menu item links', () => {
  
  it('Click on home redirects to home', () => {
    cy.mount(sidebar(true));
    cy.get('[id=menu-toggler]').click();
    cy.get('[id=menu-item-home]').within(() => {
      cy.get('div').click();
    });
    cy.url().should('eq', 'http://localhost:8080/');
  });

  it('Click on create redirects to create', () => {
    cy.mount(sidebar(true));
    cy.get('[id=menu-toggler]').click();
    cy.get('[id=menu-item-create]').within(() => {
      cy.get('div').click();
    });
    cy.url().should('eq', 'http://localhost:8080/create');
  });

  it('Click on list redirects to list', () => {
    cy.mount(sidebar(true));
    cy.get('[id=menu-toggler]').click();
    cy.get('[id=menu-item-list]').within(() => {
      cy.get('div').click();
    });
    cy.url().should('eq', 'http://localhost:8080/list');
  });

});


