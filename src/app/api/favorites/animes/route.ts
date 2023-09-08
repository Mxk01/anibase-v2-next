import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export const GET = async (req:Request) =>
{
//   type BodyType = {
//     addedBy:string
//   }
  try {
//    const {addedBy}:BodyType = await  req.json();
   await connectToDB(); 

 
  const myAnime = await prisma.anime.findMany({
    // where: {
    //  addedBy
    // },
  })
  if(myAnime) {
   return NextResponse.json({myAnime},{status:200});
   }
   else {
    return NextResponse.json({error:"You don't have any anime added!"},{status:409});
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