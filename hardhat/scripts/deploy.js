const hre = require("hardhat")

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  console.log(111111111111);
  const tokenContract = await hre.ethers.deployContract("Token")
  console.log("Token deployed to:", tokenContract.target);

  const exchangeContract = await hre.ethers.deployContract("Exchange", [tokenContract.target])
  console.log("Exchange deployed to:", exchangeContract.target);

  await sleep(30 * 1000)

  await hre.run("verify:verify", {
    address: tokenContract.target,
    constructorArguments: [],
    contract: "contracts/Token.sol:Token",
  });

  await hre.run("verify:verify", {
    address: exchangeContract.target,
    constructorArguments: [tokenContract.target],
  });
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1
})