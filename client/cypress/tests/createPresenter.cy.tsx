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