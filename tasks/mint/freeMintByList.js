const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;


task('freeMintByList', 'free Mint By List')
  .setAction(async () => {
    const contract = await hre.ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);

    const freeMintListArray = require('../../src/lists/ourFreelist');
    const calculatePrice = require('../../src/modules/calculatePrice');

    const tx = await contract.freeMintByList(freeMintListArray, 1);
    const receipt = await tx.wait();

    const provider = hre.ethers.getDefaultProvider('mainnet');
    const gasPrice = await provider.getGasPrice();

    calculatePrice(receipt.gasUsed, gasPrice);
  });
