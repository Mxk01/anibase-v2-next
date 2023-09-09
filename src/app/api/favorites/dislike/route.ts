import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export const POST = async (req:Request) =>
{
  type BodyType = {
    title: string, 
  }
  try {
   const {id,title} = await  req.json();
   await connectToDB(); 

 
  const animeExists = await prisma.anime.findFirst({
    where: {
     title
    },
  })

   if(animeExists) {
      const deleteAnime = await prisma.anime.delete({
        where: {
         id
        },
      })
   return NextResponse.json({message:"Anime succesfully deleted!"},{status:200});
   }
   else {
    return NextResponse.json({error:"Anime couldn't be deleted!"},{status:409});
   }
  }
  catch(e){
    return NextResponse.json({message:"Internal Error"},{status:500});

  }
  finally {
   await prisma.$disconnect();
  }
}