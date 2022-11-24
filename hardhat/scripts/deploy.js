const { ethers } = require("hardhat")
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants")

async function main() {
  // FakeNFTMarketplaceのコントラクトを最初にデプロイします。
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  )
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy()
  await fakeNftMarketplace.deployed()

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address)

  // CryptoDevsDAOコントラクトをデプロイします。
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO")
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      // お客様のアカウントに少なくとも1ETHがあることが前提です。
      // この値は任意に変更してください
      value: ethers.utils.parseEther("1"),
    }
  )
  await cryptoDevsDAO.deployed()

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address)
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})