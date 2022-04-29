import React from 'react';
import { Link } from 'react-router-dom';

export default function InitPage(){
    return (
        <div>
            <Link to='/home'><button >Ingresa a la Pokedex</button></Link>
        </div>
    )
};