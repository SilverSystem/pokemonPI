import React,{useState, useEffect} from 'react';
import Nav from '../Nav/Nav';
//import {Link} from 'react-router-dom';
import Pokemons from '../Pokemons/Pokemons';
import Buttons from '../Buttons/Buttons';
import {useSelector,useDispatch} from 'react-redux';
import { getPokemons } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';

export default function Home(){
    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();
    const filledState = !!pokemons.length;
    const [currentPage,setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOFirstPokemon,indexOfLastPokemon); 

    useEffect(() =>{
        if(!filledState) dispatch(getPokemons());  
    },[]) // eslint-disable-line 

    return (
        <div>
            {console.log('Render Home')}
            <Nav/>
            <Buttons/>
            {/*<Link to='/home'> Volver al home </Link>*/}
            {filledState && <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>}
            {filledState ? <Pokemons pokemons={currentPokemons}/> : <h2>Cargando...</h2>}
        </div>
    )
};


