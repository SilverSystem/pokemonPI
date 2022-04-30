import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { postPokemon} from "../../redux/actions";


export default function CreatePokemon(){
    const [error, setError] = useState('');
    let [formDetails,setFormDetails] = useState({
        name:'',
        img:'',
        health:'',
        attack:'',
        defense:'',
        types: [],
        speed:'',
        height:'',
        weight:''
    });
    const dispatch = useDispatch();
    const pokemonsTypes = useSelector(state => state.pokemonsTypes);
    const history = useHistory();
    const shoulDisabled = !(formDetails.name && formDetails.img && formDetails.health && formDetails.attack && formDetails.defense && formDetails.speed && formDetails.height && formDetails.weight && formDetails.types.length);

    const handleOnChange= (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name] : e.target.value
        })
    };

    const handleTypes = (e) =>{
        if(formDetails.types.includes(e.target.value)){
            setFormDetails({
                ...formDetails,
                types : formDetails.types.filter(el => el !== e.target.value)
            })
        } else{
            setFormDetails({
                ...formDetails,
                types : [...formDetails.types,e.target.value]
            })
        }  
    };

    const validateStats = (e) => {
        if(Number(e.target.value) > 120) {
          setError(`La estadistica ${e.target.name} no puede ser mayor a 120`);
        } else {
          setError('');
        }
        handleOnChange(e);
      };

      const validateHeight = (e) => {
        if(Number(e.target.value) > 36) {
          setError(`La altura del pokemon no puede ser mayor a 36 pulgadas`);
        } else {
          setError('');
        }
        handleOnChange(e);
      };

    const validateName = (e) => {
        if(/\d/.test(e.target.value)) {
          setError(`El nombre del pokemon no puede contener numeros`);
        } else {
          setError('');
        }
        handleOnChange(e);
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(formDetails);
        dispatch(postPokemon(formDetails));
        history.push('/home');
    };


    return(
        <form onSubmit={handleSubmit}>
            <Link to='/home'>Volvete al Home</Link>
            <div>
                <label>Nombre:</label>
                <input className={error && 'danger'} type="text" name='name' placeholder="nombre" value={formDetails.name} onChange={validateName}/>
                { error.includes('nombre') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Imagen:</label>
                <input className={error && 'danger'} type="url" name='img' placeholder="Ingrese la url de la imagen que quiera guardar" value={formDetails.img} onChange={handleOnChange}/>
                {error.includes('img') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Tipos:</label>
                    {pokemonsTypes.map(el =>(
                        <div key={el.id}>
                            <input type="checkbox" name={el.name} value={el.name} onClick={handleTypes}/>
                            <label>{el.name}</label>
                        </div>
                    ))}
            </div>
            <div><h3>Estadisticas</h3></div>
            <div>
                <label>Vida:</label>
                <input className={error && 'danger'} type="number" name='health' placeholder="Vida" value={formDetails.health} onChange={validateStats}/>
                {error.includes('health') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Fuerza:</label>
                <input className={error && 'danger'} type="number" name='attack' placeholder="Fuerza" value={formDetails.attack} onChange={validateStats}/>
                {error.includes('attack') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Defensa:</label>
                <input className={error && 'danger'} type="number" name='defense' placeholder="Defensa" value={formDetails.defense} onChange={validateStats}/>
                {error.includes('defense') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Velocidad:</label>
                <input className={error && 'danger'} type="number" name='speed' placeholder="Velocidad" value={formDetails.speed} onChange={validateStats}/>
                {error.includes('speed') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Altura:</label>
                <input className={error && 'danger'} type="number" name='height' placeholder="Altura" value={formDetails.height} onChange={validateHeight}/>
                {error.includes('altura') ? <span>{error}</span> : null}
            </div>
            <div>
                <label>Peso:</label>
                <input className={error && 'danger'} type="number" name='weight' placeholder="Peso" value={formDetails.weight} onChange={handleOnChange}/>
                {error.includes('weight') ? <span>{error}</span> : null}
            </div>
            <div><input type="submit"  value="Crear Pokemon" disabled={!!error || shoulDisabled}/></div>
        </form>
    )
}

                /* <select name="types">
                    {pokemonsTypes.map(el => <option key={el.id}value={el.name} name={el.name}>{el.name}</option>)}
                </select> */