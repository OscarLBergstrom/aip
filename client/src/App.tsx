import React from 'react';
import "./assets/styles/app.scss";
import HomePresenter from './components/presenters/homePresenter';
import HeaderPresenter from './components/presenters/headerPresenter';
import FooterPresenter from "./components/presenters/footerPresenter";

const App = () => {
  return (
    <html className="app">
      <HeaderPresenter/>
      <HomePresenter/>
      <FooterPresenter/>
    </html>
  );
}

export default App;
