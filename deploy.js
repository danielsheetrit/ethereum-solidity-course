require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { NETWORK_LINK } = require('./constants');
const { abi, evm } = require('./compile');

console.log('abi:', JSON.stringify(abi));

const provider = new HDWalletProvider(
  process.env.PNEUMONIC_PRHASE,
  // instead of using an ethereum local machine,
  // we use Infura which is free service
  NETWORK_LINK
);

const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
})();
