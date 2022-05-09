import React,{useEffect} from 'react';
import s from './PokemonDetail.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearDetails,getDetails } from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function PokemonDetail(){
    const pokemonDetail = useSelector(state => state.pokemonDetail);
    const dispatch = useDispatch();
    const {idPokemon} = useParams();
    useEffect(()=>{
        if(Object.keys(pokemonDetail).length === 0) dispatch(getDetails(idPokemon));
        return () => dispatch(clearDetails());
    },[]); // eslint-disable-line 
    return (
        <div className={s.container}>
            <Link to="/home"><button>Back to Home</button></Link>
           {
               pokemonDetail.name ?
               <div className={s.container_details}>
                   <img src={pokemonDetail.img} alt={pokemonDetail.name}/>
                   <div className={s.pokemon_details}>
                   <h3>Name: <span>{pokemonDetail.name.charAt(0).toUpperCase() +pokemonDetail.name.slice(1)}</span></h3>
                        <h5>Pokemon Number: <span>{pokemonDetail.id}</span></h5>
                        <h5>Types: <span>{pokemonDetail.types.join(', ')}</span></h5>
                        <h5>Health: {pokemonDetail.health}</h5>
                        <h5>Attack: {pokemonDetail.attack}</h5>
                        <h5>Defense: {pokemonDetail.defense}</h5>
                        <h5>Speed: {pokemonDetail.speed}</h5>
                        <h5>Height: {pokemonDetail.height}</h5>
                        <h5>Weight: {pokemonDetail.weight}</h5>
                   </div>
               </div> :  <div className={s.loading}> <div className={s.loader}></div> </div>
           }
        </div>
    )
};
