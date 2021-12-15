const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
//const path = require('path');
const should = chai.should();
const sinon = require('sinon');
const {Request, Response} = require('./mock');
const utils = require('./utils');
//const {uniq} = require('lodash');
const Promise = require('bluebird');

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
    });

    it('Should generate the result of a sum', (done) => {
        chai.request(server)
            .get('/operations/sum')
            .then(response => {
                response.status.should.equal(201);
                done();
        })
    }) //Test sum

    it('Should generate the result of a subtraction', (done) => {
        chai.request(server)
            .get('/operations/substract')
            .then(response => {
                response.status.should.equal(201);
                done();
        })
    }) //Test subtraction

    it('Should generate the result of a multiply', (done) => {
        chai.request(server)
            .get('/operations/multiply')
            .then(response => {
                response.status.should.equal(201);
                done();
        })
    }) //Test multiply

    it('Should generate a random division', (done) => {
        chai.request(server)
            .get('/operations/divide')
            .then(response => {
                response.status.should.equal(201);
                done();
        })
    }) //Test divide
});