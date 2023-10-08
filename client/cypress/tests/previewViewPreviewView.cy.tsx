import React from 'react'
import PreviewView from '../../src/components/views/previewView'

describe('<PreviewView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PreviewView />)
  })
})