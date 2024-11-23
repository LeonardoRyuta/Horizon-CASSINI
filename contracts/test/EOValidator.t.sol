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
        validator.addRecord("0x1234", "metadata", "ipfsHash");
        EOValidator.Record memory record = validator.getRecord(0);
        assertEq(record.hash, "0x1234");
        assertEq(record.metadata, "metadata");
        assertEq(record.ipfsHash, "ipfsHash");
        assertEq(record.owner, address(this));
    }

    function test_VerifyRecord() public {
        validator.addRecord("0x1234", "metadata", "ipfsHash");
        assert(validator.verifyRecord(0, "0x1234"));
    }
}