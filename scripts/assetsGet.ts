import { ethers } from "hardhat";

async function main() {
  const signer = await ethers.getSigners();
  const builder1 = signer[1];
  const tokens = await ethers.getContractAt(
    "NoxLands",
    "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44"
  );
  // const ownerTxn = await tokens.connect(addr).mint();

  // await setGreetingTx.wait();
  console.log(await tokens.balanceOf(builder1.address, 0));
  console.log(await tokens.balanceOf(builder1.address, 1));
  console.log("assets", await tokens.connect(builder1).getAssets(1));
  console.log(
    "is builder Free",
    await tokens.connect(builder1).isBuilderFree()
  );
  console.log(
    "currently building:",
    await tokens.connect(builder1).getCurrentlyBuildingAsset()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
