import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGenres, DB_API } from "../../redux/actions/index";
import style from "./Filters.module.css";

export default function Filters({ handlerGenres, handlerCreated, genrechange }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(GetGenres());
  }, [dispatch]);

  return (
    <div className={style.divSourceGenres}>
      <div className={style.divSource}>
        <p className={style.titles}>SOURCE</p>
        <div className={style.divSource}>
          <button
            className={style.source}
            onClick={() => handlerCreated("All")}
          >
            ALL
          </button>
          <button
            className={style.source}
            onClick={() => dispatch(DB_API())}
          >
            API
          </button>
          <button
            className={style.source}
            onClick={() => dispatch(DB_API())}
          >
            DATABASE
          </button>
        </div>
      </div>

      <div>
        <p className={style.titles}>GENRES</p>
        <select
          value={genrechange}
          onChange={(e) => handlerGenres(e)}
          className={style.select}
        >
          <option value="">--Select--</option>
          <option value="All">All</option>
          {genres &&
            genres.map((g) => (
              <option value={g.name} key={g.id}>
                {g.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
