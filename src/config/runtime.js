const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { utils } = require('ethers');
const { SIGNER_ADDRESS } = process.env;

const whiteListArray = require('../lists/whitelist');
const wlLeafNodes = whiteListArray.map((addr) => keccak256(addr));
const wlMerkleTree = new MerkleTree(wlLeafNodes, keccak256, { sort: true });
const wlMerkleRoot = wlMerkleTree.getHexRoot();

const freeMintArray = require('../lists/freeMint');
const fmLeafNodes = freeMintArray.map((addr) => keccak256(addr));
const fmMerkleTree = new MerkleTree(fmLeafNodes, keccak256, { sort: true });
const fmMerkleRoot = fmMerkleTree.getHexRoot();

/// Updatable by admins and owner
module.exports = {
  // Minting price per token.
  mintPrice: utils.parseEther('0.08'),
  // Metadata base URI for tokens, NFTs minted in this contract will have metadata URI of baseURI + tokenID.
  // Set this to reveal token metadata.
  baseURI: '',
  // If true, the base URI of the NFTs minted in the specified contract can be updated after minting (token URIs
  // are not frozen on the contract level). This is useful for revealing NFTs after the drop. If false, all the
  // NFTs minted in this contract are frozen by default which means token URIs are non-updatable.
  metadataUpdatable: true,
  // Starting timestamp for public minting.
  publicMintStart: Math.floor(new Date('2022-08-11 08:00').getTime() / 1000),
  // Starting timestamp for whitelisted/presale minting.
  presaleMintStart: Math.floor(new Date('2022-09-11 08:00').getTime() / 1000),
  //
  presaleMintEnd: Math.floor(new Date('2022-09-13 18:00').getTime() / 1000),
  //
  freeMintStart: Math.floor(new Date('2022-08-16 08:00').getTime() / 1000),
  //
  freeMintEnd: Math.floor(new Date('2022-09-16 18:00').getTime() / 1000),
  // Pre-reveal token URI for placholder metadata. This will be returned for all token IDs until a baseURI
  // has been set.
  prerevealTokenURI: 'ipfs://...',
  // Root of the Merkle tree of whitelisted addresses. This is used to check if a wallet has been whitelisted
  // for presale minting.
  whitelistMerkleRoot: utils.hexZeroPad(wlMerkleRoot, 32), // utils.formatBytes32String([]),
  // This is used to check if a wallet has been freelisted for minting.
  freeMintMerkleRoot: utils.hexZeroPad(fmMerkleRoot, 32), // utils.formatBytes32String([]),
  // Secondary market royalties in basis points (100 bps = 1%)
  royaltiesBps: 500,
  // Address for royalties
  royaltiesAddress: SIGNER_ADDRESS,
  // Treasury address is the address where minting fees can be withdrawn to.
  // Use withdrawFees() to transfer the entire contract balance to the treasury address.
  treasuryAddress: SIGNER_ADDRESS,
};
