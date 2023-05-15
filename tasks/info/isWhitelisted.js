const { CONTRACT_NAME, CONTRACT_ADDRESS } = process.env;

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');


task('isWhitelisted', 'isWhitelisted')
  .addParam('addr', 'The account\'s address')
  .setAction(async (taskArgs) => {

    const addr = taskArgs.addr;
    const whiteListArray = require('../../src/lists/whitelist');

    const leafNodes = whiteListArray.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sort: true});
    const hexProof = merkleTree.getHexProof(keccak256(addr));

    const contract = await hre.ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);

    console.log(await contract.isWhitelisted(addr, hexProof));
  });
