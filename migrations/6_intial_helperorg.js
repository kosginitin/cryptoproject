var helperorg = artifacts.require("./HelperOrg.sol");

module.exports = function (deployer) {
  deployer.deploy(helperorg);
};
