const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const services = require('../../../src/services/products.services');

chai.use(chaiHttp);

const productsDatabase = [
  {
    id: 1,
    name: 'martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

describe('dfd', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('', function() {

  });
});

// arrange
//   stub
// act
//   executar uma função
// assert
//   expect