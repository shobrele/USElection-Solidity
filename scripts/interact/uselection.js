const hre = require("hardhat");
//there is some issue that might stemp from duplicate file name within the source root from what it states in 
//https://stackoverflow.com/questions/53545800/internal-modules-cjs-loader-js582-throw-err
//const USElection = require("./artifacts/contracts/USelection.sol/USElection.json");
const USElection = require("/Users/dimitardzhalev/Workspace/USElection/artifacts/contracts/USelection.sol/USElection.json");

const run = async function(){
    const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:8545");
    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",provider);
    const electionContract = new hre.ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3",USElection.abi,wallet);
    //commenting the huge object
    //console.log(electionContract);

    //sending transactions
    // const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
    // const transactionReceipt = await transactionOhio.wait();
    // if(transactionReceipt.status !=1 ){
    //     console.log("transaction not successful");
    //     return;
    // }

    const hasEnded = await electionContract.electionEnded();
    console.log("Election has ended: ", hasEnded);

    const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
    console.log("Have results for Ohio:", haveResultsForOhio);

    const currentLeader = await electionContract.currentLeader();
    console.log("the curent leader is: ", currentLeader);
}

run();