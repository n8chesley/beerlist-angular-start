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

  beerFactory.getBeer = function(id) {
  return $http.get('/beers/' + id)  // get just one beer
    .then(function(response) {
      return response.data
    }, function(err) {
      console.error(err)
    });
};

  beerFactory.addBeer = function(newBeer) {
    return $http.post('/beers', newBeer)
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

  beerFactory.updateBeer = function(beerToUpdate) {
  return $http.put('/beers/' + beerToUpdate._id, beerToUpdate)
    .then(function(response) {
      return response.data
    });
};

  return beerFactory;
});
