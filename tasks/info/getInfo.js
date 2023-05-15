const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

task('getInfo', 'getInfo from contract', async (taskArgs, hre) => {
  const contract = await hre.ethers.getContractAt(
    CONTRACT_NAME,
    CONTRACT_ADDRESS,
  );

  const result = {};
  result.owner = await contract.owner();

  result.mintingActive = await contract.mintingActive();
  result.presaleActive = await contract.presaleActive();

  result.publicMintStart = await contract.publicMintStart();
  result.presaleMintStart = await contract.presaleMintStart();

  result.presaleMintEnd = await contract.presaleMintEnd();
  result.freeMintStart = await contract.freeMintStart();
  result.freeMintEnd = await contract.freeMintEnd();

  result.maxSupply = await contract.maxSupply();
  result.availableSupply = await contract.availableSupply();

  result.mintPrice = await contract.mintPrice();
  result.treasuryAddress = await contract.treasuryAddress();

  result.whitelistMerkleRoot = await contract.whitelistMerkleRoot();
  result.freeMintMerkleRoot = await contract.freeMintMerkleRoot();

  result.baseURI = await contract.baseURI();
  // result.tokenURI = await contract.tokenURI(1);

  result.metadataUpdatable = await contract.metadataUpdatable();
  result.prerevealTokenURI = await contract.prerevealTokenURI();

  result.contractURI = await contract.contractURI();
  result.royaltyInfo = await contract.royaltyInfo(1, hre.ethers.utils.parseEther('0.15'));

  result.balance = await contract.provider.getBalance(contract.address);


  console.log(result);
});
