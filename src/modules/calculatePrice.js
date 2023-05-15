

// https://ethereum.stackexchange.com/questions/127955/how-to-calculate-usd-transaction-gas-cost-in-hardhat

function calculatePrice (gasUsed, gasPrice) {
  const gasCost = gasUsed.mul(gasPrice);
  const gasCostEth = hre.ethers.utils.formatEther(gasCost);

  const ETHUSD = 1140; // assume eth is $1200 usd
  const gasCostUsd = Number.parseFloat(gasCostEth * ETHUSD);

  console.log('gasUsed', gasUsed);
  console.log('gasPrice', gasPrice);
  console.log('gasCost', gasCost);
  console.log('gasCostEth', gasCostEth);
  console.log('gasCostUsd', Math.round(gasCostUsd * 100) / 100, '$');

}

module.exports = calculatePrice;
