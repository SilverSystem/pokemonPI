import { GET_POKEMONS,GET_POKEMON_DETAILS,CLEAR_DETAILS, POST_POKEMON,GET_TYPES,GET_POKEMON_NAME } from "./actionTypes";
import axios from 'axios';

export function getPokemons(){
    return async dispatch =>{
        try {
            const pokemons = (await axios.get('http://localhost:3001/pokemons')).data;
            dispatch({type: GET_POKEMONS,payload: pokemons})   
        } catch (error) {
            console.log('Error en action creator getPokemons');
            console.log(error);
        }
    }
};

export function getDetails(id){
    return async dispatch =>{
        try {
            const pokemon = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data;
            dispatch({type: GET_POKEMON_DETAILS,payload: pokemon})   
        } catch (error) {
            console.log('Error en action creator getDetails');
            console.log(error);
        }
    }
};

export function clearDetails(){
    return {type: CLEAR_DETAILS}
}

export function postPokemon (pokemon){
    return async dispatch =>{
        try {
            const pokemonWithId = (await axios.post('http://localhost:3001/pokemons',pokemon)).data;
            dispatch({type: POST_POKEMON,payload:pokemonWithId})
        } catch (error) {
            console.log('Error en action creator postPokemon');
            console.log(error);
        }
    };
} 

export function getTypes(){
    return async dispatch =>{
        try {
            const pokemonsTypes = (await axios.get('http://localhost:3001/tipos')).data;
            dispatch({type: GET_TYPES, payload: pokemonsTypes})
        } catch (error) {
            console.log('Error en action creator getTypes');
            console.log(error);
        }
    }
};

export function getByName(name){
    return async dispatch =>{
        try {
            const pokemon = (await axios.get(`http://localhost:3001/pokemons?name=${name}`)).data;
            dispatch({type: GET_POKEMON_NAME,payload:pokemon});
        } catch (error) {
            console.log('Error en action creator getByName');
            console.log(error);
        }
    }
}