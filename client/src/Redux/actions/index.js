import axios from 'axios';

export function getGames() {
    return async function (dispatch){
        const json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data,
        })
    }
}
export function getNameGames(name){
    return async function (dispatch){
        
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: 'GET_NAME_GAMES',
                payload: json.data
            })    
        }
}
export function getGenres(){
    return function (dispatch){
        axios.get("http://localhost:3001/genres")
        .then((generos) => {
            return dispatch ({
                type: 'GET_GENRE',
                payload: generos.data
            });
        })
        .catch((error) => console.log(error))
    }
}
export function getDetail(id){
    return function (dispatch){
        axios.get(`http://localhost:3001/videogames/${id}`)
    
        .then(game => {
            console.log(game.data)
            dispatch({
                type: 'GET_DETAIL',
                payload: game.data
            });
        })
        .catch((error) => console.log(error))
    }
}

export function filterByGenres(payload){
    return {
        type: 'FILTER_BY_GENRES',
        payload,
    }
}



export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload,
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload,
    }
}



export function postGame(payload){
    return async function (){
        try {
            const json = await axios.post("http://localhost:3001/videogame", payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export function vaciarDetail(payload){
    return {
        type: 'VACIAR_DETAIL',
        payload,
    }
}

export function clearGame(){
    let rest = [];
    return function(dispatch){
        dispatch({
            type: 'CLEAR_GAMES',
            payload: rest
        })
    }
}