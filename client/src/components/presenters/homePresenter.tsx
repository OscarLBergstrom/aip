import HomeView from "../views/homeView";
import HaipModel from "../../models/model";

interface HomePresenterProps {
  model: HaipModel;
}

const HomePresenter: React.FC<HomePresenterProps> = ({ model }) => {
  const handleLogin = async () => {
    await model.handleLogin();
    document.location = model.urlResponse;
  };

  return <HomeView onLogin={handleLogin} />;
};

export default HomePresenter;
