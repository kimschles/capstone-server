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


app.use('/api/financeData', financeData);
app.use('/api/searchTerms', searchTerms);

app.listen(process.env.PORT || 1985);
console.log('Yaassss. Server started on localhost://1985');
