import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav(){
    return (
        <div>
            <header>
                <nav>
                    <Link exact to="/" >Home</Link>
                    <Link exact to="/pokemons/create" >Crear Pokemon</Link>
                    <SearchBar/>
                </nav>
        </header>
        </div>
    )
};