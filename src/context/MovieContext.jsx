import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // Local Storage - for favorites.
  useEffect(() => {
    // check for favorites.
    const StoredFavorites = localStorage.getItem("favorites");
    // IF EXIST -[Set Favorite Items]
    if (StoredFavorites) setFavorites(JSON.parse(StoredFavorites));
  }, []);

  // Any time the favorite-State changes, It updated in the local-storage.
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((previousList) => [...previousList, movie]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((item) => item.id !== movie.id));
  };

  const isFavorite = (movie) => {
    return favorites.some((item) => item.id === movie.id);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
