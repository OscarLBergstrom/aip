import React from 'react';
import "./assets/styles/app.scss";
import HomePresenter from './components/presenters/homePresenter';
import HeaderPresenter from './components/presenters/headerPresenter';
import FooterPresenter from "./components/presenters/footerPresenter";
import PreviewPresenter from './components/presenters/previewPresenter';


const App = () => {
  return (
    <div className="app">
      <HeaderPresenter/>
      <HomePresenter/>
      {/* <PreviewPresenter/> */}
      <FooterPresenter/>
    </div>
  );
}

export default App;
