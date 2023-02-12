HELLO <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px"> This is Molecule's Patent NFTs
---

## ✂️ How is this project divided?
The project is divided into 3 main sections:
1. ***Molecule-truffle:*** The truffle project, containing all the smart contracts used for this project and their deployments configurations.
2. ***Molecule's platform:*** The Dapp that allows users to interact with our smart contracts, create collections containing NFTs and save their patents. [*Visit Molecule's test*](http://rvl-crowdfund-me.s3-website-us-east-1.amazonaws.com/)

## 🙌 What is Molecules Patent NFTs?
It is a **decentralized app for NFT creation** hosted on **Goerli Testnet** built with ***Truffle Framework***, ***ReactJs*** and ***ethers.js*** library.
1. Any user can create a patents collection.
2. Only allowed minters can mint NFTs in authorized collections.
3. any minter can have their contract data encrypted and uploaded on IPFS and added as metadata to the NFT.
4. The collection owner can add or revoke minters.
5. Any minter can have access to his key that was used for encrypting the contract data.


## 🎯 Running and Testing the project
> **In order to just run the DApp, you can skip this section since the smart contracts are already deployed. This section is for those who want to run, modify and test the smart contracts whether locally or in a testnet**

After cloning this repo, we will start with running and testing the blockchain part.
### 📒 The blockchain part

---

> Deploying the contract on a Testnet takes more time than deploying it locally so be patient.

Make sure to create .env file following the **.env.example** file

Run this command to install dependencies:
```shell
    cd molecule-truffle
    npm install truffle
```

**These are the main commands that would help you interact with our smart contracts:**
1. Compiling the contracts (this will generate a JSON file for each contract found in build/contracts)
    ```shell
        truffle compile
    ```
2. Deploying the contracts
    ```shell
        truffle migrate --network <NETWORK_NAME>
        truffle run verify <CONTRACT_NAME>
    ```
3. Interacting with the contracts
    ```shell
        truffle console --network <network-name>
    ```
### 🚀 Running The Molecule's DApp

---  	

> **The run the Faucet and Crowdfund you need both a Metamask wallet attached to your Browser, also you need some Goerli Ether**

> You can get some Goerli ETH on [This Faucet](https://goerlifaucet.com/).

<img width="358" alt="image" src="https://user-images.githubusercontent.com/47257753/211004734-9d0b3b93-606f-4270-9791-22ec10397e1b.png">

#### Running the DApp
To interact with the molecules app
```shell
    npm start
```
## 🔨 Tasks for the next developer
1. Solidity events handling, web3 client should be subscribed to the events emitted from the smart contracts 
2. Improve the encryption process, integrate a permissionless encryption scheme for better security than just sharing the key.
3. Implement unit testing for the smart contracts.
4. Add decryption process for the contract data