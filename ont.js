const { Wallet, Network } = require('ontology-ts-sdk');
var wallet = Wallet.create('test');
// var rpc = network.rpc;

var client = new Network.rpc.RpcClient("http://localhost:20336");

function read(){
  console.log("Read");
}

module.exports = {
  read: read
};
