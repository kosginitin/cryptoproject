var OverAll = artifacts.require("./OverAll.sol");

module.exports = function (deployer) {
  deployer.deploy(OverAll);
  {
    // gasPrice: 200;
  } // <-- Use this low gas price});
};
