import { ethers } from "hardhat";

describe("Lands", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [addr] = await ethers.getSigners();
    const transferTo = new ethers.Wallet(process.env.OTHER_PK || "");
    console.log(transferTo.address);
    const tokens = await ethers.getContractAt(
      "NoxLands",
      "0x4BfFF8a671c2d4277a950bC34d118527a2704548"
    );

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
