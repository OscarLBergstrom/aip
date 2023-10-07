import ListView from "../views/listView";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";
import { Playlist } from "../../assets/utils/types";

interface ListPresenterProps {
  model: HaipModel;
}

const ListPresenter: React.FC<ListPresenterProps> = ({ model }) => {

    const [playlists, setPlaylists] = useState<Playlist[]>(model.playlists);

    useEffect( () => {
        const getPlaylists = async () => {
            await model.getPlaylists();
        }
        getPlaylists();
    }, []);

    const playlistsObserver = () => {
        setPlaylists(model.playlists);
    };
    
    model.addObserver(playlistsObserver);
    
    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    const handleSelect = (playlistID: string) => {
        model.selectPlaylist(playlistID);
        redirect("/preview");
    }

    return (
        <ListView
            onSelect={handleSelect}
            playlists={playlists}
        />
    );
}

export default ListPresenter;