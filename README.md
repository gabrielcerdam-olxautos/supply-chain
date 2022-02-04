# STATUS

IPFS is not implemented.

To do first Harvest in localblockchain you need to restart your nonce.

# General purpose

This project use testing address, don't use it to your public/personal wallet.

# UML Diagrams

[UML Diagrams](https://lucid.app/folder/invitations/accept/inv_34aafff6-f9d6-461a-a369-8cf2b6a48879)

# Structure

### Coffee Access Control

- FarmerRole is AccessControlEnumerable
- DistributorRole is AccessControlEnumerable
- RetailerRole is AccessControlEnumerable
- ConsumerRole is AccessControlEnumerable

### Coffee Base

- SupplyChain is RetailerRole, FarmerRole, DistributorRole, ConsumerRole, Ownable

### Coffee Core

- Ownable

# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

### Installing

Change directory to `project-6` folder and install all requisite npm packages (as listed in `package.json`):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder `build\contracts`.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

In a separate terminal window, launch the DApp:

```
npm run dev
```

#Rinkeby Scan

[SupplyChain contract](https://rinkeby.etherscan.io/address/0xE20163a6C55d14F62f2eC018b4B92E2cb249cfe5)

[ConsumerRole contract](0xed02fe6ecd2ae7a0406b94454fa340f192a733cf662ae5b284f1fd5a7e8cbbb4)

[RetailerRole contract](https://rinkeby.etherscan.io/address/0xfE70a6D8eb7b473fAA9c9604bEF9Af580B948C4a)

[DistributeRole contract](https://rinkeby.etherscan.io/address/0xA65E780f2F1ca84AD38856218930Ac36Bd236C8b)

[FarmerRole contract](https://rinkeby.etherscan.io/address/0x26CFf462C18290ec9B74BF4053a9d6f739A26179)

# Detail of migrate to rinkeby network

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > block number:        10112666
   > block timestamp:     1644012259
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.981554626972256978
   > gas used:            1376726 (0x1501d6)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01376726 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > block number:        10112667
   > block timestamp:     1644012282
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.967788206972256978
   > gas used:            1376642 (0x150182)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01376642 ETH


   Deploying 'RetailerRole'
   ------------------------
   > block number:        10112668
   > block timestamp:     1644012302
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.954020946972256978
   > gas used:            1376726 (0x1501d6)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01376726 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > block number:        10112669
   > block timestamp:     1644012324
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.940253686972256978
   > gas used:            1376726 (0x1501d6)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01376726 ETH


   Deploying 'SupplyChain'
   -----------------------
   > block number:        10112670
   > block timestamp:     1644012400
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.903118226972256978
   > gas used:            3713546 (0x38aa0a)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03713546 ETH

   -------------------------------------
   > Total cost:          0.09220366 ETH


Summary
=======
> Total deployments:   5
> Final cost:          0.09220366 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0xf06269fde50615f1bd9899462e8cc030aa59c31ce5cefe969188775ec7f2f41e
   > Blocks: 1            Seconds: 8
   > contract address:    0x26CFf462C18290ec9B74BF4053a9d6f739A26179
   > block number:        10112678
   > block timestamp:     1644012447
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.980908626972256978
   > gas used:            1441326 (0x15fe2e)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01441326 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0xacdcdc894dd7318f6f406d1f623e6e27d4297b659f7909227fc45a3a6ecd874d
   > Blocks: 1            Seconds: 8
   > contract address:    0xA65E780f2F1ca84AD38856218930Ac36Bd236C8b
   > block number:        10112679
   > block timestamp:     1644012462
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.966496206972256978
   > gas used:            1441242 (0x15fdda)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01441242 ETH


   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0x02f6e296600976eec7c261ac8d33b43bf75565887568d615577992e755092676
   > Blocks: 0            Seconds: 8
   > contract address:    0xfE70a6D8eb7b473fAA9c9604bEF9Af580B948C4a
   > block number:        10112680
   > block timestamp:     1644012477
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.952082946972256978
   > gas used:            1441326 (0x15fe2e)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01441326 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0xed02fe6ecd2ae7a0406b94454fa340f192a733cf662ae5b284f1fd5a7e8cbbb4
   > Blocks: 1            Seconds: 8
   > contract address:    0xC365eF6DD9bb011D38f6E93691A9DB14B7C1ecB8
   > block number:        10112681
   > block timestamp:     1644012492
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.937669686972256978
   > gas used:            1441326 (0x15fe2e)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01441326 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xfec590107b1f0795a38db3bb884ea9b8b303134401d9ca6029d86bcfa2818f8d
   > Blocks: 1            Seconds: 9
   > contract address:    0xE20163a6C55d14F62f2eC018b4B92E2cb249cfe5
   > block number:        10112682
   > block timestamp:     1644012507
   > account:             0x3CAE6bAD2706605A438DD1Cf6B48076896d2f9EE
   > balance:             0.896855226972256978
   > gas used:            4081446 (0x3e4726)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.04081446 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.09846666 ETH


Summary
=======
> Total deployments:   5
> Final cost:          0.09846666 ETH
```

## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
  to make the web faster, safer, and more open.
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

- Solidity
- Ganache-cli
- Truffle
- IPFS
