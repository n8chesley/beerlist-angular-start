
app.controller('mainController', function($scope, hardCodedBeers) {
    $scope.data = hardCodedBeers.getData();

});
