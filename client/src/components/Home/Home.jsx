import React from 'react';
import Nav from '../Nav/Nav';
//import {Link} from 'react-router-dom';
import Pokemons from '../Pokemons/Pokemons';
import Buttons from '../Buttons/Buttons';

export default function Home(){
    return (
        <div>
            <Nav/>
            <Buttons/>
            {/*<Link to='/home'> Volver al home </Link>*/}
            <Pokemons/>
        </div>
    )
};


