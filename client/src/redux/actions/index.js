import axios from "axios";

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


export function clearVideogame() {
    return function(dispatch) {
        return dispatch({
            type: 'GET_ID_VIDEOGAME',
            payload: []
        })
    }
}


export function postVideogames(payload) {
    return function() {
        axios.post("/videogames", payload)
            .then(response => {
                return response
            })
    }
}




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


export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}


export function filterByCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}


export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}
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
      const allVideogames = apiData.data;
      const allVideogamesDb = allVideogames.filter((vg) => typeof vg.id === 'string');
      dispatch({ type: 'FILTER_BY_DB', payload: allVideogamesDb });
    };
  };
  