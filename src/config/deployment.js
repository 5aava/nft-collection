const { SIGNER_ADDRESS } = process.env;


/// Fixed at deployment time
module.exports = {
  // Name of the NFT contract.
  name: 'NEOGEN',
  // Symbol of the NFT contract.
  symbol: 'NEOGEN',
  // The contract owner address. If you wish to own the contract, then set it as your wallet address.
  // This is also the wallet that can manage the contract on NFT marketplaces. Use `transferOwnership()`
  // to update the contract owner.
  owner: SIGNER_ADDRESS,
  // The maximum number of tokens that can be minted in this collection.
  maxSupply: 11111,
};
