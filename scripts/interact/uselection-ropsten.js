const hre = require("hardhat");
//there is some issue that might stemp from duplicate file name within the source root from what it states in
//https://stackoverflow.com/questions/53545800/internal-modules-cjs-loader-js582-throw-err
//const USElection = require("./artifacts/contracts/USelection.sol/USElection.json");
const USElection = require("/Users/dimitardzhalev/Workspace/USElection/artifacts/contracts/USelection.sol/USElection.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "ffec7024b09d49dda46422d090631777"
  );
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const electionContract = new hre.ethers.Contract(
    "0x99F27014FCFe29C9059778E3f5c9f7CDBA08A864",
    USElection.abi,
    wallet
  );

  const balance = await wallet.getBalance();

  console.log("Wallet balance is: ", balance);

  //sending transactions
  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);
  //get transaction hash
  console.log("State Result submission Transaction: ", transactionOhio.hash);
  const transactionReceipt = await transactionOhio.wait();
  if (transactionReceipt.status != 1) {
    console.log("transaction not successful");
    return;
  }

  const hasEnded = await electionContract.electionEnded();
  console.log("Election has ended: ", hasEnded);

  const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
  console.log("Have results for Ohio:", haveResultsForOhio);

  const currentLeader = await electionContract.currentLeader();
  console.log("the curent leader is: ", currentLeader);
};

run();
