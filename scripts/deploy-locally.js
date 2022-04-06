const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

  // We get the contract to deploy
  const USElection = await hre.ethers.getContractFactory("USElection");
  const usElection = await USElection.deploy();

  await usElection.deployed();

  console.log("USElection deployed to:", usElection.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
