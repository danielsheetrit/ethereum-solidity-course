const path = require('path');
const fs = require('fs');
const solc = require('solc');

/**
 * __dirname always point to the root directory "Inbox"
 * in our case.
 */
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');
const inboxContract = solc.compile(source, 1).contracts[':Inbox']

module.exports = inboxContract;
