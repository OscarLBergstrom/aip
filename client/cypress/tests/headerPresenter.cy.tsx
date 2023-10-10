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
        cy.get('[id=logout]');
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
  
});