import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearDetails,getDetails } from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function PokemonDetail(){
    const pokemonDetail = useSelector(state => state.pokemonDetail);
    const dispatch = useDispatch();
    const {idPokemon} = useParams();
    useEffect(()=>{
        dispatch(getDetails(idPokemon));
        return () => dispatch(clearDetails());
    },[]); // eslint-disable-line 
    return (
        <div>
            <Link to="/home"><button>Volver a Home</button></Link>
           {console.log('Console Detalles',pokemonDetail)}
           {
               pokemonDetail.name ?
               <div>
                   <h3>Nombre: {pokemonDetail.name}</h3>
                   <span><p>Número de Pokemon: {pokemonDetail.id}</p></span>
                   <span><p>Tipos: {pokemonDetail.types}</p></span>
                   <h5>Vida: {pokemonDetail.health}</h5>
                   <h5>Fuerza: {pokemonDetail.attack}</h5>
                   <h5>Defensa: {pokemonDetail.defense}</h5>
                   <h5>Velocidad: {pokemonDetail.speed}</h5>
                   <h5>Altura: {pokemonDetail.height}</h5>
                   <h5>Peso: {pokemonDetail.weight}</h5>
                   <div><img src={pokemonDetail.img} alt={pokemonDetail.name}/></div>
               </div> :  <h2>Cargando detalles...</h2>
           }
        </div>
    )
};
