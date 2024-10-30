
import Web3 from 'web3';

const web3 = new Web3(`https://mainnet.infura.io/v3/3c86d91fe24a4c3b9137ef9cefae3308`);
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_fileId",
                "type": "uint256"
            }
        ],
        "name": "getFile",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fileCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "files",
        "outputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


const fileStorageContract = new web3.eth.Contract(contractABI, contractAddress);

export const uploadFileToBlockchain = async (cid) => {
    const account = web3.eth.accounts.privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
    
    const data = fileStorageContract.methods.uploadFile(cid).encodeABI();
    
    const tx = {
        to: contractAddress,
        data: data,
        gas: 3000000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        nonce: await web3.eth.getTransactionCount(account.address),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt;
};
