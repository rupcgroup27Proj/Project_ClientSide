import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useUser } from "./UserContext";
import { useAPI } from "./APIContext";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default function FavoritesProvider({ children }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    userFavorites();
  }, []);

  //get user's favs
  const userFavorites = async () => {
    axios.get(`${simulatorAPI}/api/FavList/studentId/${currentUser.id}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };

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
