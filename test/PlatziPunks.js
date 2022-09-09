const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PlatziPunks", function () {
  let platzi_punks;
  beforeEach(async function () {
    const PlatziPunks = await ethers.getContractFactory("PlatziPunks");
    platzi_punks = await PlatziPunks.deploy(2);
    await platzi_punks.deployed();
  })

  describe("tokenURI", async function () {
    it("Should throw an error if tokenId don't exists", async function () {
      try {
        await platzi_punks.tokenURI(0)
        expect.fail('fail with an error');
      } catch (error) {
        expect(error.message).to.contains('ERC721Metadata: URI query for nonexistent token');
      }
    });

    it("Should return the correct tokenURI protocol mime type", async function () {
      await platzi_punks.mint()
      expect(await platzi_punks.tokenURI(0)).to.includes("data:application/json;base64,");
    });

    it("Should name token with correct number based on tokenId", async function () {
      await platzi_punks.mint()
      await platzi_punks.mint()

      expect(await platzi_punks.tokenURI(0)).to.includes(
        Buffer.from('{ "name": "PlatziPunks #0"').toString('base64').slice(0, -1)
      );
      expect(await platzi_punks.tokenURI(1)).to.includes(
        Buffer.from('{ "name": "PlatziPunks #1"').toString('base64').slice(0, -1)
      );
    });
  })

});