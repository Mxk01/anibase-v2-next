import { connectToDB } from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import bcrypt from 'bcrypt'
export const POST = async (req:Request) =>
{
  try {
   const {name,email,password} = await  req.json();
   if(!name || !email || !password) return NextResponse.json({message:"Invalid data"},{status:422});
   const hashedPassword = await bcrypt.hash(password,10);
    await connectToDB(); 
    const userExists = await prisma.user.findUnique({where : {email}});
    if(!userExists) {
   const newUser = await prisma.user.create({data:{email,name,hashedPassword}});
   return NextResponse.json({newUser},{status:200});
    }
    else {
      return NextResponse.json({message:"User already exists"},{status:409});
    }
  }
  catch(e){
    return NextResponse.json({message:"Internal Error"},{status:500});

  }
  finally {
   await prisma.$disconnect();
  }
}