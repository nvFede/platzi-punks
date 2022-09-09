require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { DEPLOYER_SIGNER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    }
  }
};
