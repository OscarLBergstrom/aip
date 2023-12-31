import React from "react";
import "./assets/styles/app.scss";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./components/presenters/homePresenter";
import HeaderPresenter from "./components/presenters/headerPresenter";
import FooterPresenter from "./components/presenters/footerPresenter";
import PreviewPresenter from './components/presenters/previewPresenter';
import CreatePresenter from "./components/presenters/createPresenter";
import SidebarPresenter from "./components/presenters/sidebarPresenter";
import ListPresenter from "./components/presenters/listPresenter";
import LoadingPresenter from "./components/presenters/loadingPresenter";
import HaipModel from "./models/model";
import PrivateRoutes from "./utils/PrivateRoutes"

const App = () => {
  const haipModel = new HaipModel();
  return (
    <div className="app">
      <HeaderPresenter model={haipModel}/>
      <SidebarPresenter model={haipModel}/>
      <Routes>
        <Route element={<PrivateRoutes model={haipModel}/>}>
            <Route path='/preview' element={<PreviewPresenter model={haipModel}/>}/>
            <Route path="/list" element={<ListPresenter model={haipModel}/>}/>
            <Route path='/create' element={<CreatePresenter model={haipModel}/>}/>
        </Route>
        <Route path="/" element={<HomePresenter model={haipModel}/>}/>
        <Route path="/loading" element={<LoadingPresenter model={haipModel}/>}/>
      </Routes>
      <FooterPresenter />
    </div>
  );
};

export default App;
