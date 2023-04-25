import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoginForm from "./LoginForm";

function SessionChecker({ children }) {
    const router = useRouter();

    const { data: session } = useSession()

    if (session) {
        return children
    }
    
    return (<LoginForm />)
    
}

export default SessionChecker;