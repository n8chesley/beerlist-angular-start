//LEGACY:
//
// var express = require('express');
// var app = express();
//
// app.use(express.static('public'));
// app.use(express.static('node_modules'));
//
// app.listen(8000, function() {
//   console.log("Fullstack project. Listening on 8000.")
//
// });

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
var Beer = require("./public/js/models/BeerModel");

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res, next) {
  res.send('Testing Server')
})

app.get('/beers', function(req, res, next) {
  res.json({
    beers: [{
      name: '512 IPA',
      style: 'IPA',
      image_url: 'http://bit.ly/1XtmB4d',
      abv: 5
    }, {
      name: '512 Pecan Porter',
      style: 'Porter',
      image_url: 'http://bit.ly/1Vk5xj4',
      abv: 4
    }]
  });
});

app.listen('8000', function() {
  console.log("Hark! What ho on 8000?");
});
