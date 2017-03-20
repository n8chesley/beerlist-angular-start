var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require("./models/BeerModel");

var app = express();
mongoose.connect('mongodb://localhost/beers');

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
  console.log(req.body);
  Beer.create(req.body, function(err,beer) {
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

// app.put('/beers/:id', function(req, res, next) {
//   Beer.findOneAndUpdate({ _id: req.param.id }, req.body, { new: true }, function(err, beer) {
//     if (err) {
//       console.error(err)
//       return next(err);
//     } else {
//       res.send(beer);
//     }
//   });
// });

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen('8000', function() {
  console.log("Hark! What ho on 8000?");
});
