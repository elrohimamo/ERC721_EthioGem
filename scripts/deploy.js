const { ethers } = require("hardhat")

async function main() {
  const EthioGem = await ethers.getContractFactory("EthioGem")
  const ethioGem = await EthioGem.deploy()

  await ethioGem.deployed()
  console.log(`Contract successfully deployed to ${ethioGem.address}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });