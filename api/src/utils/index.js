const { default: axios } = require("axios");
const {Pokemon,Type} = require('../db.js');


const feedDb = async () =>{
   let types = (await axios.get('http://localhost:3001/types')).data;
   types = types.map(el => { return { name:el } });
   await Type.bulkCreate(types);
};


const getPokemonByName = async (pokemonName) =>{
   const filteredPokemon = await Pokemon.findOne({
      where:{
         name: pokemonName
      },
      // include: Type,
      include: [{
          model: Type,
          through: { attributes: [] }
        }]
  });
  if(!filteredPokemon){
      let pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)).data;
      if(!pokemon) throw new Error('No existe ningun Pokemon con ese nombre');
      let {id,name,types,sprites,stats,weight,height} = pokemon;
      types = types.map(el => el.type.name);
      const health = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const speed = stats[5].base_stat; 
      pokemon = {
         id,
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
      return pokemon;
  }
  const types = filteredPokemon.Types.map(el => el.name);
  return {...filteredPokemon.dataValues,types};
}

module.exports =  {
   feedDb,
   getPokemonByName
} 