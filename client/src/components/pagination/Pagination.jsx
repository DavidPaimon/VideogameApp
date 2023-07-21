import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({ videogamesPerPage, allVideogames, pagination, currentPage }) {
  const pageNumbers = [];

  // Calcula el número total de páginas requeridas según la cantidad de videojuegos y la cantidad de videojuegos por página
  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1); // Agrega los números de página al arreglo pageNumbers
  }

  return (
    <nav>
      <ul className={style.button}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div key={number}>
              {/* Renderiza un botón por cada número de página */}
              <button
                onClick={() => pagination(number)} // Llama a la función pagination cuando se hace clic en el botón
                className={style.eachBtn}
                // Aplica estilos condicionales al botón si es la página actual
                style={
                  currentPage === number
                    ? {
                        backgroundColor: "#280783",
                        color: "white",
                        borderColor: "white",
                        fontSize: "20px",
                      }
                    : undefined
                }
              >
                {number}
              </button>
            </div>
          ))}
      </ul>
    </nav>
  );
}


//este codigo muestra los botones de paginación en la página de inicio y permite al usuario navegar entre las diferentes páginas de videojuegos.