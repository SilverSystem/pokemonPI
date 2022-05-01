import React from "react";



export default function Buttons({handleCreatedClicked,handleTypesClicked,handleNameOrdered,handleAttackOrdered,handleSearched}){
    const clearFilters = () => {
        handleTypesClicked(false)
        handleCreatedClicked(false)
        handleNameOrdered('')
        handleAttackOrdered('')
        handleSearched('');
    };
    return (
        <div>
                <div>
                    <button onClick={handleTypesClicked}>Filtrar por Tipo</button>
                </div>
                <div>
                    <button onClick={handleCreatedClicked}>Mostrar solo los Pokemons Creados</button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleNameOrdered('asc')}}>Ordenar ascendentemente por Nombre</button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleNameOrdered('des')}}>Ordenar descendentemente por Nombre</button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleAttackOrdered('asc')}}>Ordenar ascendentemente por Fuerza</button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleAttackOrdered('des')}}>Ordenar descendentemente por Fuerza</button>
                </div>
                <div>
                    <button onClick={clearFilters}>Limpiar Filtros</button>
                </div>
            </div>
    )
}