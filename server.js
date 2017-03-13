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

app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beers);
    }
  });
});

app.post('/beers', function(req, res, next) {
  var beer = new Beer(req.body);

  beer.save(function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(beer);
    }
  });
});

app.delete('/beers/:id', function(req, res, next) {
  Beer.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Beer Deleted");
    }
  });
});

app.put('/beers/:id', function(req, res, next) {
  Beer.findOneAndUpdate({ _id: req.param.id }, req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

app.listen('8000', function() {
  console.log("Hark! What ho on 8000?");
});
