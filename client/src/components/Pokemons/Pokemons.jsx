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
     const pokemonsTypes = useSelector(state => state.pokemonsTypes);
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
     if(!filledState) dispatch(getPokemons());
     if(!filledTypes) dispatch(getTypes()); 
    },[]) // eslint-disable-line 

    if(listCreatedPokemons){
         return <div className={s.container_created}>
                    {
                         createdPokemons.length ? createdPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/> ) 
                         : <h3>No hay pokemones creados</h3>
                    }
               </div>
    }

    if(listTypes){
     let listedPokemons = [];
     for(let i = 0; i < pokemonsTypes.length;i++){
          listedPokemons.push([]);
          pokemons.forEach(p =>{
               if (p.types.includes(pokemonsTypes[i].name)) listedPokemons[i].push(p); 
          })
     }     
         return <div className={s.container_types}>
                    {
                         listedPokemons.length ? listedPokemons.map((type,index) => (
                              <div key={index} className={s.container_type_ind}>
                              {type.length ? <h4>{pokemonsTypes[index].name.charAt(0).toUpperCase() + pokemonsTypes[index].name.slice(1)}</h4> : null}
                              {
                                   type.length ? listedPokemons[index].map(p =>
                                        <Pokemon key={p.id} id={p.id} img={p.img} name={p.name} types={p.types} attack={p.attack}/>
                                   ) : null  
                              }
                              </div>
                         )) : <div className={s.loading}> <div className={s.loader}></div> </div>
                    }
               </div>
    }

    if(searched){
          console.log(searchedPokemon)
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
          console.log('Pepe',attackOrderedPokemons) 
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
          console.log(attackOrderedPokemons)
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
                {console.log('Console inicial',pokemons)}
               {
                    filledState ? currentPokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types} attack={el.attack}/>)  
                    : <div className={s.loading}> <div className={s.loader}></div> </div>
               }
               </div>
           </div>
};


// {filledState && !searched && <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate}/>}
//             {filledState ? <Pokemons listCreatedPokemons={createdClicked} listTypes={typesClicked} searched={searched}/> 
//             : <h2>Cargando...</h2>} 