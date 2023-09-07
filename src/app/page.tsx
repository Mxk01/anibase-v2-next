"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import AnimeComponent from "./components/AnimeComponent";
import CarouselComponent from "./components/CarouselComponent";

export default function Home() {
  let router = useRouter();

  let logout = async () => {
    router.push("/login");
    await signOut();
  };

  let login = async () => {
    router.push("/api/auth/signin");
  };

  const { data, status } = useSession();

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-4 md:p-24">
      <p className="mb-2 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">Welcome, {status === "authenticated" && data.user.name}</p>
      <AnimeComponent />
      {status === "authenticated" ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Sign out
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={login}
        >
          Sign in
        </button>
      )}
    </main>
  );
}
