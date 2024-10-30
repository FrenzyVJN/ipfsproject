// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string cid;
        address owner;
    }

    mapping(uint256 => File) public files;
    uint256 public fileCount;

    function uploadFile(string memory _cid) public {
        fileCount++;
        files[fileCount] = File(_cid, msg.sender);
    }

    function getFile(uint256 _fileId) public view returns (string memory, address) {
        return (files[_fileId].cid, files[_fileId].owner);
    }
}
