import HomeView from "../views/homeView";
import LoadingView from "../views/loadingView";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

interface HomePresenterProps {
  model: HaipModel;
}

const HomePresenter: React.FC<HomePresenterProps> = ({ model }) => {
  const h_words = [
    "Happy",
    "Hype",
    "Hungry",
    "Harmonious",
    "Hilarious",
    "Hopeful",
    "Honest",
    "Humble",
    "Handsome",
    "Hypnotic",
  ];

  const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);
  const [haipWord, setHaipWord] = useState<string>(h_words[0]);
  const [count, setCount] = useState<number>(1);
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      //setLoading(true);
      await model.getUserDetails();
      //setLoading(false);
    };

    getUser();
  }, []);

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

  const goToCreate = () => {
    redirect("/create");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  };

  return (/* loading ? (
    <LoadingView />
  ) : ( */
    <HomeView
      onLogin={handleLogin}
      loggedIn={loggedIn}
      haipWord={haipWord}
      goToCreate={goToCreate}
    />
  );
};

export default HomePresenter;
