import React from "react";
import { Link } from "react-router-dom";
import style from "./CardVg.module.css";
export default function CardVideogame({ name, genres, image, rating, id, createdInDb }) {

  return (
    <div className={style.div}>
      <Link to={`/videogame/${id}`}>
        <h3 className={style.title}>{name}</h3>
      </Link>

      <img className={style.imgs} src={image} alt="img not found" />

      <div className={style.afterImg}>
        <p className={style.text}>{genres.join(", ")}</p>
        <p
          className={style.rating}
          style={
            rating < 1
              ? { backgroundColor: "rgb(255, 77, 91)" }
              : rating < 4
              ? { backgroundColor: "rgb(253, 158, 81)" }
              : { backgroundColor: "rgb(4, 201, 4)" }
          }
        >
          {rating}
        </p>
      </div>

    </div>
  );
}
