import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getPokemons } from '../../redux/actions';

export default function InitPage(){
    const dispatch = useDispatch();
    const handleClick = () =>{
        dispatch(getPokemons());
    };
    return (
        <div>
            <Link to='/home'><button onClick={handleClick}>Ingresa a la Pokedex</button></Link>
        </div>
    )
};