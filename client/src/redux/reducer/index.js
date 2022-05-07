import { GET_POKEMONS,GET_POKEMON_DETAILS,CLEAR_DETAILS,POST_POKEMON, GET_TYPES,GET_POKEMON_NAME,SHOW_ERROR} from "../actions/actionTypes";

const initialState ={
    pokemons: [],
    createdPokemons:[],
    pokemonsTypes:[],
    pokemonDetail:{},
    error:{hasError: false}
}
export default function reducer(state= initialState,action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: [...action.payload],
                createdPokemons: action.payload.filter(el => /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(el.id))
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
                pokemonDetail: {},
                error: {hasError:false}
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
            
        case SHOW_ERROR:
            return{
                ...state,
                error: {hasError:true,errorDetails:action.payload}
            }
        
        default: return state;
    }
}