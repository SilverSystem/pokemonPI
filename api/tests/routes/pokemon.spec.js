/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('should get a statusCode of 200', async () => {
      await agent.get('/pokemons').expect(200).expect('Content-Type',/application\/json/)
      }
    );
    it('should get the created pikachu + all the 40 pokemons from the API', async () => {
      const res = await agent.get('/pokemons')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.lengthOf(41);
      expect(res.body[0]).to.have.property('name','pikachu')
      }
    );
  });

  describe('GET /pokemons?name="pokemonName"', () =>{
    it('should get a registered pokemon in the api by the name', async () =>{
      const res = await agent.get('/pokemons?name=charizard')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.deep.equal({
        id:6,
        name:'charizard',
        types:['fire','flying'],
        img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        health:78,
        attack: 84,
        defense: 78,
        speed: 100,
        weight: 905,
        height: 17
      })
    });
    it('should get a created pokemon in the database', async () =>{
      const res = await agent.get('/pokemons?name=pikachu')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.property('name','pikachu')
    });
    it("should get an error if the pokemon name doesn't exist neither in the API nor the database", async () =>{
        const res = await agent.get('/pokemons?name=joseph')
        expect(res.statusCode).to.equal(500)
        expect(res.text).to.equal('No existe ningun Pokemon con ese nombre')

    })
  });

  describe('GET /types', () => {
    it('should reply with status 200 ', async () =>{
       const res = await agent.get('/types')
       expect(res.statusCode).to.equal(200)
    });
    it('should reply with the 20 pokemons types of the API', async () =>{
      const res =  await agent.get('/types')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.lengthOf(20)
    });
  });

  after(() => conn.close());
});
