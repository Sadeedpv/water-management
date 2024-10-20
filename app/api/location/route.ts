import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    await prisma
        .$connect()
        .then(() => console.log("Connected to DB"))
        .catch((error: any) => console.log("DB Connection Error: ", error));
    const location = await prisma.user.findUnique({
        where: {
            email: email || '',
        },
        select: {
            location: true,
        }
    });
  try {
    return NextResponse.json({ location });
  } catch (err) {
    return NextResponse.json({ err });
  }
}

export async function PUT(req: NextRequest) {
  await prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error: any) => console.log("DB Connection Error: ", error));

  let request = await req.json();
  let email = request.email;
  let location = request.location;
  const update = await prisma.user.update({
    where: {
      email: email,
      },
      data: {
        location: location,
      },
  });
    try {
      return NextResponse.json({ update }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }
 
 

