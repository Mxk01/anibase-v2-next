import { signOut, useSession } from "next-auth/react";
import { Dropdown, Navbar,Avatar } from 'flowbite-react';
import {useRouter} from 'next/navigation'
import Link from "next/link";
export default function Nav() {
  let {data,status} = useSession();
  let router = useRouter();
  return (
    
    <Navbar
      style={{backgroundColor:"transparent"}}
      fluid
      className="dark:bg-blue-400"
      rounded
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Anibase  
        </span>
      </Navbar.Brand>
      {status == "authenticated" &&
      <div className="flex md:order-2">
        <Dropdown
          inline
          className="flex flex-col justify-center items-center"
          label={
          <div className="rounded-full bg-purple-300 flex justify-center items-center"style={{width:"50px",height:"50px",textTransform:"uppercase"}} >{status=="authenticated" && data.user.name[0]}</div>}
        >
          <Dropdown.Header>
             
                <span className="block text-sm">{data.user.name} </span>
            <span className="block truncate text-sm font-medium">{data.user.email}</span>
          
          </Dropdown.Header>
          <Navbar.Link className="text-center cursor-pointer">
            Dashboard
          </Navbar.Link>
          <Navbar.Link className="text-center cursor-pointer">
            Settings
          </Navbar.Link>
          <Dropdown.Divider />
          <Navbar.Link className="text-center cursor-pointer" onClick={async()=> {
            try {
              signOut({ redirect: false }).then(() => {
                router.push("/login"); 
              });
            }
            catch(e) {
              console.log(e.message)
            }
          
          }}>
            Sign out
          </Navbar.Link>
          
        </Dropdown>

        <Navbar.Toggle />
      </div>      }

      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/favorites">
          Favorites
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    
  )
}


