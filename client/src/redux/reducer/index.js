// Define el estado inicial de la aplicación
const initialState = {
    videogames: [], // Almacena los videojuegos mostrados en la aplicación
    allVideogames: [], // Almacena todos los videojuegos obtenidos de la API
    genres: [], // Almacena los géneros de los videojuegos
    detail: [], // Almacena los detalles de un videojuego en particular
    createdVideogames: [] // Agrega un campo para almacenar los videojuegos creados
}

// Define el reducer que manejará las acciones y actualizará el estado en consecuencia
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload, // Actualiza los videojuegos mostrados
                allVideogames: action.payload // Actualiza todos los videojuegos obtenidos de la API
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload // Actualiza los géneros de los videojuegos
            }

        case 'FILTER_BY_GENRES':
            const allVideogames = state.allVideogames;
            const filteredGenre = action.payload === 'All' ? allVideogames : allVideogames.filter(v => v.genres?.find(v => v === action.payload));
            return {
                ...state,
                videogames: filteredGenre // Filtra los videojuegos por género y actualiza los videojuegos mostrados
            }

        case 'ORDER_BY_NAME':
            let orderAsc = state.videogames.slice().sort((a, b) => {
                let videogameA = a.name.toLowerCase();
                let videogameB = b.name.toLowerCase();

                if (videogameA > videogameB) return 1;

                if (videogameB > videogameA) return -1;

                return 0;
            })

            const allVideogames3 = state.allVideogames;
            const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse();

            return {
                ...state,
                videogames: action.payload === '' ? allVideogames3 : orderName // Ordena los videojuegos por nombre y actualiza los videojuegos mostrados
            }

        case 'ORDER_BY_RATING':
            let orderRatingAsc = state.videogames.slice().sort((a, b) => {

                if (Number(b.rating) > Number(a.rating)) return 1;

                if (Number(a.rating) > Number(b.rating)) return -1;

                return 0;
            })

            return {
                ...state,
                videogames: action.payload === 'asc' ? orderRatingAsc : orderRatingAsc.reverse() // Ordena los videojuegos por calificación y actualiza los videojuegos mostrados
            }

        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload // Actualiza los videojuegos mostrados por nombre
            }

        case 'GET_ID_VIDEOGAME':
            return {
                ...state,
                detail: action.payload // Actualiza los detalles del videojuego seleccionado
            }

        case 'FILTER_BY_DB':
            return {
                ...state,
                allVideogames: action.payload, // Actualiza todos los videojuegos obtenidos de la API filtrados por base de datos
            };

        case 'FILTER_BY_API':
            return {
                ...state,
                allVideogames: action.payload, // Actualiza todos los videojuegos obtenidos de la API filtrados por API
            };

            case 'ADD_CREATED_VIDEOGAME':
      return {
        ...state,
        createdVideogames: [...state.createdVideogames, action.payload] // Agrega el videojuego creado al estado
      };

        default:
            return state; // Devuelve el estado sin cambios para acciones no reconocidas
    }
}

export default rootReducer; // Exporta el reducer para ser utilizado en la configuración de Redux
