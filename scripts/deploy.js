async function main() {
    // Grab the contract factory 
    const MedNFT = await ethers.getContractFactory("FileStorage");
  
    const initialOwner = "0xda2f9041b89EbB9011bDA23118941EFFcE3D1748"
  
    // Start deployment, returning a promise that resolves to a contract object
    const medNFT = await MedNFT.deploy(initialOwner); // Instance of the contract 
    console.log("Contract deployed to address:", medNFT.target);
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });