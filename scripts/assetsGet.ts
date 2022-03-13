import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import config from "./constants";

async function main() {
  const builder1 = new ethers.Wallet(
    process.env.OTHER_PK || "",
    ethers.provider
  );
  const tokens = await ethers.getContractAt("NoxLands", config.powerUpCOntract);
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
