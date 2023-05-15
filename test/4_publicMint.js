const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const runtimeConfig = require('../src/config/runtime');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

const COAST_PRICE = hre.ethers.utils.parseEther('0.15');


describe('Public Mint', function () {
  it('Check if public minting is dissable ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.publicMintStart = Math.floor(
      new Date('2022-10-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.mintingActive()).to.be.false;
  });

  it('Check if public minting is active ', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.publicMintStart = Math.floor(
      new Date('2022-07-10 08:00').getTime() / 1000,
    );

    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    expect(await contract.mintingActive()).to.be.true;
  });

  it('Mint token', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.mintPrice = COAST_PRICE;
    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const result = await contract.mint(1, { value: COAST_PRICE });
    expect(result.hash).to.be.a('string');
  });

  it('Mint token again', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.mintPrice = COAST_PRICE;
    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const result = await contract.mint(1, { value: COAST_PRICE});
    expect(result.hash).to.be.a('string');
  });

  it('Mint 3 tokens again', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.mintPrice = COAST_PRICE;
    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const price = hre.ethers.utils.parseEther('0.45');

    const result = await contract.mint(3, { value: price });
    expect(result.hash).to.be.a('string');
  });

  it('Mint 11, check tokensPerMint value', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    runtimeConfig.mintPrice = COAST_PRICE;
    const tx = await contract.updateConfig(runtimeConfig);
    await tx.wait();

    const price = hre.ethers.utils.parseEther('1.65');

    await expect(contract.mint(11, { value: price })).to.be.reverted;
  });

  it('Check coast 0.15 Eth', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );
    const options = { value: hre.ethers.utils.parseEther('0.149') };

    await expect(contract.mint(1, options)).to.be.reverted;
  });
});
