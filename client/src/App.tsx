import React from "react";
import "./assets/styles/app.scss";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./components/presenters/homePresenter";
import HeaderPresenter from "./components/presenters/headerPresenter";
import FooterPresenter from "./components/presenters/footerPresenter";
import PreviewPresenter from './components/presenters/previewPresenter';
import CreatePresenter from "./components/presenters/createPresenter";
import HaipModel from "./models/model";

const App = () => {
  const haipModel = new HaipModel();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <HeaderPresenter />
            <HomePresenter />
            <FooterPresenter />
          </div>
        }
      />
      <Route
        path="/create"
        element={
          <div className="app">
            <HeaderPresenter />
            <CreatePresenter model={haipModel}/>
            <FooterPresenter />
          </div>
        }
      />
      <Route
        path="/preview"
        element={
          <div className="app">
            <HeaderPresenter />
            <PreviewPresenter/>
            <FooterPresenter />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
