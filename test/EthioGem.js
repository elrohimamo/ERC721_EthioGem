// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@openzeppelin/contracts/utils/Address.sol";
// import "chai";
// import "hardhat-deploy-ethers/dist/src/typechain/contracts";
// import {ethers} from "hardhat";
// const { expect } = chai;


const { expect } = require("chai");
const hre = require("hardhat");

describe("EthioGem", function () {
  let EthioGem;
  let ethioGem;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    EthioGem = await ethers.getContractFactory("EthioGem");
    ethioGem = await EthioGem.deploy();
    await ethioGem.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ethioGem.owner()).to.equal(owner.address);
    });

    it("Should set the right name and symbol", async function () {
      expect(await ethioGem.name()).to.equal("EthioGem");
      expect(await ethioGem.symbol()).to.equal("ETG");
    });
  });

  describe("Minting", function () {
    it("Should mint a new gemstone", async function () {
      await ethioGem.mint("Test Gemstone", "https://test.com/image.png", "https://test.com/metadata.json");
      expect(await ethioGem.balanceOf(owner.address)).to.equal(1);
    });

    it("Should not allow minting from non-owner account", async function () {
      await expect(
        ethioGem.connect(addr1).mint("Test Gemstone", "https://test.com/image.png", "https://test.com/metadata.json")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("MintAll", function () {
    it("Should mint all gemstones", async function () {
      await ethioGem.mintAll();
      expect(await ethioGem.balanceOf(owner.address)).to.equal(4);
    });

    it("Should not allow minting from non-owner account", async function () {
      await expect(
        ethioGem.connect(addr1).mintAll()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
