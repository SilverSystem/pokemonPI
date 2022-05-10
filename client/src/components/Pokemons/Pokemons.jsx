import React,{useState, useEffect} from 'react';
import s from './Pokemons.module.css'
import { useSelector,useDispatch } from 'react-redux';
import Pokemon from '../Pokemon/Pokemon';
import { getPokemons,getTypes } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import SearchError from '../SearchError/SearchError';

export default function Pokemons({listCreatedPokemons,listTypes,searched,nameOrdered,attackOrdered}){
     const pokemons = useSelector(state => state.pokemons);
     const createdPokemons = useSelector(state => state.createdPokemons);
     const pokemonsTypes = useSelector(state => state.filteredTypes);
     const searchedPokemon = useSelector(state => state.pokemonDetail);
     const error = useSelector(state => state.error);
     const dispatch = useDispatch();
     const filledTypes = !!pokemonsTypes.length;
     const filledState = !!pokemons.length;

     const [currentPage,setCurrentPage] = useState(1);
     const pokemonsPerPage = 12;
     const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    useEffect(() =>{
          if(!filledTypes) dispatch(getTypes()); 
          if(!filledState) dispatch(getPokemons());
    },[]) // eslint-disable-line 

    if(listTypes > -1){
     if(pokemonsTypes[listTypes].length === 0) return <div className={s.container_types}> 
          <img src="https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif" alt="sad pikachu" />
          <h3>There are no Pokemons with that type</h3>
     </div> 
     
     if(nameOrdered === 'asc'){
          const nameOrderedPokemons = pokemonsTypes[listTypes].map(p => p);
          nameOrderedPokemons.sort((a, b) => {
               if (a.name > b.name) return 1;
               if (a.name < b.name) return -1;
               return 0;
          });
          const currentPokemons = nameOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemonsTypes[listTypes].length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    } else if(nameOrdered === 'des'){
          const nameOrderedPokemons = pokemonsTypes[listTypes].map(p => p);
          nameOrderedPokemons.sort((a, b) => {
               if (a.name > b.name) return -1;
               if (a.name < b.name) return 1;
               return 0;
          });
          const currentPokemons = nameOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemonsTypes[listTypes].length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    }

    if(attackOrdered === 'asc'){
     const attackOrderedPokemons = new Array(...pokemonsTypes[listTypes]);
     attackOrderedPokemons.sort((a, b) => {
          if (a.attack > b.attack) return 1;
          if (a.attack < b.attack) return -1;
          return 0;
     });
     const currentPokemons = attackOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
     return <div>
               <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemonsTypes[listTypes].length} paginate={paginate}/>
               <div className={s.container_paginated_pokemons}>
               {
                  currentPokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
               }
               </div>
            </div>
     } else if(attackOrdered === 'des'){
     const attackOrderedPokemons = new Array(...pokemonsTypes[listTypes]);
     attackOrderedPokemons.sort((a, b) => {
          if (a.attack > b.attack) return -1;
          if (a.attack < b.attack) return 1;
          return 0;
     });
     const currentPokemons = attackOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
     return <div>
               <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemonsTypes[listTypes].length} paginate={paginate}/>
               <div className={s.container_paginated_pokemons}>
               {
                  currentPokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
               }
               </div>
            </div>
}

     return <div className={s.container_types}>
          {console.log('Pokemones',pokemonsTypes[listTypes])}
               {
                    filledTypes ? pokemonsTypes[listTypes].map(p =>
                         <Pokemon key={p.id} id={p.id} img={p.img} name={p.name} types={p.types} attack={p.attack}/>
                    ) 
                    : <div className={s.loading}> <div className={s.loader}></div></div>
               }
            </div>
    }

    if(listCreatedPokemons){
         return <div className={s.container_created}>
                    {
                         createdPokemons.length ? createdPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/> ) 
                         : <div className={s.container_created}> 
                              <img src="https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif" alt="sad pikachu" />
                              <h3>There are no created Pokemons</h3> 
                         </div>
                    }
               </div>
    }

    if(searched){
          return <div className={s.container_searched}>
                    { error.hasError ? <SearchError/> : Object.keys(searchedPokemon).length ? <Pokemon key={searchedPokemon.id} id={searchedPokemon.id} img={searchedPokemon.img} 
                    name={searchedPokemon.name} types={searchedPokemon.types} attack={searchedPokemon.attack} quantity={1}/> : 
                    <div className={s.loading}> <div className={s.loader}></div> </div> }
                 </div>
    }
    
    if(nameOrdered === 'asc'){
          const nameOrderedPokemons = pokemons.map(p => p);
          nameOrderedPokemons.sort((a, b) => {
               if (a.name > b.name) return 1;
               if (a.name < b.name) return -1;
               return 0;
          });
          const currentPokemons = nameOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    } else if(nameOrdered === 'des'){
          const nameOrderedPokemons = pokemons.map(p => p);
          nameOrderedPokemons.sort((a, b) => {
               if (a.name > b.name) return -1;
               if (a.name < b.name) return 1;
               return 0;
          });
          const currentPokemons = nameOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    }

    if(attackOrdered === 'asc'){
          const attackOrderedPokemons = new Array(...pokemons);
          attackOrderedPokemons.sort((a, b) => {
               if (a.attack > b.attack) return 1;
               if (a.attack < b.attack) return -1;
               return 0;
          });
          const currentPokemons = attackOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    } else if(attackOrdered === 'des'){
          const attackOrderedPokemons = new Array(...pokemons);
          attackOrderedPokemons.sort((a, b) => {
               if (a.attack > b.attack) return -1;
               if (a.attack < b.attack) return 1;
               return 0;
          });
          const currentPokemons = attackOrderedPokemons.slice(indexOFirstPokemon,indexOfLastPokemon);
          return <div>
                    <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>
                    <div className={s.container_paginated_pokemons}>
                    {
                       currentPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    }
                    </div>
                 </div>
    }

    const currentPokemons = pokemons.slice(indexOFirstPokemon,indexOfLastPokemon); 
    return <div>
               {filledState && <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>}
               <div className={s.container_paginated_pokemons}>
               {
                    filledState ? currentPokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                     : <div className={s.loading}> <div className={s.loader}></div> </div>
               }
               </div>
           </div>
};