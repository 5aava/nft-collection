# iRocket NEOGEN contract

NEOGEN contract for 11111 NFT tokens

## Start 
```sh
yarn install
yarn start

# show http://localhost:3000
```

## Test Solidity Smart Contract 

- Ethereum Smart Contract
  - Solidity 0.8.9
  - hardhat
  - Infura
  - alchemy
  - tasks
  - tests

## Compile and deploy contract

```sh
# start local hardhat node
yarn hardhat node

# hardhat compile contract
yarn hardhat compile

# tests
yarn test

# show accounts
yarn hardhat accounts --network localhost
yarn hardhat accounts --network rinkeby

# tasks
yarn hardhat deploy
yarn hardhat update

yarn hardhat getInfo
yarn hardhat mint --amount

``` 
