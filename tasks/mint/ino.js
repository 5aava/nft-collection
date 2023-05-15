const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;
const calculatePrice = require('../../src/modules/calculatePrice');


task('ino', 'ino')
  .addParam('to', 'address')
  .addParam('amount', 'amount of tokens')
  .setAction(async (taskArgs) => {
    const contract = await hre.ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);

    const tx = await contract.INO(taskArgs.to, taskArgs.amount);
    const receipt = await tx.wait();

    const provider = hre.ethers.getDefaultProvider('mainnet');
    const gasPrice = await provider.getGasPrice();

    calculatePrice(receipt.gasUsed, gasPrice);
  });
