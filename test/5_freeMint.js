const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { keccak256 } = ethers.utils;

const { CONTRACT_NAME, CONTRACT_ADDRESS, SIGNER_ADDRESS } = process.env;

const runtimeConfig = require('../src/config/runtime');
const freeListArray = require('../src/lists/freeMint');


describe('Free Mint', function () {
  it('Check if free minting is dissable ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.freeStart = Math.floor(
      new Date('2022-10-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.freeMintActive()).to.be.false;
  });

  it('Check if free minting is active ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.freeMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.freeMintActive()).to.be.true;
  });

  it('Not freelisted for minting', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const leafNodes = freeListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(''));

    await expect(contract.freeMint(hexProof)).to.be.reverted;
  });


  it('Free mint token', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const leafNodes = freeListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    const result = await contract.freeMint(hexProof);
    expect(result.hash).to.be.a('string');
  });


  it('Free mint token again', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const leafNodes = freeListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    await expect(contract.freeMint(hexProof)).to.be.reverted;
  });

});
