const { ethers } = require('hardhat');
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

async function main() {

  const name = "Asset Warranty";
  
  const symbol = "ASW";
  
  const decimals = 0;

  
  const StockContract = await deploy('StockContract',name,symbol,decimals);
  
  console.log("StockContract deployed to:", StockContract.address);
  
  
  
  
  writeFileSync('output.json', JSON.stringify({
  
    StockContract: StockContract.address
  
  }, null, 2));
  
  const owner = await StockContract.getOwner();
  
  console.log("Owner address:", owner);
  
  
  
  
  }
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}