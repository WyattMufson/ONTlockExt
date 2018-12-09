var app = angular.module("mainpopup", []);

app.controller("popupCtrl", function($scope, $http, $window) {

  var client = new Ont.RpcClient("http://localhost:20336");

  client.getBlockHeight().then((res) => {
    console.log(`The current height is: ${res.result}`);
  });

  $scope.showDetails = false

  $scope.hideDetails = function () {
    $scope.showDetails = false
  }

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
    },
    {
      "password" : "06@!@#$",
      "username" : "krasner.ross@gmail.com",
      "url" : "twitter.com"
    }
  ];
  $scope.selectedPassword = {};

  $scope.showDetailsForPassword = function(pass) {
        var pass = JSON.stringify(pass);
        localStorage.setItem("pass", pass);
        $scope.showDetails = true
    };

    $scope.action = function(pass, arg) {

      if (arg === 1) {
        // Copy Username
        var pass = localStorage.getItem("pass");
        var parsed = JSON.parse(pass);
        var username = parsed.username;

        var input = document.getElementById("copyfrom");
        input.value = username;
        input.select();
        document.execCommand("copy");
        console.log(username);

      } else if (arg == 2) {
        // Copy Password
        var pass = localStorage.getItem("pass");
        var parsed = JSON.parse(pass);
        var pw = parsed.password;

        var input = document.getElementById("copyfrom");
        input.value = pw;
        input.select();
        document.execCommand("copy");
        console.log(pw);


      } else if (arg == 3) {
        // Copy URL
        var pass = localStorage.getItem("pass");
        var parsed = JSON.parse(pass);
        var url = parsed.url;

        var input = document.getElementById("copyfrom");
        input.value = url;
        input.select();
        document.execCommand("copy");
        console.log(url);

      } else if (arg == 4) {
        // Go to URL
        var pass = localStorage.getItem("pass");
        var parsed = JSON.parse(pass);
        var url = parsed.url;
         window.location.href ="//" + url;

      } else if (arg == 5) {
        // Edit

      } else if (arg == 6) {
        // Delete

      }
    };

});
