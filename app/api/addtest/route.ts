import { pinata } from "@/utils/clients"
import { NextResponse } from "next/server"

export async function POST (req: Request) {
    const file = new File(["sad"], "hello.txt", { type: "text/plain" })
    const upload = await pinata.upload.file(file)
    console.log(upload);
    return NextResponse.json(upload, { status: 200 });
  }
