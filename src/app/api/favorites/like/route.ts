import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export const POST = async (req:Request) =>
{
  try {
   const {title,ranking,image,addedBy} = await  req.json();
   await connectToDB(); 
   // adding anime 
   const addedAnime = await prisma.anime.create({data:
    {
    title,ranking,image,addedBy
    }
  });
   return NextResponse.json({addedAnime},{status:200});
  }
  catch(e){
    console.log(e)
    return NextResponse.json({message:"Internal Error"},{status:500});

  }
  finally {
   await prisma.$disconnect();
  }
}