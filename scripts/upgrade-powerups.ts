/* eslint-disable prettier/prettier */
import { ethers, upgrades } from "hardhat";
// eslint-disable-next-line node/no-missing-import
const proxyAddress ="0xB950552A377f9d4F67F245671b19CD9130Dc798E";
async function main() {
  const [signer] = await ethers.getSigners();
  console.log(signer.address);
  const Token = await ethers.getContractFactory("NoxLands", {
    signer: signer,
  });
  const mc = await upgrades.upgradeProxy(proxyAddress, Token);
  // const mc = await upgrades.deployProxy(Token);

  await mc.deployed();
  console.log("MyCollectible deployed to:", mc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
