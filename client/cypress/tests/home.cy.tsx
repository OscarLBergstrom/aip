import React from 'react'
import HomePresenter from '../../src/components/presenters/homePresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const home = (loggedIn: boolean) => {
  const haipModel = new HaipModel();
  if(loggedIn) {
    haipModel.loggedIn = true;
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <HomePresenter model={haipModel}/>
      }/>
    </Routes>
  </BrowserRouter>
  );
};

describe('Home Logged In', () => {

  it('renders create playlist button when logged in', () => {
    cy.mount(home(true));
    cy.get('button').contains('Create New Playlist');
  });

  it('redirects to create after click on create playlist', () => {
    cy.mount(home(true));
    cy.get('button').click();
    cy.url().should('eq', 'http://localhost:8080/create');
  });

});

describe('Home not logged in', () => {

  it('renders haip title', () => {
    cy.mount(home(false));
    cy.get('[id=haip-text]').contains('AI PLAYLIST');
  });

  it('renders login button when not logged in', () => {
    cy.mount(home(false));
    cy.get('button').contains('Login');
  });

});
