const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const payment = require('../controllers/payment.controller');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');


chai.use(chaiHttp);

describe('payment check', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generatePaymentFile()
            .then(() => {
                done();
            })
        console.log('Before each');
        console.log(done)
        debugger
    });

    
    /*afterEach((done) => {
        if (agent) {
            agent.close();
        }
        done();
        utils.removeFile(PAYMENT_FILE_PATH)
          .then(() => done() )
    });*/
    it('Should generate a random price', (done) => {
        payment.create(req, res);
        setTimeout(() => {
            utils.getDataFromFile(PAYMENT_FILE_PATH)
                .then((data) => {
                    console.log('Data coming from random price:');
                    console.log(data);
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    }); //Test createShipment

    it('Should generate 5 random prices', done => {
        let n = 5;
        for (let i = 0; i < n; i++) {
            payment.create(req, res);
        }
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });

    it('Should return the discounts applied', done => {
        payment.create(req, res);
        chai.request(server)
            .get('/payment/discounts')
            .then(response => {
                console.log('Response:');
                console.log(response.body);
                response.status.should.equal(200);
                done();
            })
    });

    it('Should return 5 promo codes', done => {
        chai.request(server)
            .get('/payment/promos')
            .then(response => {
                console.log(response.body);
                response.body.length.should.eql(5);
                done();
            })
    });
});
