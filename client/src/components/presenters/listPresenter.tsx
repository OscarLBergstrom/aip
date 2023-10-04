import ListView from "../views/listView";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";
import { Playlist } from "../../assets/utils/types";

interface ListPresenterProps {
  model: HaipModel;
}

const ListPresenter: React.FC<ListPresenterProps> = ({ model }) => {

    const [myPlaylists, setMyPlaylists] = useState<Playlist[]>(model.myPlaylists);

    useEffect( () => {
        const getMyPlaylists = async () => {
            await model.getPlaylists();
        }

        getMyPlaylists();
    }, []);

    const myPlaylistsObserver = () => {
        setMyPlaylists(model.myPlaylists);
    };
    
    model.addObserver(myPlaylistsObserver);
    
    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    const handleSelect = () => {
        redirect("/preview");
    }

    return (
        <ListView
            onSelect={handleSelect}
        />
    );
}

export default ListPresenter;