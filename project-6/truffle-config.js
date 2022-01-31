const mnemonic =
  "desk rain bless test wise purchase brave mountain cement giggle task found";
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      provider: () => new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/"),
    },
  },
  compilers: {
    solc: {
      version: "0.8.2", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};