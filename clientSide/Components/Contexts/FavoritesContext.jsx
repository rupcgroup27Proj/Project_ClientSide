import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useAPI } from "./APIContext";


//--------------| Used for updating the favorites list |--------------//

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default function FavoritesProvider({ children }) {

  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const [favorite, setFavorite] = useState([]);


  //--------------| Functions |--------------//
  useEffect(() => {
    userFavorites();
  }, []);


  //Get user's favs
  const userFavorites = async () => {
    axios.get(`${simulatorAPI}/api/FavList/studentId/${currentUser.id}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };
  //--------------| End of functions |--------------//


  const value = {
    favorite,
    userFavorites
  };


  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
