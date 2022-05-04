const { default: axios } = require('axios');
const { Router } = require('express');
const {Pokemon, Type} = require('../db');
const {getPokemonByName} = require('../utils')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons',async (req,res,next) =>{
    try {
        const {name} = req.query;

        if(name) return res.json(await getPokemonByName(name));
        
        const allData = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data;

        let pokemons = allData.results.map(el => axios.get(el.url));
        let pokemonsData = await Promise.all(pokemons);

        pokemonsData = pokemonsData.map(el => {
            let {id,name,types,sprites,stats} = el.data;
            types = types.map(el => el.type.name);
            const attack = stats[1].base_stat;
            return{id,name,types,img:sprites.other['official-artwork'].front_default,attack}
        });
        const dbPokemons = await Pokemon.findAll({ 
            attributes:['id','name','img','attack'],
            // include: Type,
            include: [{
                model: Type,
                through: { attributes: [] }
              }]
        });
        //console.log('Pokemons de la DB')
        //dbPokemons.forEach(e => console.log(e.toJSON()));
        let fixeDbPokemons = [];
        dbPokemons.forEach(el =>{ 
            const {id,name,img,attack} = el
            const types = el.Types.map(t => t.name);
            fixeDbPokemons.push({id,name,img,attack,types})
            })
        res.json([...fixeDbPokemons,...pokemonsData]);
    } catch (error) { 
        console.log(error); 
        next(error)  
    }
});

router.get('/pokemons/:idPokemon',async (req,res,next) =>{

    try {
        const {idPokemon} = req.params;
        const regExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        if(regExp.test(idPokemon)){
            const pokemonsito = await Pokemon.findByPk(idPokemon,{
                include: [{
                    model: Type,
                    through: { attributes: [] }
                  }]
              });
            if(!pokemonsito) res.status(404).send("No existe ningun Pokemon con ese id")
            const types = pokemonsito.Types.map(el => el.name);
            return res.json({...pokemonsito.dataValues,types});
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
    let newPokemon = await Pokemon.create({name,img,health,attack,defense,speed,weight,height});
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
     res.json({...newPokemon.dataValues,types});
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

router.get('/tipos', async (req,res,next) =>{
    try {
        const pokemonsTypes = await Type.findAll({
            attributes:['id','name']
        });
        res.json(pokemonsTypes);
    } catch (error) {
        console.log(error);
        next(error)
    }
})


module.exports = router;
