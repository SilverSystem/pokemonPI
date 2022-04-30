import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { getTypes } from '../../redux/actions';

export default function InitPage(){
    const dispatch = useDispatch();
    const handleClick = () => dispatch(getTypes());
    return (
        <div>
            <Link to='/home' onClick={handleClick}><button >Ingresa a la Pokedex</button></Link>
        </div>
    )
};