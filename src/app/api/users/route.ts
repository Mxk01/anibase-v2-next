import prisma from '../../../../prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await prisma.$connect();
    let users = await prisma.user.findMany();
    return NextResponse.json({message:users},{status:200});
  }
  catch(e)
  {
    return NextResponse.json({message:"Couldn't find users!"},{status:404})
  }
}