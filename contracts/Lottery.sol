// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    // if we want to send money to one of the players array it must be payable
    address payable[] players;

    constructor() {
        // msg object - availble on every function in our code
        // it is reserved word
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .001 ether);

        players.push(payable(msg.sender));
    }

    function pickWinner() public restricted {
        uint index = _random() % players.length;
        players[index].transfer(address(this).balance);

        // resets the contract
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // Static (Private) Functions
    function _random() private view returns (uint) {
        uint source = block.difficulty + block.timestamp;

        return uint(keccak256(abi.encodePacked(source)));
    }
}

/** 
    Arrays: 

    fixed array - length cannot change, 
        all elements within the array must be of the same type
    dynamic array - length can be modified, 
        all elements within the array must be of the same type

    **when we deploy a contract with an array variable, 
        the getter function which automatically generated, not returns the whole array
        it wait for an index input, to retrive a single element in the array
*/
