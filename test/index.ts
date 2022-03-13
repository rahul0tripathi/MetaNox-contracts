import { ethers } from "hardhat";

describe("Lands", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [addr, transferTo] = await ethers.getSigners();
    const tokens = await ethers.getContractAt(
      "NoxLands",
      "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44"
    );

    // const ownerTxn = await tokens.connect(addr).mint();

    // await setGreetingTx.wait();
    console.log(await tokens.balanceOf(addr.address, 0));
    console.log(await tokens.balanceOf(addr.address, 1));
    console.log(await tokens.balanceOf(addr.address, 2));
    console.log(await tokens.balanceOf(addr.address, 3));
    console.log(await tokens.balanceOf(addr.address, 4));
    console.log(await tokens.balanceOf(addr.address, 5));
    console.log(await tokens.balanceOf(addr.address, 6));
    console.log(await tokens.balanceOf(addr.address, 7));
    const transferNoxTxn = await tokens
      .connect(addr)
      .safeTransferFrom(addr.address, transferTo.address, 0, 50000, "0x00");
    await transferNoxTxn.wait();
    console.log(await tokens.balanceOf(transferTo.address, 0));

    const transferCannon = await tokens
      .connect(addr)
      .safeTransferFrom(addr.address, transferTo.address, 1, 50, "0x00");
    await transferCannon.wait();
    console.log(await tokens.balanceOf(transferTo.address, 1));
  });
});
