// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.4",
// };


/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  //  solidity: "0.8.6",
  //  settings: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 200
  //   }
  // },
   defaultNetwork: "rinkeby",
   // networks: {
   //    hardhat: {},
   //    ropsten: {
   //       url: API_URL,
   //       accounts: [`0x${PRIVATE_KEY}`],
   //       gasPrice: 8000000000
   //    }
   // },
   networks: {
      hardhat: {},
      rinkeby: {
        url: API_URL, //Infura url with projectId
        accounts: [`0x${PRIVATE_KEY}`], // add the account that will deploy the contract (private key)
        gasPrice: 8000000000
      },

     }
}