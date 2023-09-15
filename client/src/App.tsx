import React from 'react';
import "./assets/styles/app.scss";
import HomePresenter from './components/presenters/homePresenter';
import HeaderPresenter from './components/presenters/headerPresenter';

const App = () => {
  return (
    <html>
      <HeaderPresenter/>
      <HomePresenter/>
    </html>
  );
}

export default App;
