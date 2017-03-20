app.factory('beerFactory', function($http) {

  var beerFactory = {};

  beerFactory.getBeers = function() {
    return $http.get('/beers') // $http.get creates & returns a promise, will send the object to the controller once the db sends it
      .then(function(response) {
        return response.data
      }, function(err) {
        console.log(err)
      });
  };

  beerFactory.addBeer = function(newBeer) {
    return $http.post('/beers', newBeer)  // "newBeer" is what's sent
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };

  beerFactory.removeBeer = function(beerToRemove) {
    return $http.delete('/beers/' + beerToRemove)
      .then(function(response) {
        return response.data;
      }, function(err) {
        console.error(err)
      });
  };

  return beerFactory;
});
