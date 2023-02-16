import Head from "next/head"
import { useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Button, Input, Paragraph, ParagraphLink } from "../../atoms"
import { BigLogo, StraightLogo } from "../../molecules"
import { NewTemplate } from "../Template/NewTemplate"

export function InvitationLogin({setStep}) {

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
                <form className="md:w-auto md:h-auto md:mt-10 w-full h-full" onSubmit={(e) => { login(e, credentials) }}>
                    <StraightLogo className={"!mt-0 justify-center hidden md:flex"} />
                    <BigLogo className={"md:hidden "}/>
                    <div className="flex flex-col gap-[15px] mt-60 md:mt-10">
                        <Input onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} type="email" placeholder={"Adresse email"} />
                        <Input onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} type="password" placeholder={"Mot de passe"} />
                    </div>
                    <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
                    <Button className="md:mt-[30px] mt-60" type="submit">Se connecter</Button>
                    <div className="flex items-center justify-center gap-1.5 md:mb-0 mb-[100px] mt-[15px]">
                        <Paragraph>Pas de compte ?</Paragraph>
                        <p className="dark:text-white text-blue underline font-noto" onClick={() => setStep(0)}>S'inscrire</p>
                    </div>
                </form>
    )
}
