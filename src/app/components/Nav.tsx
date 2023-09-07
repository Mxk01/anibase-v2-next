'use client';
import { signOut, useSession } from "next-auth/react";
import { Dropdown, Navbar,Avatar } from 'flowbite-react';

export default function Nav() {
  let {data,status} = useSession();
  return (
    
    <Navbar
      style={{backgroundColor:"transparent"}}
      fluid
      className="dark:bg-blue-400"
      rounded
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Anibase
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          className="flex flex-col justify-center items-center"
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {status == "authenticated" && data.user.name}
            </span>
            <span className="block truncate text-sm font-medium">
            {status == "authenticated" && data.user.email}
            </span>
          </Dropdown.Header>
          <Navbar.Link className="text-center cursor-pointer">
            Dashboard
          </Navbar.Link>
          <Navbar.Link className="text-center cursor-pointer">
            Settings
          </Navbar.Link>
          <Dropdown.Divider />
          <Navbar.Link className="text-center cursor-pointer">
            Sign out
          </Navbar.Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          Favorites
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    
  )
}


