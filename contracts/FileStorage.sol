// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FileStorage is Ownable {
    uint256 private _nextTokenId;
    // create an array of cid
    string[] private cids;

    constructor(
        address initialOwner
    )
        // initialize the list of cids
        Ownable(initialOwner)
    {}

    //function to pin CID
    function addCid(string memory cid) public onlyOwner {
        cids.push(cid);
    }
    //function to list all CIDs
    function listCids() public view returns (string[] memory) {
        return cids;
    }
    //function to unpin CID
    function removeCid(string memory cid) public onlyOwner {
        for (uint256 i = 0; i < cids.length; i++) {
            if (
                keccak256(abi.encodePacked(cids[i])) ==
                keccak256(abi.encodePacked(cid))
            ) {
                cids[i] = cids[cids.length - 1];
                cids.pop();
                break;
            }
        }
    }

    function clearCids() public onlyOwner {
        delete cids;
    }
}
