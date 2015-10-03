require('dotenv').load()

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

router.get('/latestsearches', function(req, res) {
  searchTerms.find({ $query: {}, $orderby: { _id: -1 } }, function(err, search) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(search);
  })
});

// parameter middleware that will run before the '/list/:state' route
router.param('state', function(req, res, next, state) {
    req.state = state;
    next();
});

router.get('/list/:state', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=getLegislators&id=' + req.state + '&apikey='+ process.env.OPEN_SECRETS_KEY +'&output=json')
    .end(function (response) {
      res.status(200).json(response)
    });
});

// parameter middleware that will run before the '/show/:cid' route
router.param('cid', function(req, res, next, cid) {
    req.cid = cid;
    next();
});

router.get('/show/:cid', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candSummary&cid=' + req.cid + '&cycle=2016&apikey='+ process.env.OPEN_SECRETS_KEY + '&output=json')
    .end(function (response) {
      res.status(200).json(response)
    });
});

router.get('/topContributor/:cid', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candContrib&cid=' + req.cid +'&cycle=2016&apikey='+ process.env.OPEN_SECRETS_KEY + '&output=json')
  .end(function (response) {
    res.status(200).json(response)
  });
});

router.get('/topSector/:cid', function(req, res, next) {
  unirest.get('http://www.opensecrets.org/api/?method=candSector&cid=' + req.cid + '&cycle=2016&apikey='+ process.env.OPEN_SECRETS_KEY + '&output=json')
  .end(function (response) {
    res.status(200).json(response)
  });
});

router.param('lastname', function(req, res, next, lastname) {
    req.lastname = lastname.toLowerCase();
    next();
});

console.log(lastname);

router.get('/stories/:lastname', function(req, res, next) {
  unirest.get('https://webhose.io/search?token=' + process.env.WEBHOSE_KEY + '=json&q=Congress%20%22' + req.lastname + '%22%20text%3A('+ req.lastname +')&language=english&site_type=news')
    .end(function (response) {
      res.status(200).json(response)
    });
});


module.exports = router;
