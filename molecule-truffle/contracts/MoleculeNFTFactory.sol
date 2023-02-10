// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import './MoleculeNFT.sol';

contract MoleculeNFTFactory {
    struct Collection {
        string name;
        string symbol;
        address owner;
    }
    mapping(string=>address) public availableCollections;
    mapping(uint256=>Collection) public collections;
    uint256 public collectionsCount;
    constructor() {
        collectionsCount = 0;
    }
    function createNewCollection(string memory collectionName, string memory collectionSymbol) payable public {
        require(availableCollections[collectionName] == address(0), 'This Collection Already Exists');
        MoleculeNFT collection = new MoleculeNFT(collectionName, collectionSymbol, msg.sender);
        availableCollections[collectionName] = address(collection);
        collections[collectionsCount] = Collection({name: collectionName, symbol: collectionSymbol, owner: msg.sender});
        collectionsCount ++;
    }

    function getCollectionAddress(string memory collectionName) view public returns (address) {
        require(availableCollections[collectionName] != address(0), 'This Collection Does Not Exist');
        return availableCollections[collectionName];
    }

    function getCollection(uint256 collectionIndex) view public returns (Collection memory) {
        require(collectionIndex <= collectionsCount, 'This Index Does Not Exist');
        return collections[collectionIndex];
    }
}
