import Head from "next/head"
import { useEffect } from "react"
import { MobileTemplate, NewTemplate, Template } from "../components/organisms"
import { useUserContext } from "../context"

export default function Logout() {

    const { logoutTheUser } = useUserContext()

    useEffect(() => { logoutTheUser() }, [])

    return (
        <>
            <Head>
                <title>Déconnexion - Comptheures</title>
                <meta
                    name="description"
                    content="Déconnexion de Comptheures."
                />
            </Head>
            <NewTemplate></NewTemplate>
        </>)
}