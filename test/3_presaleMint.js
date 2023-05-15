const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const runtimeConfig = require('../src/config/runtime');
const whiteListArray = require('../src/lists/whitelist');

const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { keccak256 } = ethers.utils;

const { CONTRACT_NAME, CONTRACT_ADDRESS, SIGNER_ADDRESS } = process.env;

const COAST_PRICE = hre.ethers.utils.parseEther('0.1');


describe('PreSale Mint', function () {
  it('Check if presale minting is dissable ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.presaleMintStart = Math.floor(
      new Date('2022-10-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.presaleActive()).to.be.false;
  });

  it('Check if presale minting is active ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.presaleMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.presaleActive()).to.be.true;
  });

  it('Mint token 0.1 ETH', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    const options = { value: COAST_PRICE };

    runtimeConfig.mintPrice = COAST_PRICE;

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const leafNodes = whiteListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    const result = await contract.presaleMint(1, hexProof, options);
    expect(result.hash).to.be.a('string');
  });

  it('Already minted', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    const options = { value: COAST_PRICE };

    runtimeConfig.mintPrice = COAST_PRICE;

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const leafNodes = whiteListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    await expect(contract.presaleMint(1, hexProof, options)).to.be.reverted;
  });

  it('Check coast 0.1 ETH', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    const options = { value: hre.ethers.utils.parseEther('0.09') };

    await expect(contract.presaleMint(1, options)).to.be.reverted;
  });
});
