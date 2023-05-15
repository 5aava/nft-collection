# Documentation


A collection contract is a feature-rich ERC721 contract that gives you access to advanced functionalties out of the box to launch your NFT collection. For example, you can use our API to launch a 10k PFP collection. For a detailed spec, see Deploy an NFT collection contract.

## Minting NFT

1. A `name` for your NFT.
2. A `description` for your NFT.
3. The chain where the NFT will be minted. We recommend Polygon which enables free and green NFT minting. In short, it's the leading layer 2 scaling solution built on top of Ethereum. Rinkeby is Ethereum's testnet.
4. The wallet address where to mint the NFT. If you want to mint to your own wallet, then provide your own wallet address (e.g. copy-paste from MetaMask). In both Polygon and Rinkeby cases, it's your regular Ethereum wallet address.
5. The file URL or upload the file that you want to turn to an NFT. All file types are supported including binary, images, GIFs, videos, audio, documents, text, etc.

# Compile a contract

## Task
```sh
yarn compile
```

# Deploy a contract

Deploys a fixed-supply ERC-721 smart contract, commonly used for launching NFT collections.

As blockchains can take a few seconds up to a few minutes to sync, then after contract deployment, you can use the returned transaction_hash in Retrieve a deployed contract to get the `contract_address`.

You can deploy up to 5 contracts for free on each of Polygon and Rinkeby, and max_supply is limited to less than or equal to 5,000 NFTs for collection contracts deployed on the Free plan. Ethereum contract deployments are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For details and limits, see pricing.

Useful for:
- Launching an NFT collection (e.g. a 10,000 profile pictures collection) with a minting website. See our tutorial to learn how to create an NFT contract collection and make a website to allows users to mint.

Related:
- To get the deployed contract address, use Retrieve a deployed contract.
- If you wish to list all your previously deployed collection contracts, see List all your deployed collection contracts.
- The contract ABI can be fetched using the Get contract ABI endpoing
## Task
```sh
yarn hardhat deploy
```

Data from `runtime` config file.

```js
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
  // The number of free token mints reserved for the contract owner
  reservedSupply: 1111,
  // The maximum number of tokens the user can mint per transaction.
  tokensPerMint: 10,
  // Treasury address is the address where minting fees can be withdrawn to.
  // Use `withdrawFees()` to transfer the entire contract balance to the treasury address.
  treasuryAddress: SIGNER_ADDRESS,
};
```

In the interactive box below, add your API key, set Content-Type as application/json and fill parameters with your own values. Set metadata_updatable to true so that the metadata of the NFT can be changed later as required.

In the request body, set the chain you want to deploy your collection on: ethereum (mainnet), polygon or rinkeby (testnet). If you want to deploy on Ethereum mainnet, you need to be a subscribed user. Deploying on Polygon is free for all users, with a collection size cap of `5,000` (subscribed users have unlimited collection max_supply). Ethereum deployments cost `$199` per contract for subscribed users.

Make sure you update all fields in the request with those appropriate for your contract: collection name, symbol, maximum number of `tokens`, `royalties`, etc. To set a royalty rate of 5%, set `royalties_share` as 500.


# Update a deployed collection contract

Updates a collection contract which has been previously deployed with Deploy an NFT collection contract. You can change the reveal dates, metadata location, presale time and whitelist, or royalty details. You can also freeze the metadata of the NFTs minted in the specified contract so metadata cannot be updated any more (token URIs are frozen on the contract level).

Ethereum contract updates are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For higher limits, see pricing.

Useful for:
- Revealing NFTs at a specified time and `freezing` them afterwards.
- Allowing a limited group of people to mint NFTs during a presale period.
- `Changing royalty` amount and recipient.

Related:
- If you wish to list all your previously deployed collection contracts, see List all your deployed collection contracts.

## Task
```sh
yarn hardhat update
```

Data from `runtime` config file.

```js
/// Updatable by admins and owner
module.exports = {
  // Minting price per token.
  mintPrice: utils.parseEther('0.15'),
  // Metadata base URI for tokens, NFTs minted in this contract will have metadata URI of `baseURI` + `tokenID`.
  // Set this to reveal token metadata.
  baseURI: 'https://thisIsBaseUri',
  // If true, the base URI of the NFTs minted in the specified contract can be updated after minting (token URIs
  // are not frozen on the contract level). This is useful for revealing NFTs after the drop. If false, all the
  // NFTs minted in this contract are frozen by default which means token URIs are non-updatable.
  metadataUpdatable: true,
  // Starting timestamp for public minting.
  publicMintStart: Math.floor(new Date('2022-06-11 11:30').getTime() / 1000),
  // Starting timestamp for whitelisted/presale minting.
  presaleMintStart: Math.floor(new Date('2022-06-11 11:30').getTime() / 1000),
  // Pre-reveal token URI for placholder metadata. This will be returned for all token IDs until a `baseURI`
  // has been set.
  prerevealTokenURI: '',
  // Root of the Merkle tree of whitelisted addresses. This is used to check if a wallet has been whitelisted
  // for presale minting.
  whitelistMerkleRoot: utils.hexZeroPad(wlMerkleRoot, 32), // utils.formatBytes32String([]),
  // This is used to check if a wallet has been freelisted for minting.
  freeMintMerkleRoot: utils.hexZeroPad(fmMerkleRoot, 32), // utils.formatBytes32String([]),
  // Secondary market royalties in basis points (100 bps = 1%)
  royaltiesBps: 500,
  // Address for royalties
  royaltiesAddress: SIGNER_ADDRESS,
};
```

### Responses

Returns transaction hash which can be used to confirm that the transaction was successful (blockchain transactions can take up to a few minutes depending on how congested the network is).



# Contract functions

## `withdrawFees`

## Task
```sh
yarn hardhat withdraw
```

### Withdraw balance from the contract to the treasury

Note: The minting price paid by the user will be transferred to the balance and can be withdrawn to the `treasury_address` at any time. To do this, you have to call the contract ABI. See function below:

```js
// To withdraw minting fees to the treasury address
// @dev Callable by admin (owner) roles only
function withdrawFees() external onlyRole(ADMIN_ROLE) {
  _deploymentConfig.treasuryAddress.sendValue(address(this).balance);
}
```

This can be done very easily using a block explorer like `Polygonscan` (for Polygon) or `Etherscan` (for Rinkeby).

Note: This operation can only be done by the `owner wallet`.


## `getInfo`

Get all metadata and info from smart contract
```sh
yarn hardhat getInfo
```

## `getTokenUri`

Get token URI by TokenId
```sh
yarn hardhat getTokenUri
```

## `isWhitelisted`

Check, if address is whitelisted
```sh
yarn hardhat isWhitelisted
```

## `freeMintByList`

Free Minting tokens to array list of addresses
```sh
yarn hardhat freeMintByList
```

## `mint`

Simple Minting some tokens to msg.sender address
```sh
yarn hardhat mint
```


## `ino`
Minting tokens to Launchpades address
```sh
yarn hardhat ino
```


# Tests
Check Tests
```
yarn test
```
