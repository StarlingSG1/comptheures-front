import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { MobileTemplate, NewTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";
export default function Login() {

    const { setBurgerOpen, theme, loginTheUser } = useUserContext()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const login = async (e, credentials) => {
        e.preventDefault()
        await loginTheUser(credentials)
    }

    useEffect(() => { setBurgerOpen(false) }, [])

    return (
        <>
            <Head>
                <title>Connexion - Comptheures</title>
                <meta
                    name="description"
                    content="Se connecter à son compte Comptheures."
                />
            </Head>
            <NewTemplate>
                <form onSubmit={(e) => { login(e, credentials) }} className="w-full h-full mt-20 md:hidden">
                    <BigLogo theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-60">
                        <Input onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} type="email" placeholder={"Adresse email"} />
                        <Input onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} type="password" placeholder={"Mot de passe"} />
                    </div>
                    <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
                    <Button className="mt-60" type="submit">Se connecter</Button>
                    <div className="flex items-center justify-center gap-1.5 mb-[100px] mt-[15px]">
                        <Paragraph>Pas de compte ?</Paragraph>
                        <ParagraphLink href="/register">S'inscrire</ParagraphLink>
                    </div>
                </form>


                <form className="hidden md:block" onSubmit={(e) => { login(e, credentials) }}>
                    <StraightLogo className={"!mt-0 justify-center"} theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-10">
                        <Input onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} type="email" placeholder={"Adresse email"} />
                        <Input onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} type="password" placeholder={"Mot de passe"} />
                    </div>
                    <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
                    <Button className="mt-[30px]" type="submit">Se connecter</Button>
                    <div className="flex items-center justify-center gap-1.5 mt-[15px]">
                        <Paragraph>Pas de compte ?</Paragraph>
                        <ParagraphLink href="/register">S'inscrire</ParagraphLink>
                    </div>
                </form>
            </NewTemplate>
        </>
    )
}
