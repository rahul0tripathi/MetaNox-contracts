import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import config from "./constants";

async function main() {
  const [addr] = await ethers.getSigners();
  const builder1 = new ethers.Wallet(
    process.env.OTHER_PK || "",
    ethers.provider
  );
  const tokens = await ethers.getContractAt("NoxLands", config.powerUpCOntract);
  // const ownerTxn = await tokens.connect(addr).mint();

  // await setGreetingTx.wait();
  console.log(await tokens.balanceOf(builder1.address, 0));
  console.log(await tokens.balanceOf(addr.address, 0));
  console.log(parseEther("1000"));
  const transferNoxTxn = await tokens
    .connect(addr)
    .safeTransferFrom(
      addr.address,
      builder1.address,
      0,
      parseEther("1000"),
      "0x00"
    );
  await transferNoxTxn.wait();
  console.log(await tokens.balanceOf(builder1.address, 0));

  const transferCrate = await tokens
    .connect(addr)
    .safeTransferFrom(addr.address, builder1.address, 7, 50, "0x00");
  await transferCrate.wait();
  console.log(await tokens.balanceOf(builder1.address, 7));
  const transferTower = await tokens
    .connect(addr)
    .safeTransferFrom(addr.address, builder1.address, 6, 50, "0x00");
  await transferTower.wait();
  console.log(await tokens.balanceOf(builder1.address, 6));
  const transferHut = await tokens
    .connect(addr)
    .safeTransferFrom(addr.address, builder1.address, 4, 50, "0x00");
  await transferHut.wait();
  console.log(await tokens.balanceOf(builder1.address, 4));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
