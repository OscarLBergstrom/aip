import HomeView from "../views/homeView";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";
import { useInterval } from 'usehooks-ts'

interface HomePresenterProps {
  model: HaipModel;
}

const HomePresenter: React.FC<HomePresenterProps> = ({ model }) => {

  const h_words = ["Happy", "Hype", "Hungry", "Harmonious", "Hilarious", "Hopeful", "Honest", "Humble", "Handsome", "Hypnotic"];

  const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);
  const [haipWord, setHaipWord] = useState<string>(h_words[0]);
  const [count, setCount] = useState<number>(1);

  const loggedInObserver = () => {
    setLoggedIn(model.loggedIn);
  };

  model.addObserver(loggedInObserver);

  useInterval(() => {
    if (count < h_words.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
    setHaipWord(h_words[count]);
  }, 8000);

  const handleLogin = async () => {
    await model.handleLogin();
    document.location = model.urlResponse;
  };

  return <HomeView 
            onLogin={handleLogin} 
            loggedIn={loggedIn}
            haipWord={haipWord}
          />;
};

export default HomePresenter;
