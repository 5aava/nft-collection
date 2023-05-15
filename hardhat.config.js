require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-etherscan-abi');
require('hardhat-gas-reporter');
require('dotenv').config();

// tasks
require('./tasks/deploy/deploy');
require('./tasks/deploy/update');
require('./tasks/deploy/withdraw');

require('./tasks/mint/mint');

// Free Mint by Array List
// ===============================================================================================
require('./tasks/mint/freeMintByList');
// ===============================================================================================

// ioTranferMint
// ===============================================================================================
require('./tasks/mint/ino');
// ===============================================================================================


require('./tasks/info/accounts');
require('./tasks/info/getInfo');
require('./tasks/info/isWhitelisted');

require('./tasks/info/getTokenUri');


const {
  INFURA_PROJECT_ID,
  ALCHEMY_PROJECT_ID,
  SIGNER_PRIVATE_KEY,
} = process.env;

module.exports = {
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 21, // in gwei
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'localhost',
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY],
    },
    localhost: {
      loggingEnabled: true,
      chainId: 10111,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '',
  },
};

