const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { keccak256 } = ethers.utils;

const whiteListArray = require('../src/lists/whitelist');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

describe('Whitelisted addresses check', function () {
  it('Address is whitelisted', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const addr = whiteListArray[8];

    const leafNodes = whiteListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(addr));

    expect(await contract.isWhitelisted(addr, hexProof)).to.be.true;
  });

  it('Address is NOT whitelisted', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const notInWhiteList = '';

    const leafNodes = whiteListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof2 = merkleTree.getHexProof(keccak256(notInWhiteList));

    expect(await contract.isWhitelisted(notInWhiteList, hexProof2)).to.be.false;
  });
});
