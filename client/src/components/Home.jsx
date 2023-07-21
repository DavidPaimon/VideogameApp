import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStates,
  getAllGames,
  filterGenres,
  getGamesByOrigin,
  getGenres,
  orderAlphabetically,
  orderByRating,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './styles/Home.module.css';
import Nav from './Nav';

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  console.log(allVideogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPP] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPP;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPP;
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    dispatch(getGenres());
    const vg = allVideogames && allVideogames;
    if (vg.length === 0) {
      dispatch(getAllGames());
    }
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  }, [allVideogames, indexOfFirstVideogame, indexOfLastVideogame, dispatch]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
    localStorage.setItem('currentPage', pageNumbers.toString());
  };

  const handleOrderAlphabetically = (event) => {
    event.preventDefault();
    dispatch(orderAlphabetically(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleOrderRating = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleFilterGenres = (event) => {
    event.preventDefault();
    dispatch(filterGenres(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleGamesByOrigin = (event) => {
    event.preventDefault();
    dispatch(getGamesByOrigin(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const clearFilter = (event) => {
    dispatch(deleteStates());
  };

  return (
    <div className={styles.homeContainer}>
      <Nav />
      <h1>VideoGame information</h1>

      <div>
        <select onChange={handleOrderAlphabetically}>
          <option>Orden</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select onChange={handleOrderRating}>
          <option>Rating</option>
          <option value="max">Mas Popular</option>
          <option value="min">Menos Popular</option>
        </select>

        <select onChange={handleFilterGenres} defaultValue={'default'}>
          <option value="default" disabled>Genres</option>
          {genres?.map((el, i) => (
            <option key={i} value={el}>
              {el}
            </option>
          ))}
        </select>

        <select onClick={handleGamesByOrigin}>
          <option>Filter</option>
          <option value="All">Todos los Games</option>
          <option value="Created">Mis Games</option>
          <option value="From Api">Api Games</option>
        </select>

        <button onClick={clearFilter} className={styles.button}>
          Limpiar Filtros
        </button>

        <Paginado
          videogamesPP={videogamesPP}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <div className={styles.container}>
          {current.length > 0 &&
            current.map((el) => (
              <div key={el.id} className={styles.card}>
                <Card
                  id={el.id}
                  name={el.name}
                  image={el.background_image}
                  genres={
                    isNaN(el.id) ? '' : el.genres.join(" - ")
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
