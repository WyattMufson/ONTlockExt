var app = angular.module("mainpopup", []);
console.log("1");
app.controller("popupCtrl", function($scope, $http) {
  $scope.passwords = {
    "password" : "pass123",
    "username" : "krasner.ross@gmail.com",
    "url" : "facebook.com"
  },
  {
    "password" : "p!@as2s123",
    "username" : "rosskrasner",
    "url" : "twitter.com"
  }
  console.log("2");

});
