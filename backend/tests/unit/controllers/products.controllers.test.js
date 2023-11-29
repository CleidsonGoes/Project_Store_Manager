// const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const mocks = require('../mocks/mocks');
// const services = require('../../../src/services/products.services');
// const controllers = require('../../../src/controllers/products.controllers');

// chai.use(sinonChai);
// const { expect } = chai;

// describe('Testando a camada de controllers', function () {
//   it('Testando get all products', async function () {
//     // arrange
//     const req = {};
//     const res = {};

//     res.status = sinon.stub().returns(res);
//     req.json = sinon.stub();

//     sinon.stub(services, 'getAllProductsServices').resolves({ message: mocks.getAllProducts, status: 200 });
//     // act
//     await controllers.getAllProductsController(req, res);
//     // assert
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).to.have.been.calledWith(mocks.getAllProducts);
//   });
// });