
app.controller('mainController', function($scope, beerFactory) {
  $scope.beers = beerFactory.beers;

  $scope.addBeer = function(newBeer) {
    beerFactory.addBeer(newBeer).then(function(beer) {
      $scope.beers.push(beer);
    });
  }

  $scope.removeBeer = function(index) {
    var id = $scope.beers[index]._id
    beerFactory.removeBeer(id).then(function(beer) {
      for (var i = 0; i < $scope.beers.length; i++) {
        if (id === $scope.beers[i]._id) {
          $scope.beers.splice(i, 1);
        }
      }
    });
  }

  beerFactory.getBeers().then(function(beers) {  //controller calls the factory
    $scope.beers = beers;
  });
});
