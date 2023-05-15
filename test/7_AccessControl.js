const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

describe('Access Control Tests', function () {
  it('Grant Admin Rights', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.grantAdminRights('')).to.not.be.reverted;
  });

  it('Revoke Admin Rights', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.revokeAdminRights('')).to.not.be.reverted;
  });


  it('Transfer Ownership', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.transferOwnership('')).to.not.be.reverted;
  });

  it('Grant Admin Rights Error', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.grantAdminRights('')).to.be.reverted;
  });

  it('Revoke Admin Rights Error', async () => {
    const contract = await hre.ethers.getContractAt(
      CONTRACT_NAME,
      CONTRACT_ADDRESS,
    );

    await expect(contract.revokeAdminRights('')).to.be.reverted;
  });

});
