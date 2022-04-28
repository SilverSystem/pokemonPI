import React from "react";
import { Link } from "react-router-dom";


export default function CreatePokemon(){

    return(
        <form>
            <Link to='/home'>Volvete al Home</Link>
            <div>
                <label>Nombre:</label>
                <input type="text" placeholder="nombre"/>
            </div>
            <div>
                <label>Imagen:</label>
                <input type="text" placeholder="Ingrese la url de la imagen que quiera guardar"/>
            </div>
            <div>
                <label>Tipos:</label>
                <input type="text" placeholder="tipos"/> {/* esto deberia ser un select o algo asi */}
            </div>
            <div><h3>Estadisticas</h3></div>
            <div>
                <label>Vida:</label>
                <input type="number" placeholder="Vida"/>
            </div>
            <div>
                <label>Fuerza:</label>
                <input type="number" placeholder="Fuerza"/>
            </div>
            <div>
                <label>Defensa:</label>
                <input type="number" placeholder="Defensa"/>
            </div>
            <div>
                <label>Velocidad:</label>
                <input type="number" placeholder="Velocidad"/>
            </div>
            <div>
                <label>Altura:</label>
                <input type="number" placeholder="Altura"/>
            </div>
            <div>
                <label>Peso:</label>
                <input type="number" placeholder="Peso"/>
            </div>
            <div><input type="submit" value="Crear Pokemon"/></div>
        </form>
    )
}