import { ethers } from "ethers";
import { pinata } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    console.log(file);
    // const upload = await pinata.upload.file(file as File);
    // console.log(upload);
    // return NextResponse.json(upload, { status: 200 });

    // Upload file to IPFS
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });
    const { IpfsHash } = await res.json();
    console.log(typeof IpfsHash);

    // const uri = upload.IpfsHash;
    // console.log(upload);

    // Interact with the smart contract
    return NextResponse.json({ cid: IpfsHash });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file and store CID" },
      { status: 500 }
    );
  }
}
