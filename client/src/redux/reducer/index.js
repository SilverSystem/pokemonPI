import { GET_POKEMONS,GET_POKEMON_DETAILS,CLEAR_DETAILS,POST_POKEMON, GET_TYPES,GET_POKEMON_NAME} from "../actions/actionTypes";

const initialState ={
    pokemons: [],
    nameSortedPokemons:[],
    pokemonsTypes:[],
    pokemonDetail:{},
}
export default function reducer(state= initialState,action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: [...action.payload]
            }

        case GET_POKEMON_DETAILS:
        case GET_POKEMON_NAME:
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
                pokemons: [action.payload,...state.pokemons],
                createdPokemons: [...state.createdPokemons,action.payload]
            }

        case GET_TYPES:
            return{
                ...state,
                pokemonsTypes: [...state.pokemonsTypes,...action.payload]
            }  
   
        default: return state;
    }
}