const hre = require("hardhat");

async function main() {
    // Grab the contract factory 
    const MyNFTLiquidityPool = await hre.ethers.getContractFactory("MyNFTLiquidityPool");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFTLiquidityPool.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", myNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });