import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export const POST = async (req:Request) =>
{
  type BodyType = {
    title: string, 
    ranking:number,
    image:string,
    addedBy:string
  }
  try {
   const {title,ranking,image,addedBy}:BodyType = await  req.json();
   await connectToDB(); 

 
  const animeExists = await prisma.anime.findFirst({
    where: {
     title
    },
  })

   if(!animeExists) {
      // adding anime 
   const addedAnime = await prisma.anime.create({data:
    {
    title,ranking,image,addedBy
    }
  });
   return NextResponse.json({addedAnime},{status:200});
   }
   else {
    return NextResponse.json({error:"This anime has been already added!"},{status:409});
   }
  }
  catch(e){
    console.log(e)
    return NextResponse.json({message:"Internal Error"},{status:500});

  }
  finally {
   await prisma.$disconnect();
  }
}