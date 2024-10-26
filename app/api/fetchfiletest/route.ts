import { pinata } from "@/utils/clients";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = await pinata.gateways.get(
    "bafkreicfzgtgct6m2t4vslmcqospew77qqdw7vb65h4q5kqhorxlx3iczi"
  );
  console.log(data);
  return NextResponse.json(data, { status: 200 });
}