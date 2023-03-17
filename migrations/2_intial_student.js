var Student = artifacts.require("./Student.sol");

module.exports = function (deployer) {
  deployer.deploy(Student);
};
