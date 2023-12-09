const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const models = require('../../../src/models/products.model');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/products.services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Deve listar todos produtos, rota GET', async function () {
    // arrange
    sinon.stub(models, 'queryAllProducts').resolves(mocks.getAllProducts);
    // act
    const result = await services.getAllProductsServices();
    // assert
    expect(result.message).to.be.deep.equal(mocks.getAllProducts);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando consulta produto por ID, rota GET/id', async function () {
    // arrange
    sinon.stub(models, 'queryProductById').resolves(mocks.getByIdProducts);
    // act
    const result = await services.getByIdProductsServices(1);
    // assert
    expect(result.message).to.be.deep.equal(mocks.getByIdProducts);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando consulta produto por ID não encontrado, rota GET/id', async function () {
    // arrange
    sinon.stub(models, 'queryProductById').resolves();

    const result = await services.getByIdProductsServices(999);

    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    expect(result.status).to.be.equal(404);
  });
  it('Testando criação de produtos, rota POST', async function () {
    sinon.stub(models, 'createProduct').resolves(1);

    const result = await services.createProduct(mocks.insertProduct);

    expect(result.status).to.be.equal(201);
    expect(result.message).to.be.deep.equal({ id: undefined, name: mocks.insertProduct.name });
  });
  it('Testando criação de produtos sem nome, rota POST', async function () {
    const result = await services.createProduct({});

    expect(result.status).to.be.equal(400);
    expect(result.message).to.be.deep.equal({ message: '"name" is required' });
  });
  it('Testando criação de produtos c/ nome c/ 5 ou + caracteres, rota POST', async function () {
    const result = await services.createProduct({ name: 'Capa' });

    expect(result.status).to.be.equal(422);
    expect(result.message).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
  it('Testando atualização de produtos rota PUT/id', async function () {
    sinon.stub(models, 'queryProductById').resolves([[mocks.getByIdProducts]]);
    sinon.stub(models, 'updateProduct').resolves([{ affectedRows: 1 }]);

    const result = await services.updateProduct(1, mocks.reqUpdateProduct);

    expect(result.status).to.be.deep.equal(200);
    expect(result.message).to.be.deep.equal({ id: [{ affectedRows: 1 }], name: mocks.reqUpdateProduct.name });
  });
  it('Testando atualização de produtos inexistente rota PUT/id', async function () {
    sinon.stub(models, 'queryProductById').resolves();

    const result = await services.updateProduct(99, mocks.reqUpdateProduct);

    expect(result.status).to.be.deep.equal(404);
    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
  });
  it('Testando atualização de produtos sem nome rota PUT/id', async function () {
    const result = await services.updateProduct(1, {});

    expect(result.status).to.be.deep.equal(400);
    expect(result.message).to.be.deep.equal({ message: '"name" is required' });
  });
  it('Testando atualização de produtos c/ nome c/ 5 ou + caracteres, rota PUT/id', async function () {
    const result = await services.updateProduct(1, { name: 'Café' });

    expect(result.status).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
  it('Testando remoção de produto, rota DELETE/id', async function () {
    sinon.stub(models, 'queryProductById').resolves(mocks.getByIdProducts);
    sinon.stub(models, 'deleteProduct').resolves(1);

    const result = await services.deleteProduct(1);

    expect(result.status).to.be.deep.equal(204);
  });
  it('Testando pesquisa por produto, rota GET/search', async function () {
    sinon.stub(models, 'searchProduct').resolves(mocks.resSearchProduct);

    const result = await services.searchProduct('Martelo');

    expect(result.status).to.be.deep.equal(200);
    expect(result.message).to.be.deep.equal(mocks.resSearchProduct);
  });
  it('Testando pesquisa por produto inexistente, rota GET/search', async function () {
    sinon.stub(models, 'searchProduct').resolves([]);

    const result = await services.searchProduct('zzzzz');

    expect(result.status).to.be.deep.equal(200);
    expect(result.message).to.be.deep.equal([]);
  });
});

// arrange
//   stub
// act
//   executar uma função
// assert
//   expect