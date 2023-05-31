import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/Landing.module.css';

export default function LandingPage() {
  return (
    <div className={style.divLP}>
      <div className={style.divTextBtn}>
        <h1 className={style.text}>
          WELCOME TO THE <br />
          VIDEOGAMES APP
        </h1>

        <Link to="/home">
          <button className={style.btn}>PRESS START</button>
        </Link>
      </div>
    </div>
  );
}