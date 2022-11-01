const path = require('path');
const fs = require('fs');
const solc = require('solc');

/**
 * __dirname always point to the root directory "Inbox"
 * in our case.
 */
const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

/**
 * '[File-name :Inbox]' - if we had multiple contracts inside a file,
 * we should specify the file name
 */

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Lottery.sol'
].Lottery;
