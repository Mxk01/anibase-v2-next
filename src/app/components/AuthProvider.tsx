"use client"
import React from "react"
import {SessionProvider} from "next-auth/react"

type ChildrenType = {children : React.ReactNode}
const AuthProvider = ({children}:ChildrenType) => {
    return <SessionProvider>
     {children}
    </SessionProvider>
}
export default AuthProvider