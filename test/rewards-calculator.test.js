const request = require('supertest');
const app = require('../index');

describe('POST /api/v1/calculate-rewards', function () {

    it('Test missing params', function (done) {
        request(app)
            .post('/api/v1/calculate-rewards')
            .send({
            })
            .expect(500, done)
            .expect(function (res) {
                if (res.body.message !== 'Error Parameter missing' || res.body.success !== false) {
                    throw new Error("Expected error message and success to be false");
                }
            });
    });

    it('Testing for negative amount', function (done) {
        request(app)
            .post('/api/v1/calculate-rewards')
            .send({
                "amount": -1
            })
            .expect(500, done)
            .expect(function (res) {
                if (res.body.message !== 'Error Invalid amount' || res.body.success !== false) {
                    throw new Error("Expected error message and success to be false");
                }
            });
    });

    it('calculate rewards points for amount 90', function (done) {
        request(app)
            .post('/api/v1/calculate-rewards')
            .send({
                "amount": 90
            })
            .expect(200, done)
            .expect(function (res) {
                if (res.body.data.rewardsPoint !== 40) {
                    throw new Error("Expected rewards points to be 40");
                }
            });
    });
});