import React from 'react';
import Pokemon from '../Pokemon/Pokemon';

export default function Pokemons({pokemons}){
    return <div>
                {console.log('Console inicial',pokemons)}
               {
                    pokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types}/>) 
               }
            </div>
};