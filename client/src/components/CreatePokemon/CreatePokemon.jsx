import React,{useState,useEffect} from "react";
import s from './CreatePokemon.module.css';
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { postPokemon,getTypes} from "../../redux/actions";


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

    const validateImage = (e) =>{
        if(e.target.value.length > 1234){
            setError(`La url de la imagen no puede tener mas de 1234 caracteres`);
        }else{
            setError('');
        }
        handleOnChange(e);
    };

    const validateStats = (e) => {
        if(Number(e.target.value) > 120 || Number(e.target.value) < 0) {
          setError(`La estadistica ${e.target.name} no puede ser menor a 0 o mayor a 120 `);
        } else {
          setError('');
        }
        handleOnChange(e);
      };

      const validateHeight = (e) => {
        if(Number(e.target.value) > 36 || Number(e.target.value) < 0) {
          setError(`La altura del pokemon no puede ser menor a 0 o mayor a 36`);
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
        dispatch(postPokemon({...formDetails,name:formDetails.name.toLowerCase()}));
        history.push('/home');
    };

    useEffect(() =>{
        if(!pokemonsTypes.length) dispatch(getTypes());  
    },[]) // eslint-disable-line 

    return(
        <div className={s.container_create}>
            <Link to='/home'> <button>Volvete al Home</button> </Link>
            <form onSubmit={handleSubmit} className={s.create_form}>
            <div className={s.name_img}>
                <label className={s.grid_label}>Nombre:</label>
                <input className={`${s.input} ${s.input_name} ${error.includes('nombre') ? `${s.danger_name}` : ''}`} type="text" name='name' placeholder="nombre" value={formDetails.name} onChange={validateName}/>
                { error.includes('nombre') ? <span className={s.error_span}>{error}</span> : null} 
                <label className={s.grid_label}>Imagen:</label>
                <input className={`${s.input} ${error.includes('imagen') ? `${s.danger_img}` : ''}`} type="url" name='img' placeholder="Ingrese la url de la imagen que quiera guardar" value={formDetails.img} onChange={validateImage}/>
                {error.includes('imagen') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.types}>
                <label className={s.grid_label}>Tipos:</label>
                    {pokemonsTypes.map(el =>(
                        <div key={el.id} className={s.type_grid}>
                            <label className={s.container}>
                                {el.name}<input type="checkbox" name={el.name} value={el.name} onClick={handleTypes}/>
                                        <div className={s.checkmark}></div>
                            </label>
                        </div>
                    ))}  
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Vida:</label>
                <input className={`${s.input} ${error.includes('health') ? `${s.danger_hp}` : ''}`} type="number" name='health' placeholder="Vida" value={formDetails.health} onChange={validateStats}/>
                {error.includes('health') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Fuerza:</label>
                <input className={`${s.input} ${error.includes('attack') ? `${s.danger_atck}` : ''}`} type="number" name='attack' placeholder="Fuerza" value={formDetails.attack} onChange={validateStats}/>
                {error.includes('attack') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Defensa:</label>
                <input className={`${s.input} ${error.includes('defense') ? `${s.danger_def}` : ''}`} type="number" name='defense' placeholder="Defensa" value={formDetails.defense} onChange={validateStats}/>
                {error.includes('defense') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Velocidad:</label>
                <input className={`${s.input} ${error.includes('speed') ? `${s.danger_speed}` : ''}`} type="number" name='speed' placeholder="Velocidad" value={formDetails.speed} onChange={validateStats}/>
                {error.includes('speed') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Altura:</label>
                <input className={`${s.input} ${error.includes('altura') ? `${s.danger_height}` : ''}`} type="number" name='height' placeholder="Altura" value={formDetails.height} onChange={validateHeight}/>
                {error.includes('altura') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Peso:</label>
                <input className={`${s.input} ${error.includes('weight') ? `${s.danger_weight}` : ''}`} type="number" name='weight' placeholder="Peso" value={formDetails.weight} onChange={handleOnChange}/>
                {error.includes('weight') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.div_submit}><button type="submit" disabled={!!error || shoulDisabled}> Crear Pokemon</button></div>
        </form>
        </div>
    )
}


// let a = 'pepe tronpppp' 
// let b = `${a.includes('pepe') ? 'logrado' : 'negatorio'}`
//let c = `${a.includes('asd') ? 'logrado' : 'negatorio'}`