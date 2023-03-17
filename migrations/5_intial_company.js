var company = artifacts.require("./Company.sol");

module.exports = function (deployer) {
  deployer.deploy(company);
};
