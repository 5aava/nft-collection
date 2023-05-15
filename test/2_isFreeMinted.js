const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { keccak256 } = ethers.utils;

const freeMintArray = require('../src/lists/freeMint');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

describe('FreeMint addresses check', function () {
  it('Address is freeMinted', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    async function checkFreeMint (i) {
      const addr = freeMintArray[i];

      const leafNodes = freeMintArray.map((addr) => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
      const hexProof = merkleTree.getHexProof(keccak256(addr));

      expect(await contract.isFreelisted(addr, hexProof)).to.be.true;
    }

    await checkFreeMint(11);
    await checkFreeMint(21);
    await checkFreeMint(25);
  });

  it('Address is NOT freeMinted', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const notInWhiteList = '';

    const leafNodes = freeMintArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof2 = merkleTree.getHexProof(keccak256(notInWhiteList));

    expect(await contract.isFreelisted(notInWhiteList, hexProof2)).to.be.false;
  });
});
