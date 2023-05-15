const deploymentConfig = require('../../src/config/deployment');
const runtimeConfig = require('../../src/config/runtime');
const { CONTRACT_NAME } = process.env;

task('deploy', 'deploy contract', async (taskArgs, hre) => {
  const updateEnv = require('../../src/modules/updateEnv');
  const calculatePrice = require('../../src/modules/calculatePrice');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const NEOGEN = await hre.ethers.getContractFactory(
    CONTRACT_NAME,
  );
  const contract = await NEOGEN.deploy(
    deploymentConfig,
    runtimeConfig,
  );

  await contract.deployed();
  console.log(`${CONTRACT_NAME} deployed to:`, contract.address);

  const envUpdate = { CONTRACT_ADDRESS: contract.address };
  updateEnv(envUpdate);

  const gasUsed = contract.deployTransaction.gasLimit;

  const provider = hre.ethers.getDefaultProvider('mainnet');
  const gasPrice = await provider.getGasPrice();

  calculatePrice(gasUsed, gasPrice);
});
