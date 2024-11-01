// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FileStorageModule", (m) => {
    const initialOwner = "0xda2f9041b89EbB9011bDA23118941EFFcE3D1748";
    const fileStorage = m.contract("FileStorage", [initialOwner]);
  // Return the contract reference
  return { fileStorage };
});
