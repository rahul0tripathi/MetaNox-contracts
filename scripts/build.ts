import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import config from "./constants";

async function main() {
  // const signer = await ethers.getSigners();
  const builder1 = new ethers.Wallet(
    process.env.OTHER_PK || "",
    ethers.provider
  );
  const tokens = await ethers.getContractAt("NoxLands", config.powerUpCOntract);
  // const ownerTxn = await tokens.connect(addr).mint();

  // await setGreetingTx.wait();
  console.log(await tokens.balanceOf(builder1.address, 0));
  console.log(await tokens.balanceOf(builder1.address, 1));
  console.log("assets", await tokens.connect(builder1).getAssets(7));
  console.log(
    "is builder Free",
    await tokens.connect(builder1).isBuilderFree()
  );
  console.log(
    "currently building:",
    await tokens.connect(builder1).getCurrentlyBuildingAsset()
  );
  const buildTxn = await tokens.connect(builder1).buildNewAsset(7, "14", "13");
  await buildTxn.wait();
  console.log(
    "currently building:",
    await tokens.connect(builder1).getCurrentlyBuildingAsset()
  );
  console.log(
    "is builder Free",
    await tokens.connect(builder1).isBuilderFree()
  );
  console.log("assets", await tokens.connect(builder1).getAssets(7));
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
