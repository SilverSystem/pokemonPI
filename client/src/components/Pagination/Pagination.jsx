import React,{useEffect} from "react";
import s from './Pagination.module.css';
import { Link } from "react-router-dom";
// deberia recibir currentPage asi al mapear hacer un if de si pageNumber igual currentPage,
// aniadirle un estilo para resaltar que estoy en tal page
// o user el estado active del li con css
export default function Pagination({pokemonsPerPage,totalPokemons,paginate}){ 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() =>{
        return () => paginate(1)
    },[]) // eslint-disable-line
    return (
        <div className={s.container_pagination}>
            <ul>
                {pageNumbers.map(pageNumber => <li key={pageNumber}> <Link to ='/home' onClick={() => paginate(pageNumber)}>{pageNumber}</Link> </li>)}
            </ul>
        </div>
    )
}