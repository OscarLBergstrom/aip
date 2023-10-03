import ListView from "../views/listView";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";

interface ListPresenterProps {
  model: HaipModel;
}

const ListPresenter: React.FC<ListPresenterProps> = ({ model }) => {
    
    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    const handleSelect = () => {
        redirect("/preview");
    }

    model.getPlaylists();

    return (
        <ListView
            onSelect={handleSelect}
        />
    );
}

export default ListPresenter;