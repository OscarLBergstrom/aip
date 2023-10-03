import HomeView from "../views/homeView";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";

interface HomePresenterProps {
  model: HaipModel;
}

const HomePresenter: React.FC<HomePresenterProps> = ({ model }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);

  useEffect(() => {
    const loggedInObserver = () => {
        setLoggedIn(model.loggedIn);
    };

    model.addObserver(loggedInObserver);
  }, [model]);

  const handleLogin = async () => {
    await model.handleLogin();
    document.location = model.urlResponse;
  };

  return <HomeView 
            onLogin={handleLogin} 
            loggedIn={loggedIn}
          />;
};

export default HomePresenter;
