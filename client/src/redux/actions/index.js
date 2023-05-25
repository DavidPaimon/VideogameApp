import axios from "axios";

// Obtiene todos los videojuegos
export function getVideogames() {
    return function(dispatch) {
        axios.get("/videogames")
            .then(response => {
                return dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}

// Obtiene videojuegos por nombre
export function getVideogamesByName(payload) {
    return function(dispatch) {
        axios.get(`/videogames?name=${payload}`)
            .then(response => {
                return dispatch({
                    type: 'GET_NAME_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}

// Obtiene un videojuego por su ID
export function getVideogameById(payload) {
    return function(dispatch) {
        axios.get(`/videogame/${payload}`)
            .then(response => {
                return dispatch({
                    type: 'GET_ID_VIDEOGAME',
                    payload: response.data
                })
            })
    }
}

// Limpia los datos de un videojuego
export function clearVideogame() {
    return function(dispatch) {
        return dispatch({
            type: 'GET_ID_VIDEOGAME',
            payload: []
        })
    }
}

// Crea un nuevo videojuego
export function postVideogames(payload) {
    return function() {
        axios.post("/videogames", payload)
            .then(response => {
                return response
            })
    }
}

// Obtiene los géneros de los videojuegos
export function getGenres() {
    return function(dispatch) {
        axios.get("/genres")
            .then(response => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: response.data
                })
            })
    }
}

// Filtra los videojuegos por género
export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}

// Filtra los videojuegos por origen (API o base de datos)
export const filterByApi = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/videogames');
        const allVideogames = apiData.data;
        const allVideogamesApi = allVideogames.filter((vg) => typeof vg.id === 'number');
        dispatch({ type: 'FILTER_BY_API', payload: allVideogamesApi });
    };
};

export const filterByDb = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/videogames');
        const createdVideogames = apiData.data;
        const createdVideogamesDb = createdVideogames.filter((vg) => typeof vg.id === 'string');
        dispatch({ type: 'FILTER_BY_DB', payload: createdVideogamesDb });
    };
};

// Filtra los videojuegos por creado por el usuario o por la API
export function filterByCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

// Ordena los videojuegos por nombre
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

// Ordena los videojuegos por calificación
export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function addCreatedVideogame(payload) {
    return {
      type: 'ADD_CREATED_VIDEOGAME',
      payload
    };
  }