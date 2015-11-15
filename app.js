require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var financeData = require('./routes/routes');
var searchTerms = require('./routes/routes');

var app = express();

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/financeData', financeData);
app.use('/api/searchTerms', searchTerms);

app.listen(process.env.PORT || 1985);
console.log('Yaassss. Server started!');
