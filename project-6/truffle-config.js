require("dotenv").config();

const INFURA_KEY = "<INFURA_KEY>";
const MNEMONIC = "<MNEMONIC>";

const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      provider: () => new HDWalletProvider(MNEMONIC, "http://127.0.0.1:7545/"),
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          `https://rinkeby.infura.io/v3/${INFURA_KEY}`
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.2", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};
