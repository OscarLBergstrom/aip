import React from "react";
import "./assets/styles/app.scss";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./components/presenters/homePresenter";
import HeaderPresenter from "./components/presenters/headerPresenter";
import FooterPresenter from "./components/presenters/footerPresenter";
import PreviewPresenter from './components/presenters/previewPresenter';
import CreatePresenter from "./components/presenters/createPresenter";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <html className="app">
            <HeaderPresenter />
            <HomePresenter />
            {/* <PreviewPresenter/> */}
            <FooterPresenter />
          </html>
        }
      />
      <Route
        path="/create"
        element={
          <html className="app">
            <HeaderPresenter />
            <CreatePresenter />
            <FooterPresenter />
          </html>
        }
      />
    </Routes>
  );
};

export default App;
