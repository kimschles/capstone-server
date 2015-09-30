var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')(process.env.MONGOLAB_URI);
var searchTerms = db.get('searchTerms');

router.get('/', function(req, res) {});

router.post('/', function(req, res) {
  searchTerms.insert(req.body, function(err, search) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(search);
  });
});

// parameter middleware that will run before the '/list/:state' route
router.param('state', function(req, res, next, state) {
    req.state = state;
    next();
});

router.get('/list/:state', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=getLegislators&id=' + req.state + '&apikey=93167543cdcbf60453604935fe238344&output=json')
    .end(function (response) {
      res.status(200).json(response)
    });
});

// parameter middleware that will run before the '/show/:cid' route
// router.param('cid', function(req, res, next, cid) {
//     console.log(cid);
//     req.cid = cid;
//     next();
// });

router.get('/show/', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candSummary&cid=N00006134&cycle=2016&apikey=93167543cdcbf60453604935fe238344&output=json')
    .end(function (response) {
      res.status(200).json(response)
    });
});

router.get('/topContributor/', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candContrib&cid=N00006134&cycle=2016&apikey=93167543cdcbf60453604935fe238344&output=json')
  .end(function (response) {
    res.status(200).json(response)
  });
});

router.get('/topSector/', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candSector&cid=N00007360&cycle=2016&apikey=93167543cdcbf60453604935fe238344&output=json')
  .end(function (response) {
    res.status(200).json(response)
  });
});

router.get('/topsearches', function(req, res) {
  searchTerms.find({}, function(err, search) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(search);
  })
});

router.get('/', function(req, res) {
  searchTerms.find({}, function(err, search) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(search);
  })
});

router.get('/stories/', function(req, res, next) {
  unirest.get('https://webhose.io/search?token=33327263-0aa8-4fa4-bf15-7a7ef7594a6d&format=json&q=Congress%20%22Jared%20Polis%22&language=english&ts=1442961669993')
    .end(function (response) {
      res.status(200).json(response)
    });
});

module.exports = router;
