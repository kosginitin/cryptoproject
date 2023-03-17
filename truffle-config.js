const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      // gas: 4721975,
      // gasLimit: 3000,
      // gasPrice: 2000,
      // <-- Use this low gas price
    },
  },
  solc: {
    version: "0.6.0",
    optimizer: {
      enabled: true,
      // runs: 200,
    },
  },
};
