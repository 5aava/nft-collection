const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;


task('getTokenUri', 'getTokenUri', async (taskArgs, hre) => {
  const contract = await hre.ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);

  const tokenId = 0;
  const str = await contract.tokenURI(tokenId);
  console.log(str);
});
