"use client"
import { useState,useMemo,useCallback } from "react"
import {useRouter} from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
 function Register(name:string,email:string,password:string) {

  fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name,email,password}),
  }).then((res)=>res.json()).catch(e=>{ throw new Error("Failed to fetch data")})

}
export default  function Page() {
  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let router = useRouter()
  const changeUsername = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setName(e.target.value);
  };
  const changePassword = (e) => {
    setName(e.target.value);
  };
  const changeUser = useMemo(() =>changeUsername, [name]);
  const changeMail = useMemo(() =>changeUsername, [email]);
  const changePass = useMemo(() =>changeUsername, [password]);

  return (
    <div className="form-container flex">
   
    <form>
    <div className="mb-6">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
    <input type="text" id="repeat-password" 
    onChange={(e)=>changeUsername(e)}
    className="shadow-sm
    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" 
    onChange={(e)=>changeEmail(e)}
    id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" 
        onChange={(e)=>changePassword(e)}
    id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>

  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div>
    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
 
  <div className="flex gap-2 flex-col">
  <button type="submit"
  onClick={(e)=>{ e.preventDefault() 
   Register(name,email,password)}}
  className="text-white bg-blue-700 mb-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
<Link href="/login" style={{color:"black"}}>Already have an account?</Link>
</div>
</form>
</div>
  );
}