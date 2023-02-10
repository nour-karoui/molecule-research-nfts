const MoleculeNFTFactory = artifacts.require("MoleculeNFTFactory");

module.exports = (deployer) => {
    deployer.deploy(MoleculeNFTFactory);
}