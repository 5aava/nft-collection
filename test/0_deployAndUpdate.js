const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const deploymentConfig = require('../src/config/deployment');
const runtimeConfig = require('../src/config/runtime');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { CONTRACT_NAME, SIGNER_ADDRESS } = process.env;


describe('Check deploy parameters', function () {

  it('Deploy contract', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.not.be.reverted;
  });

  it('Check empty baseURI in runtimeConfig', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    runtimeConfig.baseURI = '';

    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.be.revertedWith('BaseURI string cannot be null');
  });

  it('Check empty prerevealTokenURI in runtimeConfig', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    runtimeConfig.baseURI = 'https://thisIsBaseUri';
    runtimeConfig.prerevealTokenURI = '';

    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.be.revertedWith('PrerevealURI string cannot be null');
  });

  it('Check Royalties too high ', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    runtimeConfig.prerevealTokenURI = 'https://thisIsPrerevealUri';
    runtimeConfig.royaltiesBps = 10500;

    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.be.revertedWith('Royalties too high');
  });

  it('Check empty royaltiesAddress in runtimeConfig ', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    runtimeConfig.royaltiesBps = 500;
    runtimeConfig.royaltiesAddress = '';


    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.be.reverted;
  });

  it('Check empty treasuryAddress in runtimeConfig ', async () => {
    const NEOGEN = await hre.ethers.getContractFactory(
      CONTRACT_NAME,
    );

    runtimeConfig.royaltiesAddress = SIGNER_ADDRESS;
    runtimeConfig.treasuryAddress = '';


    await expect(NEOGEN.deploy(
      deploymentConfig,
      runtimeConfig,
    )).to.be.reverted;

    runtimeConfig.treasuryAddress = SIGNER_ADDRESS;
  });

});
