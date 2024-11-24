// SDPX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract EOValidator {
  struct MetaData {
    string title;
    string description;
  }

  struct Record {
    uint256 id;
    string hash;
    string ipfsHash;
    uint256 timestamp;
    MetaData metadata;
    address owner;
  }

  mapping(uint256 => Record) private records;
  uint256 private recordCount;

  event RecordAdded(uint256 id, string hash, string ipfsHash, uint256 timestamp, MetaData metadata, address owner);

  function addRecord(string memory dataHash, MetaData memory metadata, string memory ipfsHash) public {
    records[recordCount] = Record(recordCount, dataHash, ipfsHash, block.timestamp, metadata, msg.sender);
    recordCount++;
    emit RecordAdded(recordCount - 1, dataHash, ipfsHash, block.timestamp, metadata, msg.sender);
  }

  function verifyRecord(uint256 recordId, string memory dataHash) public view returns (bool) {
    return keccak256(abi.encodePacked(records[recordId].hash)) == keccak256(abi.encodePacked(dataHash));
  }

  function verifyRecordNoId(string memory dataHash) public view returns (bool) {
    for (uint256 i = 0; i < recordCount; i++) {
      if (keccak256(abi.encodePacked(records[i].hash)) == keccak256(abi.encodePacked(dataHash))) {
        return true;
      }
    }
    return false;
  }

  function getRecord(uint256 recordId) public view returns (Record memory) {
    return records[recordId];
  }

  function getRecordByHash(string memory dataHash) public view returns (Record memory) {
    for (uint256 i = 0; i < recordCount; i++) {
      if (keccak256(abi.encodePacked(records[i].hash)) == keccak256(abi.encodePacked(dataHash))) {
        return records[i];
      }
    }
    revert("Record not found");
  }

  function getRecords() public view returns (Record[] memory) {
    Record[] memory result = new Record[](recordCount);
    for (uint256 i = 0; i < recordCount; i++) {
      result[i] = records[i];
    }
    return result;
  }
}