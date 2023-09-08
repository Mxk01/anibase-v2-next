import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../prisma"
import bcrypt from 'bcrypt'
import { connectToDB } from "@/helpers/connectDB"
export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials)
      {
       
        if(!credentials || !credentials.email || !credentials.password) return null
        try {
          await connectToDB()
          const user = await prisma.user.findFirst({where:{email:credentials.email}});
          if(user?.hashedPassword)
          {
               let passwordsMatch = await bcrypt.compare(credentials.password,user.hashedPassword);
               if(passwordsMatch){
                return user;
               }
               else {
                return null;
               }
          } 
          
        }
        catch(e)
        {
          throw new Error(e.message)  
        }
        finally{
          prisma.$disconnect();
        }
      
        
      }
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/login"
  },
  
}