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

describe('Manage shipments', () => {
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

    it('Should generate a shipment and add it to file', (done) => {
        shipment.createShipment(req, res);
        setTimeout(() => {
            utils.getDataFromFile(SHIPMENT_FILE_PATH)
                .then((data) => {
                    console.log('Data from shipment: ' + data);
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    }); //Test createShipment

    it('Should generate a random address', (done) => {
        chai.request(server)
            .get('/shipment/change')
            .then(response => {
                response.status.should.equal(201);
                done();
        })
    }) //Test changeStatus
});