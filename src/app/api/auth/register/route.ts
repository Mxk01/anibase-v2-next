import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import bcrypt from 'bcrypt'
export const POST = async (req:Request) =>
{
  try {
   const {name,email,password} = await  req.json();
   const hashedPassword = await bcrypt.hash(password,10);
   if(!name || !email || !password) return NextResponse.json({message:"Invalid data"},{status:422});
   await connectToDB(); 
   const newUser = await prisma.user.create({data:{email,name,hashedPassword}});
   return NextResponse.json({newUser},{status:200});
  }
  catch(e){
    console.log(e)
    return NextResponse.json({message:"Internal Error"},{status:500});

  }
  finally {
   await prisma.$disconnect();
  }
}