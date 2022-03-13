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
  const buildTxn = await tokens.connect(builder1).buildNewAsset(1, "10", "20");
  await buildTxn.wait();
  console.log(
    "currently building:",
    await tokens.connect(builder1).getCurrentlyBuildingAsset()
  );
  console.log(
    "is builder Free",
    await tokens.connect(builder1).isBuilderFree()
  );
  console.log("assets", await tokens.connect(builder1).getAssets(1));
  console.log("trying to build once again");
  try {
    const buildTxn2 = await tokens
      .connect(builder1)
      .buildNewAsset(1, "10", "20");
    await buildTxn2.wait();
  } catch (error) {
    console.log("build failed", error);
  }
  console.log("wating for 60s");
  setTimeout(async () => {
    console.log(
      "currently building:",
      await tokens.connect(builder1).getCurrentlyBuildingAsset()
    );
    console.log(
      "is builder Free",
      await tokens.connect(builder1).isBuilderFree()
    );
    console.log("assets", await tokens.connect(builder1).getAssets(1));
  }, 60 * 1000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
