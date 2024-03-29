import { ethers } from "hardhat";

async function main() {
  const todo = await ethers.deployContract("ToDo");

  await todo.waitForDeployment();

  console.log(`ToDo contract has been deployed successfully to ${todo.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});