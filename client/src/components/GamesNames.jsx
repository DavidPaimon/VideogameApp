import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStates } from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import styles from "./styles/GamesName.module.css";

const GamesNames = () => {
  const dispatch = useDispatch();
  const gamesByName = useSelector((state) => state.getAllVideoGames);

  useEffect(() => {
    dispatch(deleteStates());
  }, [dispatch]);

  if (!gamesByName) {
    return null;
  }

  return (
    <div className={styles.gamesNamesContainer}>
      <SearchBar className={styles.searchBar} />
      <h1 className={styles.gamesTitle}>Juegos por nombres</h1>
      <Link to="/home" className={styles.homeButton}>
        Volver a Home
      </Link>
      <div className={styles.cardContainer}>
        {gamesByName.map((game) => (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.background_image}
            genres={game.genres}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesNames;
