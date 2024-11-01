require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    custom: {
      url: "",
      chainId: 1337,
      accounts:['0x71e1050f0bc15054dcf14bf21d822da1adbf97f4c4ad9af7e7af52876919cf07'],
    },
  },
};