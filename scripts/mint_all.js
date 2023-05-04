const ethers = require("ethers");
const contractABI = require("../artifacts/contracts/EthioGem.sol/EthioGem.json").abi;
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_ENDPOINT);	
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function mintAll() {
  try {
    const result = await contract.mintAll();
    console.log("Minting all gemstones:", result);
  } catch (err) {
    console.error("Error minting all gemstones:", err);
  }
}

mintAll();
