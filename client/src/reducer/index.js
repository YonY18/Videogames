const initialState = {
    games: [],
    allGames: [],
    genres: [],
    platforms: [],
    gamesDetails: [],
    gamesDelete: [],
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case 'GET_NAME_GAMES':
            return {
                ...state,
                games: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }
        case 'GET_DETAILS_GAMES':
            return {
                ...state,
                gamesDetails: action.payload
            }
        case "CLEAN_ID":
            return {
                ...state,
                gamesDetails: []
            }

        case 'FILTER_GAMES_BY_GENRES':
            const allStateGames = state.games
            const tempGames = allStateGames.filter(p => {
                if (p.genres) {
                    const genres = p.genre.map(p => p.name)
                    return genres.includes(action.payload)
                }
                if (p.genres) {
                    return p.genre.includes(action.payload)
                }
            })
            return {
                ...state,
                games: action.payload === 'sinFiltro' ? allStateGames : tempGames,
            }
        case 'FILTER_CREATED':
            const allGameApiDB = state.allGames
            const createFilter = action.payload === 'created' ? allGameApiDB.filter(p => p.createInDb) :
                state.allGames.filter(p => !p.createInDb)
            return {
                ...state,
                games: action.payload === 'all' ? allGameApiDB : createFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.games.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                games: sortedArr
            }
        case 'ORDER_BY_RATING':
            let RsortedArr = action.payload === 'rasd' ?
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                games: RsortedArr
            }
        case 'POST_GAMES':
            return {
                ...state
            }
        default:
            return state;
    }
}