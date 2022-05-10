import React,{useState,useEffect} from "react";
import s from './CreatePokemon.module.css';
import searchName from "./helpers";
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
    const pokemons = useSelector(state => state.pokemons);
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
            setError(`The image url can't have more then 1234 characters`);
        }else{
            setError('');
        }
        handleOnChange(e);
    };

    const validateStats = (e) => {
        if(Number(e.target.value) > 120 || Number(e.target.value) < 0) {
          setError(`The stat ${e.target.name} can't neither be lower then 0 nor greater then 120`);
        } else {
          setError('');
        }
        handleOnChange(e);
      };

      const validateHeight = (e) => {
        if(Number(e.target.value) > 36 || Number(e.target.value) < 0) {
          setError(`The height of a Pokemon can't neither be lower then 0 nor greater then 36`);
        } else {
          setError('');
        }
        handleOnChange(e);
      };

    const validateName = (e) => {
        if(/\d/.test(e.target.value)) {
          setError(`Pokemons name can't contain numbers`);
        } else {
          setError('');
        }
        handleOnChange(e);
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        if(!!error || shoulDisabled){ 
            setError('All fields must be completed correctly to send the form');
        } else{
            if(searchName(pokemons,formDetails.name.toLowerCase())){
                setError('That pokemon name already exists, please change the name');
            } else{
                dispatch(postPokemon({...formDetails,name:formDetails.name.toLowerCase()}));
                history.push('/home');
            }
        }    
    };

    useEffect(() =>{
        if(!pokemonsTypes.length) dispatch(getTypes());  
    },[]) // eslint-disable-line 

    return(
        <div className={s.container_create}>
            <Link to='/home'> <button>Back to Home</button> </Link>
            <form onSubmit={handleSubmit} className={s.create_form}>
            <div className={s.name_img}>
                <label className={s.grid_label}>Name:</label>
                <input className={`${s.input} ${s.input_name} ${error.includes('name') ? `${s.danger_name}` : ''}`} type="text" name='name' placeholder="name" value={formDetails.name} onChange={validateName}/>
                { error.includes('name') ? <span className={s.error_span}>{error}</span> : null} 
                <label className={s.grid_label}>Imagen:</label>
                <input className={`${s.input} ${error.includes('image') ? `${s.danger_img}` : ''}`} type="url" name='img' placeholder="Enter the image url" value={formDetails.img} onChange={validateImage}/>
                {error.includes('image') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.types}>
                <label className={s.grid_label}>Types:</label>
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
                <label className={s.stats_label}>Health:</label>
                <input className={`${s.input} ${error.includes('health') ? `${s.danger_hp}` : ''}`} type="number" name='health' placeholder="health" value={formDetails.health} onChange={validateStats}/>
                {error.includes('health') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Attack:</label>
                <input className={`${s.input} ${error.includes('attack') ? `${s.danger_atck}` : ''}`} type="number" name='attack' placeholder="attack" value={formDetails.attack} onChange={validateStats}/>
                {error.includes('attack') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Defense:</label>
                <input className={`${s.input} ${error.includes('defense') ? `${s.danger_def}` : ''}`} type="number" name='defense' placeholder="defense" value={formDetails.defense} onChange={validateStats}/>
                {error.includes('defense') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Speed:</label>
                <input className={`${s.input} ${error.includes('speed') ? `${s.danger_speed}` : ''}`} type="number" name='speed' placeholder="speed" value={formDetails.speed} onChange={validateStats}/>
                {error.includes('speed') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Height:</label>
                <input className={`${s.input} ${error.includes('height') ? `${s.danger_height}` : ''}`} type="number" name='height' placeholder="height" value={formDetails.height} onChange={validateHeight}/>
                {error.includes('height') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Weight:</label>
                <input className={`${s.input} ${error.includes('weight') ? `${s.danger_weight}` : ''}`} type="number" name='weight' placeholder="weight" value={formDetails.weight} onChange={handleOnChange}/>
                {error.includes('weight') ? <span className={s.error_span}>{error}</span> : null}
            </div>
            <div className={s.div_submit}><button type="submit" disabled={!!error || shoulDisabled}> Create Pokemon</button></div>
            {error.includes('fields') ? <span className={s.error_span}>{error}</span> : null}
        </form>
        </div>
    )
}