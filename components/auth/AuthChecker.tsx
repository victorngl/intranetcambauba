import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

function AuthChecker({ children }) {
    const router = useRouter();

    const { data: session } = useSession()

    if (session)
        return children
    
    return (<LoginForm />)
    
}

export default AuthChecker;