// SDPX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract EOValidator {
  struct Record {
    string hash;
    string ipfsHash;
    uint256 timestamp;
    string metadata;
    address owner;

  }

  mapping(uint256 => Record) private records;
  uint256 private recordCount;


  function addRecord(string memory dataHash, string memory metadata, string memory ipfsHash) public {
    records[recordCount] = Record(dataHash, ipfsHash, block.timestamp, metadata, msg.sender);  
    recordCount++;
  }

  function verifyRecord(uint256 recordId, string memory dataHash) public view returns (bool) {
    return keccak256(abi.encodePacked(records[recordId].hash)) == keccak256(abi.encodePacked(dataHash));
  }

  function getRecord(uint256 recordId) public view returns (Record memory) {
    return records[recordId];
  }

  function getRecords() public view returns (Record[] memory) {
    Record[] memory result = new Record[](recordCount);
    for (uint256 i = 0; i < recordCount; i++) {
      result[i] = records[i];
    }
    return result;
  }
}