const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

const runtimeConfig = require('../../src/config/runtime');

task('update', 'updete contrac from runtimeConfig', async (taskArgs, hre) => {
  const calculatePrice = require('../../src/modules/calculatePrice');

  const contract = await hre.ethers.getContractAt(
    CONTRACT_NAME,
    CONTRACT_ADDRESS,
  );
  const tx = await contract.updateConfig(runtimeConfig);
  const receipt = await tx.wait();

  const provider = hre.ethers.getDefaultProvider('mainnet');
  const gasPrice = await provider.getGasPrice();

  calculatePrice(receipt.gasUsed, gasPrice);
});
