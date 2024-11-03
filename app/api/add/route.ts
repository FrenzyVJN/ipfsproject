import { pinata } from "@/utils/clients";
import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function POST(req: Request) {
  const body = await req.json();
    console.log(body)
//   const file = formData.file;
//   const address = formData.address;
// console.log(file);
  const contractAddress = "0x7123e30b0b00948B3371d45FE39b72bA1b64EBa7"; // Replace with your deployed contract address
  const contractABI = [
    {
      type: "constructor",
      inputs: [
        { name: "initialOwner", type: "address", internalType: "address" },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addCid",
      inputs: [{ name: "cid", type: "string", internalType: "string" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "clearCids",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "listCids",
      inputs: [],
      outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "removeCid",
      inputs: [{ name: "cid", type: "string", internalType: "string" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "OwnableInvalidOwner",
      inputs: [{ name: "owner", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "OwnableUnauthorizedAccount",
      inputs: [{ name: "account", type: "address", internalType: "address" }],
    },
  ];
  //https://polygon-amoy.blockpi.network/v1/rpc/public
  const contract = new ethers.Contract(contractAddress, contractABI, body.signer);

  const unsignedTx = await contract.addCid(body.cid);

  // const signedTx = await body.signer.signTransaction(unsignedTx);

    return NextResponse.json({ status: 200 });
}