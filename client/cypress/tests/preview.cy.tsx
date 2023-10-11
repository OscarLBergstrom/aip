import React from 'react'
import PreviewPresenter from '../../src/components/presenters/previewPresenter';
import HaipModel from '../../src/models/model';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const preview = () => {
  const haipModel = new HaipModel();
  haipModel.loggedIn = true;
  haipModel.playlistID = "4A5pH5MkVRMaxpWwSY0TS6";

  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <PreviewPresenter model={haipModel}/>
      }/>
    </Routes>
  </BrowserRouter>
  );
};

describe('Preview', () => {
  
  it('renders preview title', () => {
    cy.mount(preview());
    cy.get('[id=preview-title]').contains('Your HAIP Playlist');
  });

  it('renders player', () => {
    cy.mount(preview());
    cy.get('[id=player]').should('exist');
  });

});