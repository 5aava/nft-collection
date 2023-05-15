const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const { CONTRACT_NAME, CONTRACT_ADDRESS, SIGNER_ADDRESS } = process.env;

const runtimeConfig = require('../src/config/runtime');

const whiteListArray = require('../src/lists/whitelist');
const freeListArray = require('../src/lists/freeMint');

const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { keccak256 } = ethers.utils;


describe('Events', function () {
  it('Check update event', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    const receipt = await tx.wait();

    const event = receipt.events?.filter((x) => {return x.event;})[0].event;
    expect(event).to.equal('UpdateRuntimeConfig');
  });

  it('Check Public mint event', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    runtimeConfig.publicMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const options = { value: hre.ethers.utils.parseEther('0.75') };

    const tx2 = await contract.mint(5, options);
    const receipt = await tx2.wait();

    const event = receipt.events?.filter((x) => {return x.event;})[0].event;
    expect(event).to.equal('Transfer');
  });

  it('Check Presale mint event', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    runtimeConfig.presaleMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const options = { value: hre.ethers.utils.parseEther('0.3') };

    const leafNodes = whiteListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    const tx2 = await contract.presaleMint(2, hexProof, options);
    const receipt = await tx2.wait();

    const event = receipt.events?.filter((x) => {return x.event;})[0].event;
    expect(event).to.equal('Transfer');
  });

  it('Check Free mint event', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    runtimeConfig.freeMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const leafNodes = freeListArray.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true });
    const hexProof = merkleTree.getHexProof(keccak256(SIGNER_ADDRESS));

    const tx2 = await contract.freeMint(hexProof);
    const receipt = await tx2.wait();

    const event = receipt.events?.filter((x) => {return x.event;})[0].event;
    expect(event).to.equal('Transfer');
  });

  it('Check transferOwnership event', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    const tx = await contract.transferOwnership('');
    const receipt = await tx.wait();

    const event = receipt.events?.filter((x) => {return x.event;})[0].event;
    expect(event).to.equal('RoleRevoked');
  });
});
