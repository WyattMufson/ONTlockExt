var app = angular.module("mainpopup", []);
console.log("1");
app.controller("popupCtrl", function($scope, $http) {
  $scope.passwords = [
      {
      "password" : "pass!@#$",
      "username" : "rosskranser",
      "url" : "facebookc.com"
    },
    {
      "password" : "06@!@#$",
      "username" : "krasner.ross@gmail.com",
      "url" : "twitter.com"
    }
  ];
  console.log("2");

});
