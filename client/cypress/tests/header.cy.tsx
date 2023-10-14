import React from 'react'
import HeaderPresenter from '../../src/components/presenters/headerPresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const header = (loggedIn: boolean) => {
  const haipModel = new HaipModel();
  if(loggedIn) {
    haipModel.loggedIn = true
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <HeaderPresenter model={haipModel}/>
      }/>
    </Routes>
  </BrowserRouter>
  );
};

describe('Header logged in', () => {

    it('renders logout button when logged in', () => {
        cy.mount(header(true));
        cy.get('[id=logout]').should('have.class', 'logout');
    });

    it('renders active header logo when logged in', () => {
        cy.mount(header(true));
        cy.get('[id=header-logo]').should('have.class', 'header-text loggedIn');
    });

});

describe('Header nog logged in', () => {
  
    it('renders header logo', () => {
      cy.mount(header(false));
      cy.get('[id=header-logo]').contains('HAIP');
    });

    it('renders non-active header logo when logged in', () => {
        cy.mount(header(false));
        cy.get('[id=header-logo]').should('have.class', 'header-text');
    });

    it('renders no logout button when not logged in', () => {
      cy.mount(header(false));
      cy.get('[id=logout]').should('not.exist');
    })
  
});

describe('Header hover styles', () => {

  it('renders hover style on logout when hover', () => {
    cy.mount(header(true));
    cy.get('[id=logout-icon]').realHover().should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('renders hover style on header logo when hover', () => {
    cy.mount(header(true));
    cy.get('[id=header-logo]').realHover().should('have.css', 'color', 'rgb(142, 220, 169)');
  });

});

describe('Header redirects', () => {

  it('redirects to home after click on header logo', () => {
    cy.mount(header(true));
    cy.get('[id=header-logo]').click();
    cy.url().should('eq', 'http://localhost:8080/home');
  });

  it('redirects to home and header logo is not active after click on logout', () => {
    cy.mount(header(true));
    cy.get('[id=logout]').click();
    cy.url().should('eq', 'http://localhost:8080/home');
    cy.get('[id=header-logo]').should('have.class', 'header-text');
  });

});