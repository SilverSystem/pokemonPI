const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', async () => {
        try {
          await Pokemon.create({})
        } catch (error) {
          expect(error.message).to.exist;
        }
        
      });
      it('should not create two Pokemons with the same name', async() => {
        try {
          await Pokemon.create({ name: 'pikachu' });
          await Pokemon.create({ name: 'pikachu', attack:120 });
        } catch (error) {
          expect(error.message).to.exist;
        }
      });

      it('should create the pokemon correctly if all the data is provided', async () =>{
        const newPokemon = await Pokemon.create({name: 'arceus', health:120, attack:120, 
          defense:120, speed:120, height:120, weight:120,img:'https://someimg-url.com'})
          expect(newPokemon.toJSON()).to.have.property('name','arceus')
          expect(newPokemon.toJSON()).to.have.property('health',120)
          expect(newPokemon.toJSON()).to.have.property('attack',120)
          expect(newPokemon.toJSON()).to.have.property('defense',120)
          expect(newPokemon.toJSON()).to.have.property('speed',120)
          expect(newPokemon.toJSON()).to.have.property('height',120)
          expect(newPokemon.toJSON()).to.have.property('weight',120)
          expect(newPokemon.toJSON()).to.have.property('img','https://someimg-url.com')
      })
    });
  });
  //  after(() => conn.close());
});
