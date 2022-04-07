const hre = require("hardhat");

const run = async function() {
    //get latest block hash
	const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:8545");
    const latestBlock = await provider.getBlock("latest");
    console.log("latest block on the node: " + latestBlock.hash);

    //connect to deployer wallet of our contract and query the balance
    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();
    //two ways
    console.log("balance to string: " + balance.toString());
    console.log("balance hre.ethers.utils.formatether: " + hre.ethers.utils.formatEther(balance,18));
}

run();