import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch,useSelector } from 'react-redux';
import { getTypes } from '../../redux/actions';

export default function Nav(){
    const dispatch = useDispatch();
    const pokemonsTypes = useSelector(state => state.pokemonsTypes);
    const handleClick = () => pokemonsTypes.length ? null : dispatch(getTypes());
    return (
        <div>
            <header>
                <nav>
                    <Link exact to="/" >Home</Link>
                    <Link exact to="/createPokemon" onClick={handleClick}>Crear Pokemon</Link>
                    <SearchBar/>
                </nav>
        </header>
        </div>
    )
};