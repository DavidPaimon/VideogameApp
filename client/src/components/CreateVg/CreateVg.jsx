import React, { useState, useEffect } from "react";
import { getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./CreateVg.module.css";
import axios from "axios";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const platformsApi = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "PlayStation 3",
    "Xbox One",
    "Xbox Series S/X",
    "Xbox 360",
    "Xbox",
    "Nintendo Switch",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "iOS",
    "Android",
    "Windows",
    "macOS",
    "Linux"
  ];

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: []
  });

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handlerSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value]
    });
  }

  function handlerDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== el)
    });
  }

  function handlerSelectGenres(e) {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value]
    });
  }

  function handlerDeleteGenres(el) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== el)
    });
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/videogames", input);
      alert("Formulario enviado correctamente");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const validateForm = () => {
    // Realiza las validaciones aquí antes de enviar el formulario
    if (!input.name) {
      alert("Debe ingresar un nombre");
      return false;
    }

    if (!input.description) {
      alert("Debe ingresar una descripción");
      return false;
    }

    if (!input.released) {
      alert("Debe ingresar una fecha de lanzamiento");
      return false;
    }

    if (!input.rating) {
      alert("Debe ingresar una calificación");
      return false;
    }

    if (input.platforms.length === 0) {
      alert("Debe seleccionar al menos una plataforma");
      return false;
    }

    if (input.genres.length === 0) {
      alert("Debe seleccionar al menos un género");
      return false;
    }

    return true;
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={style.divGeneral}>
      <Nav />

      <div className={style.divCreate}>
        <h1 className={style.title}>New Videogame</h1>

        <form onSubmit={handlerSubmit}>
          <div className={style.data}>
            <div className={style.firstColumn}>
              <div>
                <label>Name:</label>
                <br />
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handlerChange}
                  required={true}
                  placeholder="Videogame"
                  className={style.input}
                />
              </div>

              <br />

              <div>
                <label>Description:</label>
                <br />
                <textarea
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={handlerChange}
                  required={true}
                  placeholder="Enter a description"
                  className={style.inputDescription}
                />
              </div>

              <br />

              <div>
                <label>Image:</label>
                <br />
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={handlerChange}
                  placeholder="Img URL"
                  className={style.input}
                />
              </div>
            </div>

            <div className={style.secondColumn}>
              <div>
                <label>Released:</label>
                <br />
                <input
                  type="date"
                  value={input.released}
                  name="released"
                  onChange={handlerChange}
                  className={style.input}
                  required={true}
                />
              </div>

              <br />

              <div>
                <label>Platforms:</label>
                <br />
                <select
                  className={style.input}
                  required={true}
                  onChange={handlerSelectPlatforms}
                >
                  <option value="">Choose 1 or more</option>
                  {platformsApi.map((p, index) => (
                    <option key={index} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {input.platforms.map((el, index) => (
                  <div key={index} className={style.divMultiSelect}>
                    <p className={style.multiSelect}>{el}</p>
                    <button
                      className={style.btnMultiSelect}
                      onClick={() => handlerDeletePlatforms(el)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div>
                <label>Rating:</label>
                <br />
                <input
                  type="number"
                  value={input.rating}
                  name="rating"
                  onChange={handlerChange}
                  className={style.input}
                  id={style.inputRating}
                  step={0.01}
                  placeholder="0.00 - 5.00"
                  min={0.0}
                  max={5}
                  required={true}
                />
              </div>

              <br />

              <div>
                <label>Genres:</label>
                <br />
                <select
                  className={style.selectGenres}
                  onChange={handlerSelectGenres}
                >
                  <option value="">Choose 1 or more</option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>

                {input.genres.map((el, index) => (
                  <div key={index} className={style.divMultiSelect}>
                    <p className={style.multiSelect}>{el}</p>
                    <button
                      className={style.btnMultiSelect}
                      onClick={() => handlerDeleteGenres(el)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className={style.btn} type="submit" onClick={validateForm}>
            Create Videogame
          </button>
        </form>
      </div>
    </div>
  );
}
