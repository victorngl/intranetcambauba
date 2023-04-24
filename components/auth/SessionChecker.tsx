import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import LoginForm from "./LoginForm";
import { UserContext } from "../../providers/user";

function SessionChecker({ children }) {
    const router = useRouter();

    const { data: session } = useSession()

    if (session) {
        return children
    }
    
    return (<LoginForm />)
    
}

export default SessionChecker;