import React from "react";
import { Link } from "react-router-dom";
// deberia recibir currentPage asi al mapear hacer un if de si pageNumber igual currentPage,
// aniadirle un estilo para resaltar que estoy en tal page
// o user el estado active del li con css
export default function Pagination({pokemonsPerPage,totalPokemons,paginate}){ 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul>
                {pageNumbers.map(pageNumber => <li key={pageNumber}> <Link to={`/home/${pageNumber}`}onClick={() => paginate(pageNumber)}>{pageNumber}</Link> </li>)}
            </ul>
        </div>
    )
}