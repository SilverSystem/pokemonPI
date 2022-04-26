const { default: axios } = require("axios");
const {Type} = require('../db.js');


const feedDb = async () =>{
   let types = (await axios.get('http://localhost:3001/types')).data;
   types = types.map(el => { return { name:el } });
   await Type.bulkCreate(types);
};


module.exports =  feedDb