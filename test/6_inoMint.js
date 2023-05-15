const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const { CONTRACT_NAME, CONTRACT_ADDRESS, SIGNER_ADDRESS } = process.env;


describe('Ino Mint', function () {

  it('For Launchpades mint 2000 token', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.INO('', 2000)).to.not.be.reverted;
  });

  it('For Launchpades mint 5001 token', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.INO('', 5001)).to.be.revertedWith('Amount too large');
  });

});
