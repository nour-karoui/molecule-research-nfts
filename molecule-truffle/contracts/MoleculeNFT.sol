// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoleculeNFT is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct MintedNFT {
    uint256 nftCount;
    mapping(uint256 => uint256) mintedNFTs;
  }
  mapping(address => bool) public approvedMinters;
  uint256 public approvedMintersCount;
  mapping(address => MintedNFT) public mintedNFTs;
  uint256 public mintersCount;
  event AddMinter(address minter, uint256 currentCount);
  event RevokeMinter(address minter, uint256 currentCount);

  constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) {
    transferOwnership(_owner);
  }

  function revokeMinters(address _minter) payable public onlyOwner {
    require(approvedMinters[_minter] == true, 'This minter does not exist');
    approvedMinters[_minter] = false;
    mintersCount -= 1;
    emit RevokeMinter(_minter, mintersCount);
  }

  function addMinter(address _minter) payable public onlyOwner {
    require(approvedMinters[_minter] == false, 'This minter already exists');
    approvedMinters[_minter] = true;
    mintersCount += 1;
    emit AddMinter(_minter, mintersCount);
  }

  function mintProject() payable public returns(uint256){
    require(approvedMinters[msg.sender] == true, "You are not considered as a minter, please contact the admin");
    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    mintedNFTs[msg.sender].mintedNFTs[mintedNFTs[msg.sender].nftCount] = newItemId;
    mintedNFTs[msg.sender].nftCount += 1;
    _tokenIds.increment();
    return newItemId;
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public payable {
    require(ownerOf(tokenId) == msg.sender, "Sorry but youy are not the owner of this NFT");
    _setTokenURI(tokenId, _tokenURI);
  }
}
