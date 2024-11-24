// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {EOValidator} from "../src/EOValidator.sol";

contract EOValidatorTest is Test {
    EOValidator public validator;

    function setUp() public {
        validator = new EOValidator();
    }

    function test_AddRecord() public {
        EOValidator.MetaData memory metaData = EOValidator.MetaData("title", "description");
        validator.addRecord("0x1234", metaData, "ipfsHash");
        EOValidator.Record memory record = validator.getRecord(0);
        assertEq(record.hash, "0x1234");
        assertEq(record.metadata.title, "title");
        assertEq(record.metadata.description, "description");
        assertEq(record.ipfsHash, "ipfsHash");
        assertEq(record.owner, address(this));
    }

    function test_VerifyRecord() public {
        EOValidator.MetaData memory metaData = EOValidator.MetaData("title", "description");
        validator.addRecord("0x1234", metaData, "ipfsHash");
        assert(validator.verifyRecord(0, "0x1234"));
    }

    function test_VerifyRecordNoId() public {
        EOValidator.MetaData memory metaData = EOValidator.MetaData("title", "description");
        validator.addRecord("0x1234", metaData, "ipfsHash");
        validator.addRecord("0x5678", metaData, "ipfsHash");
        validator.addRecord("0x90ab", metaData, "ipfsHash");
        assert(validator.verifyRecordNoId("0x5678"));
    }
}