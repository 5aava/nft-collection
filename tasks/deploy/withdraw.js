const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

task('withdraw', 'withdraw to treasury Address', async (taskArgs, hre) => {
  const contract = await hre.ethers.getContractAt(
    CONTRACT_NAME,
    CONTRACT_ADDRESS,
  );
  await contract.withdrawFees();
});
