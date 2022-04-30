import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav({handleSearched}){
    return (
        <div>
            <header>
                <nav>
                    <Link exact to="/" >Home</Link>
                    <Link exact to="/createPokemon">Crear Pokemon</Link>
                    <SearchBar handleSearched={handleSearched}/>
                </nav>
        </header>
        </div>
    )
};