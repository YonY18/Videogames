const initialState = {
    games : [],    
    allGames:[],
    genres:[],
    platforms:[],
    gamesDetails: [],
    gamesDelete: [],
}
export default function rootReducer(state =  initialState, action){
    switch(action.type){
        case 'GET_GAMES':
            return{
                ...state,
                games: action.payload,  
                allGames: action.payload
            }      
        case 'GET_NAME_GAMES':
            return{
                ...state,
                games: action.payload
            }      
        case 'GET_GENRES':            
            return{
                ...state,                
                genres: action.payload
            }  
        case 'GET_PLATFORMS':            
            return{
                ...state,                
                platforms: action.payload
            }
        case 'GET_DETAILS_GAMES':            
            return {
                ...state,
                gamesDetails: action.payload
            }



default:
    return state;
}
}