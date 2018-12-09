var app = angular.module("mainpopup", []);

const {
  Crypto,
  Parameter,
  ParameterType,
  TransactionBuilder,
  RpcClient,
  utils
} = Ont;

const {
  Address,
  PrivateKey,
} = Crypto;

const {
  ByteArray
} = ParameterType;

const {
  sha256
} = utils;

const client = new RpcClient("http://localhost:20336");

function get(pkey, handler){
  const privateKey = new PrivateKey(pkey);
  const publicKey = privateKey.getPublicKey();
  const user = Address.fromPubKey(publicKey);

  const p1 = new Parameter('user', ByteArray, user.serialize());
  const functionName = "get";
  const contractAddr = new Address(utils.reverseHex("c168e0fb1a2bddcd385ad013c2c98358eca5d4dc"));
  const gasPrice = "0";
  const gasLimit = "20000";
  const tx = TransactionBuilder.makeInvokeTransaction(functionName, [p1], contractAddr, gasPrice, gasLimit, user);
  TransactionBuilder.signTransaction(tx, privateKey);

  client.sendRawTransaction(tx.serialize(), true).then((res) => {
    handler(res.result.Result);
  });
}

function put(pkey, value, handler){
  const privateKey = new PrivateKey(pkey);
  const publicKey = privateKey.getPublicKey();
  const user = Address.fromPubKey(publicKey);

  const p1 = new Parameter('user', ByteArray, user.serialize());
  const p2 = new Parameter('value', String, value);
  const functionName = "put";
  const contractAddr = new Address(utils.reverseHex("c168e0fb1a2bddcd385ad013c2c98358eca5d4dc"));
  const gasPrice = "0";
  const gasLimit = "20000";
  const tx = TransactionBuilder.makeInvokeTransaction(functionName, [p1, p2], contractAddr, gasPrice, gasLimit, user);
  TransactionBuilder.signTransaction(tx, privateKey);

  client.sendRawTransaction(tx.serialize(), false).then((res) => {
    handler(res);
  });
}

function getPasswords(privateKey, master, handler){
  get(privateKey, (data) => {
    try {
      var crypt = aesjs.utils.utf8.toBytes(master);
      var encryptedBytes = aesjs.utils.hex.toBytes(data);
      var aesCtr = new aesjs.ModeOfOperation.ctr(crypt);
      var decryptedBytes = aesCtr.decrypt(encryptedBytes);
      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
      console.log(decryptedText);
      try {
        handler(JSON.parse(decryptedText), null);
      } catch (error) {
        handler({}, error);
      }
    } catch (e) {
      handler({}, e);
    }
  })
}

function encryptAndSerialize(privateKey, master, dict, handler){
  const str = JSON.stringify(dict)
  try {
    var crypt = aesjs.utils.utf8.toBytes(master);
    var textBytes = aesjs.utils.utf8.toBytes(str);
    var aesCtr = new aesjs.ModeOfOperation.ctr(crypt);
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var value = aesjs.utils.hex.fromBytes(encryptedBytes);
    put(privateKey, value, handler);
  } catch (error) {
    handler(error);
  }
}

var passwords = {};

function fixMaster(master){
  let rn = master;
  if (rn.length > 16){
    return "INVALID";
  } else {
    while (rn.length < 16) {
      rn += "a";
    }
    return rn;
  }
}

app.controller("popupCtrl", function($scope, $http, $window) {
  const privateKey = "274b0b664d9c1e993c1d62a42f78ba84c379e332aa1d050ce9c1840820acee8b";
  const master = fixMaster("Pas7sword");

  getPasswords(privateKey, master, (res, err) => {
    if (err == null){
      passwords = res;
    }
    console.log(res);
    console.log(err);
  })

  // const newPasswords = {"Google.com" : {"Username" : "Wyetro", "Password" : "1234"}};

  // encryptAndSerialize(privateKey, master, newPasswords, (res) => {
  //   console.log(res.desc == "SUCCESS");
  // });

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
