import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const feed = await prisma.user.findMany();
    let response = NextResponse.json({ data: { feed } });
    try {
        
        return response;
    } catch (err) {
        return NextResponse.json({ err })
    }
}

export async function POST(req: NextRequest) {
  await prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error: any) => console.log("DB Connection Error: ", error));

  let request = await req.json();
  let email = request.email;
  let name = request.name;
  const User = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  if (User.length == 0) {
    const create = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    prisma.$disconnect();
    try {
      return NextResponse.json({ create }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    try {
      return NextResponse.json({ "message":"User already exist" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }
}
