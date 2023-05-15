const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;
const calculatePrice = require('../../src/modules/calculatePrice');


task('mint', 'public mint tokens')
  .addParam('amount', 'amount of tokens')
  .setAction(async (taskArgs) => {
    const contract = await hre.ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);
    const options = {value: hre.ethers.utils.parseEther('0.08')};

    const tx = await contract.mint(taskArgs.amount, options);
    const receipt = await tx.wait();

    const provider = hre.ethers.getDefaultProvider('mainnet');
    const gasPrice = await provider.getGasPrice();

    calculatePrice(receipt.gasUsed, gasPrice);
  });
