const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const path = require('path');
const should = chai.should();
const sinon = require('sinon');
//const keyStore = require('../key-store');
const {Request, Response} = require('./mock');
const utils = require('./utils');
//const {uniq} = require('lodash');
const Promise = require('bluebird');
//const KEY_FILE = path.resolve('./valid-keys.txt');
const shipment = require('../controllers/shipment.controller');
const SHIPMENT_FILE_PATH = path.resolve('./shipment-generated.txt')

chai.use(chaiHttp);

describe('Manage operations', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generateShipmentFile()
            .then(() => {
                done();
            })
        console.log('Before each');
        console.log(done)
        debugger
    });

    it('Should generate the result of a sum', (done) => {
        chai.request(server)
            .get('/operations/sum')
            .then(response => {
                console.log(response.body);
                response.status.should.equal(201);
                done();
        })
    }) //Test sum

    it('Should generate the result of a subtraction', (done) => {
        chai.request(server)
            .get('/operations/substract')
            .then(response => {
                console.log(response.body);
                response.status.should.equal(201);
                done();
        })
    }) //Test subtraction

    it('Should generate the result of a multiply', (done) => {
        chai.request(server)
            .get('/operations/multiply')
            .then(response => {
                console.log(response.body);
                response.status.should.equal(201);
                done();
        })
    }) //Test multiply

    it('Should generate a random division', (done) => {
        chai.request(server)
            .get('/operations/divide')
            .then(response => {
                console.log(response.body);
                response.status.should.equal(201);
                done();
        })
    }) //Test divide
});