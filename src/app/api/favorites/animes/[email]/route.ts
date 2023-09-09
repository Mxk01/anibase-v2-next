import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export const GET = async (req,{params}) => {
  try {
    const pattern = /(?:\?|&)page=(\d+)(?![\d\D]*[?&]page=\d+)/;
    const match = req.url.match(pattern);

    await connectToDB();
    if (match) {
      const lastNumber = match[1];
      console.log(lastNumber)
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
    }

  } catch (e) {
    console.error(e);
    return NextResponse.json({message:"Cannot get anime!" }, { status: 404 });
  } finally {
    await prisma.$disconnect();
  }
};
