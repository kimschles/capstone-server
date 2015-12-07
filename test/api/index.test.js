// TODO: befor each (there's a method for that) you need to connect to the database,
// and clear all data from all collections that you use in this test
// get your connection string correct
// make test_database (?)

var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;


describe('the API', function () {
  it("GET / shows links to other endpoints", function (done) {
    request(app).get('/api/searchTerms')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
        expect(res).to.eql({ search: { method: 'POST', path: '/' } })
      });
  });
});
