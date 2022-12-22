import { useEffect } from "react"
import { MobileTemplate, NewTemplate, Template } from "../components/organisms"
import { useUserContext } from "../context"

export default function Logout() {

    const { logoutTheUser } = useUserContext()

    useEffect(() => { logoutTheUser() }, [])

    return (
        <>
            <NewTemplate></NewTemplate>
        </>)
}