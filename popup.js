var app = angular.module("mainpopup", []);
console.log("1");
app.controller("popupCtrl", function($scope, $http) {
  $scope.payload = {};
  console.log("2");

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    $scope.$apply(function(){
      $scope.the_url = tabs[0].url;
      $scope.payload.related_articles = [];
    });
  });
});
