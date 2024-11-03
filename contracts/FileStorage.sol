// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
contract FileStorage {
    // Mapping to store a list of CIDs for each user
    mapping(address => string[]) private cids;

    // Function to add a CID for the calling user
    function addCid(string memory cid) public {
        cids[msg.sender].push(cid);
    }

    // Function to list all CIDs for the calling user
    function listCids() public view returns (string[] memory) {
        return cids[msg.sender];
    }

    // Function to remove a specific CID for the calling user
    function removeCid(string memory cid) public {
        string[] storage userCids = cids[msg.sender];
        for (uint256 i = 0; i < userCids.length; i++) {
            if (
                keccak256(abi.encodePacked(userCids[i])) ==
                keccak256(abi.encodePacked(cid))
            ) {
                userCids[i] = userCids[userCids.length - 1]; // Replace with the last CID
                userCids.pop(); // Remove the last CID
                break;
            }
        }
    }

    // Function to clear all CIDs for the calling user
    function clearCids() public {
        delete cids[msg.sender];
    }
}
