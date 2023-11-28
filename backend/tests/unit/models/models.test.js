// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');

chai.use(chaiHttp);
const { expect } = chai;

describe('Products API', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve listar todos os produtos', async function () {
    const res = await chai.request(app).get('/products');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('não deve listar um produto inexistente', async function () {
    const res = await chai.request(app).get('/products/999');
    expect(res).to.have.status(404);
    expect(res.body).to.deep.equal({ message: 'Product not found' });
  });

  it('deve listar um produto específico', async function () {
    const res = await chai.request(app).get('/products/1');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });
});