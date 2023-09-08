"use client"
import React, { useRef } from 'react'
import Link from "next/link"
import {signIn} from 'next-auth/react'
function Page() {
    const password = useRef(null);
    const email = useRef(null);

    const login =  async () => {
        await signIn("credentials",{
            email:email.current,
            password:password.current,
            redirect:true,
            callbackUrl:"/"
        })
    }
    return (
    <div className="form-container">
   
    <form>

  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" 
    onChange={(e)=> email.current = e.target.value }
    id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" 
        ref={password}
        onChange={(e)=>password.current = e.target.value}
    id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>


  <div className="flex gap-2 flex-col">
  <button type="submit"
  onClick={(e)=>{ 
    e.preventDefault() 
    login();
  }}
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
<Link href="/register" style={{color:"black"}}>Do not have an account?</Link>
</div>
</form>

</div>
  )
}

export default Page