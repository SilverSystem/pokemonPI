import { GET_POKEMONS,GET_POKEMONS_DETAILS,CLEAR_DETAILS,POST_POKEMON } from "../actions/actionTypes";

const initialState ={
    pokemons: [],
    pokemonDetail:{}
}
export default function reducer(state= initialState,action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons, ...action.payload]
            }

        case GET_POKEMONS_DETAILS:
            return {
                ...state,
                pokemonDetail: action.payload
            }
        
        case CLEAR_DETAILS:
            return{
                ...state,
                pokemonDetail: {}
            }
        
        case POST_POKEMON:
            return{
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }

        default: return state;
    }
}