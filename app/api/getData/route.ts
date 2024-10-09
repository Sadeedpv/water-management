import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET() {
    const feed = await prisma.user.findMany();
    let response = NextResponse.json({ "data": {feed} });
    return response;
}