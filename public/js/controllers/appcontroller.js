
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.editBeer = function(index) {
    // notice that *this* refers to the element's scope - in this case a beer.
    // so by using it below we're adding 'tempBeer' to the beer's scope.
    this.tempBeer = angular.copy($scope.beers[index]);
    // debugger;
  };

  $scope.updateBeer = function(beerCopy, index) {
    var self = this;
    // debugger;
    //calling the update beer on the service to send the new info to the server
    beerFactory.updateBeer(beerCopy).then(function(modifiedBeer) {
      //when the server finished updating successfully, replace the original beer with the modified version
      $scope.beers[index] = modifiedBeer;
      // debugger;
      // 'self' refers to the beer scope (we assigned it earlier because in here 'this' is something else)
      self.tempBeer = null;
    });
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  beerFactory.getBeers().then(function(beers) {  //controller calls the factory
    $scope.beers = beers;
  });
});
