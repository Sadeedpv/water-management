import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const date = searchParams.get("date");
  await prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error: any) => console.log("DB Connection Error: ", error));
  if (email && date) {
    const model = await prisma.waterModel.findMany({
      where: {
        ModelEmail: email,
        Date: date,
      },
    });
    try {
      return NextResponse.json({ model }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ err });
    }
  }
}



export async function PUT(req: NextRequest) {
  await prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error: any) => console.log("DB Connection Error: ", error));

  let request = await req.json();
  let email = request.email;
  let modelname = request.modelname;
  let usage = request.usage;
  let date = request.date;
  let id = request.id;

  if (email && modelname && usage && date) {
      const update = await prisma.waterModel.update({
        where: {
          id: id,
          ModelEmail: email,
          Modelname: modelname,
          Date: date,
        },
      data: {
        totalUsage: usage,
      },
    });
    try {
      return NextResponse.json({ update }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    try {
      return NextResponse.json({ "message":"Incorrect PUT data" }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ err });
    }
  }
}


export async function POST(req: NextRequest) {
  await prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error: any) => console.log("DB Connection Error: ", error));

  let request = await req.json();
  let email = request.email;
  let modelname = request.modelname;
  let limit = request.limit;
  let date = request.date;

  if (email && modelname && limit && date) {
    const update = await prisma.waterModel.create({
      data: {
        ModelEmail: email,
        Modelname: modelname,
        UsageLimit: limit,
        Date: date,
      },
    });
    try {
      return NextResponse.json({ update }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    try {
      return NextResponse.json(
        { message: "Incorrect POST data" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json({ err });
    }
  }
}
