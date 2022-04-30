import React from "react";


export default function Buttons({handleCreatedClicked,handleTypesClicked}){
    return (
        <div>
                <div>
                    <button onClick={handleTypesClicked}>Filtrar por Tipo</button>
                </div>
                <div>
                    <button onClick={handleCreatedClicked}>Mostrar solo los Pokemons Creados</button>
                </div>
                <div>
                    <button>Ordenar ascendentemente por Nombre</button>
                </div>
                <div>
                    <button>Ordenar descendentemente por Nombre</button>
                </div>
                <div>
                    <button>Ordenar ascendentemente por Fuerza</button>
                </div>
                <div>
                    <button>Ordenar descendentemente por Fuerza</button>
                </div>
            </div>
    )
}