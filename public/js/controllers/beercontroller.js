app.controller('beerController', function($scope, $stateParams, beerFactory) {
    if (!$stateParams.beerParam) {
        beerFactory.getBeer($stateParams.id)
            .then(function(beer) {
                $scope.beer = beer;
            })
    } else {
        $scope.beer = $stateParams.beerParam;
    }

});
