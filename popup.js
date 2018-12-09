var app = angular.module("mainpopup", []);

app.config( [
    '$compileProvider',
    function( $compileProvider ) {
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        + '|chrome-extension:'
        +currentImgSrcSanitizationWhitelist.toString().slice(-1);

        console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
]);

app.controller("popupCtrl", function($scope, $http, $window) {

  var client = new Ont.RpcClient("http://localhost:20336");

  client.getBlockHeight().then((res) => {
    console.log(`The current height is: ${res.result}`);
  });

  $scope.isLoggedIn = localStorage.getItem("isLoggedIn");


  // When first loaded
    $scope.showDetails = false;
    $scope.showPasswords = false;
    $scope.firstLoad = true;
    $scope.showAddPassword = false;



  $scope.logInClicked = function() {
    var pk = document.getElementById("private-key-input").value;
    var pw = document.getElementById("password-input").value;

    console.log("Sign in with Private key:" + pw);
    console.log("and password:" + pk);
    if ($scope.isValidPrivateKey(pk)) {
      $scope.logIn()
    }
  }

  $scope.addPassword = function() {
    $scope.showAddPassword = true;
    $scope.showDetails = false;
    $scope.showPasswords = false;
    $scope.firstLoad = false;


  }

  $scope.addNewPassword = function () {
    var un = document.getElementById("new-username").value;
    var url = document.getElementById("new-url").value;
    var pw = document.getElementById("new-password").value;

    var pk = localStorage.getItem("pk");

    console.log("add new password with pw:" + pw);
    console.log("add new password with username:" + un);
    console.log("add new password with url:" + url);
    console.log("encrypt with :" + pk);

    $scope.showAddPassword = false;
    $scope.showDetails = false;
    $scope.showPasswords = true;
    $scope.firstLoad = false;

  }

  $scope.isValidPrivateKey = function(key) {
    localStorage.setItem("pk", key);
    return true
  }

  $scope.logIn = function() {
    $scope.firstLoad = false
    $scope.showPasswords = true
  }

  $scope.backPressed = function () {
    $scope.showDetails = false
    $scope.showPasswords = true
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
        $scope.showPasswords = false
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
