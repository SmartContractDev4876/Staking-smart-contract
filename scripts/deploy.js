const hre = require("hardhat");

async function main() {
    // Grab the contract factory 
    const MyNFTLiquidityPool = await hre.ethers.getContractFactory("MyNFTLiquidityPool");
    // const MyNFTCollection = await hre.ethers.getContractFactory("MyNFTCollection");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT1 = await MyNFTLiquidityPool.deploy(); // Instance of the contract 
    console.log("MyNFTLiquidityPool deployed to address:", myNFT1.address);
    // const myNFT2 = await MyNFTCollection.deploy(); // Instance of the contract 
    // console.log("MyNFTCollection deployed to address:", myNFT2.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });