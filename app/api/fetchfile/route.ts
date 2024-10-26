import { pinata } from "@/utils/clients";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { cid } = await req.json();
  if (!cid) {
    return NextResponse.json({ error: "CID not found" }, { status: 400 });
  }
  const data = await pinata.gateways.get(cid);
  console.log(data);
  return NextResponse.json(data, { status: 200 });
}