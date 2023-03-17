# DAPP-EDU-VERIFICATION

## SETTING FOR DEVELOPMENT SETUP
### Setting up truffle and react
###### install truffle using `npm install -g truffle` version 5.^ 
###### run `truffle test` 
###### run `truffle migrate`
###### run `truffle compile`

###### to create a truffle react app
###### run 'truffle unbox react' --creates boilerplate for truffle environment and react app

###### goto ~project/ cd client
###### run 'npm start' to start the client(react app)

### install ganache gui (for local test network)
 ###### run ganche gui to start the local test network
###### create new workspace in ganache and set network rpc url to http://localhost:8545

### solidity contracts
###### write solidity contracts in ~project/contracts/
###### write contract migration in ~project/migrations/

######  run 'truffle compile' to migrate the contracts
###### run 'truffle migrate' to migrate the contracts

###### contracts developed in solidity are compiled to javascript
###### in truffle config js set contracts build directory to ~project/client/contracts

###### contracts developmnet
###### BASE ONE ==== OverAllContract.sol==>Organisation.sol==>Student.sol==>Certificate.sol
###### OVERALL CONTRACT uses Helper.sol as helper contract to write neat code

###### BASET TWO ==== OverAllTwo.sol==>Company.sol==>Jobs.sol
###### overallTwo.sol uses HelperTwo.sol as helper contract to write neat code


### CLIENT PACKAGES INSTALLED
###### web3 ==> npm install web3 (^1.6.1) ==>used to connect to the local test network from client
###### crypto ==> npm install crypto(^1.0.1) ==>used to encrypt the data to calculate the hash in merklee hash
###### ipfs-http-client ==> npm install ipfs-http-client(^56.0.3) ==>used to upload the data to ipfs
###### file-saver ==> npm install file-saver (^2.0.5) ==>used to download the data from ipfs(from url)




