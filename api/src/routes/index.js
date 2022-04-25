const { default: axios } = require('axios');
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons',async (req,res) =>{
    try {
        const allData = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data;
        let pokemons = allData.results.map(el => axios.get(el.url));
        const pokemonsData = await Promise.all(pokemons);
        pokemonsData = pokemonsData.map(el => {
            let {name,types} = el.data;
            types = types.map(el => el.type.name);
            return{name,types}
        });
        res.json(pokemonsData);
    } catch (error) {
        console.log(error);   
    }
});

router.get('/pokemons/:idPokemon',async (req,res) =>{
    try {
        const {idPokemon} = req.params;
        const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
        const {name,types,stats,weight,height} = pokemon;
        types = types.map(el => el.type.name);
        const health = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const speed = stats[5].base_stat;
        res.json({id:idPokemon, name, types, health, attack, defense, speed, weight, height});
    } catch (error) {
        console.log(error);
    }    
});

router.get('/pokemons',async (req,res) =>{
    try {
    
    } catch (error) {
        console.log(error);
    }    
});

router.post('/pokemons',async (req,res) =>{
    try {
    
    } catch (error) {
        console.log(error);
    }    
});

router.get('/types',async (req,res) =>{
    try {
    
    } catch (error) {
        console.log(error);
    }    
});


module.exports = router;
