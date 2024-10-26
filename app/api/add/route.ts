import { pinata } from '@/utils/clients';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file');
    const upload = await pinata.upload.file(file as File);
    console.log(upload);
    return NextResponse.json(upload, { status: 200 });
}
