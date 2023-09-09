"use client"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import AnimeComponent from "./components/AnimeComponent";
import Nav from "./components/Nav";
import type { Metadata } from 'next'




export default function Home() {
  const { data, status } = useSession();
  let [category,setCategory] = useState<string>("");
  return (
    <> 
    <Nav/>
    <main className="flex flex-col min-h-screen items-center justify-between snap-y snap-mandatory p-4 md:p-24">
      <p className="mb-2 text-center text-lg md:text-xl lg:text-3xl font-bold	 xl:text-3xl">Welcome, {status === "authenticated" && data.user.name}</p>
<div className="flex"> 
<span className="mr-2">Select your favorite genre : </span>
<span className="bg-red-100 text-red-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
onClick={()=>setCategory("horror")}>Horror</span>
<span onClick={()=>setCategory("action")} className="cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Action</span>
<span onClick={()=>setCategory("romance")} className="cursor-pointer bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Romance</span>
</div>
    


      <AnimeComponent category={category} userData={data && data.user.email} />
  
    </main>
    </>
  );
}
