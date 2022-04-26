const { default: axios } = require('axios');
const { Router } = require('express');
const {Pokemon, Type} = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons',async (req,res,next) =>{
    try {
        const {name} = req.query;
        if(name){
            const filteredPokemon = await Pokemon.findOne({ 
                where:{ name },
                include: Type 
            });
            if(!filteredPokemon){
                let pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
                if(!pokemon) res.status(404).send('No existe ningun Pokemon con ese nombre');

                let {name,types,sprites,stats,weight,height} = pokemon;
                types = types.map(el => el.type.name);
                const health = stats[0].base_stat;
                const attack = stats[1].base_stat;
                const defense = stats[2].base_stat;
                const speed = stats[5].base_stat; 
                pokemon = {
                    name,
                    types,
                    img:sprites.other['official-artwork'].front_default,
                    health,
                    attack,
                    defense,
                    speed,
                    weight,
                    height
                }
                return res.json(pokemon);
            }
            return res.json(filteredPokemon);
        }
        const allData = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data;

        let pokemons = allData.results.map(el => axios.get(el.url));
        let pokemonsData = await Promise.all(pokemons);

        pokemonsData = pokemonsData.map(el => {
            let {id,name,types,sprites} = el.data;
            types = types.map(el => el.type.name);
            return{id,name,types,img:sprites.other['official-artwork'].front_default}
        });
        const dbPokemons = await Pokemon.findAll({
            attributes:['id','name','img'],
            // include: Type,
            include: [{
                model: Type,
                through: { attributes: [] }
              }]
        });
        //console.log('Pokemons de la DB')
        //dbPokemons.forEach(e => console.log(e.toJSON()));
        res.json([...dbPokemons,...pokemonsData]);
    } catch (error) { 
        console.log(error); 
        next(error)  
    }
});

// router.get('/pokemons',async (req,res,next) =>{
//     try {
//         const {name} = req.query;
//         const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
//         //if(!pokemon) throw new Error('No existe ningun pokemon con ese nombre');
//         res.json(pokemon);
//     } catch (error) {
//         console.log(error);
//         next(error)
//     }    
// });

router.get('/pokemons/:idPokemon',async (req,res,next) =>{

    try {
        const {idPokemon} = req.params;
        const regExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        if(regExp.test(idPokemon)){
            const pokemonsito = await Pokemon.findByPk(idPokemon,{
                include: Type
              });
            if(!pokemonsito) res.status(404).send("No existe ningun Pokemon con ese id")
            return res.json(pokemonsito);
        }
        const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
        let {name,types,stats,sprites,weight,height} = pokemon;
        types = types.map(el => el.type.name);
        const health = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const speed = stats[5].base_stat;
        res.json({id:idPokemon, name, types,img:sprites.other['official-artwork'].front_default, health, attack, defense, speed, weight, height});
    } catch (error) {
        console.log(error);
        next(error)
    }    
});

router.post('/pokemons',async (req,res,next) =>{
    try {
    const {name,types,img,health,attack,defense,speed,weight,height} = req.body;
    const newPokemon = await Pokemon.create({name,img,health,attack,defense,speed,weight,height});
    let  dbTypes = [];
    for (let i = 0; i < types.length; i++) {
        let aux = await Type.findOne({
            attributes: ['id','name'],
            where:{
                name: types[i]
            }
        });
        dbTypes.push(aux);
    }

    await newPokemon.addTypes(dbTypes);
     res.json(newPokemon);
    } catch (error) {
        console.log(error);
        next(error)
    }    
});

router.get('/types',async (req,res,next) =>{
    try {
        let pokemonsType = (await axios.get('https://pokeapi.co/api/v2/type')).data;
        pokemonsType = pokemonsType.results.map(el => el.name);
        res.json(pokemonsType)
    } catch (error) {
        console.log(error);
        next(error)
    }    
});


module.exports = router;
