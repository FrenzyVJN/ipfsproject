import { pinata } from "@/utils/clients";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cid = await req.json();
  
  console.log(cid.hash);
  if (!cid.hash) {
    return NextResponse.json({ error: "CID not found" }, { status: 400 });
  }
  const data = await pinata.gateways.get(cid.hash);
  console.log(data);
  return NextResponse.json(data, { status: 200 });
}