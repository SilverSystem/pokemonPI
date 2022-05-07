import React from 'react';
import s from './Nav.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav({handleSearched}){
    return (
        <div className={s.header_container}>
            <header>
                <nav>
                    <h1>Pokemons</h1>
                    {/* <Link exact to="/" className={s.link}>Home</Link> */}
                    <Link exact to="/createPokemon" className={s.link}>Crear Pokemon</Link>
                    <SearchBar handleSearched={handleSearched}/>
                </nav>
        </header>
        </div>
    )
};