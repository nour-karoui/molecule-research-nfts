// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoleculeNFT is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => bool) public approvedMinters;
  uint256 public approvedMintersCount;

  mapping(address => uint256) public mintedPatents;
  uint256 public totalMintedPatentsCount;

  event AddMinter(address minter, uint256 currentCount);
  event RevokeMinter(address minter, uint256 currentCount);

  constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) {
    transferOwnership(_owner);
  }

  function revokeMinter(address _minter) payable public onlyOwner {
    require(approvedMinters[_minter] == true, 'This minter does not exist');
    approvedMinters[_minter] = false;
    approvedMintersCount -= 1;
    emit RevokeMinter(_minter, approvedMintersCount);
  }

  function addMinter(address _minter) payable public onlyOwner {
    require(approvedMinters[_minter] == false, 'This minter already exists');
    approvedMinters[_minter] = true;
    approvedMintersCount += 1;
    emit AddMinter(_minter, approvedMintersCount);
  }

  function mintPatent() payable public returns(uint256, uint256){
    require(approvedMinters[msg.sender] == true, "You are not considered as a minter, please contact the admin");
    uint256 tokenId = _tokenIds.current();
    _mint(msg.sender, tokenId);
    totalMintedPatentsCount += 1;
    mintedPatents[msg.sender] += 1;
    approvedMinters[msg.sender] = false;
    _tokenIds.increment();
    return (tokenId, totalMintedPatentsCount);
  }

  function getMinterCount(address _minter) view public returns(uint256) {
    return mintedPatents[_minter];
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public payable {
    require(ownerOf(tokenId) == msg.sender, "Sorry but you are not the owner of this NFT");
    _setTokenURI(tokenId, _tokenURI);
  }
}
