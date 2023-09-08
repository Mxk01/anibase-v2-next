import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export const GET = async (req,{params}) => {
  try {
    console.log(req.url)
    await connectToDB();

    const myAnime = await prisma.anime.findMany({
      where: {
        addedBy: params.email,
      },
    });

    if (myAnime) {
      return NextResponse.json({ myAnime }, { status: 200 });
    } else {
      return NextResponse.json({ error: "You don't have any anime added!" }, { status: 409 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({message:params.email }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
