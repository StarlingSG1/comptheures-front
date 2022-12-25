import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth/auth";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { MobileTemplate, NewTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";

export default function Register() {

    const { setBurgerOpen, theme } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const router = useRouter()

    const register = async (e) => {
        e.preventDefault();
        const response = await registerUser(credentials)
        if (response.error === true) {
            toast.error(response.message)
        } else {
            toast.success(response.message)
            router.push("/login")
        }
    }

    return (
        <>
            <Head>
                <title>Inscription - Comptheures</title>
                <meta
                    name="description"
                    content="S'inscrire sur Comptheures pour compter ses heures de travail dans un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                <form onSubmit={register} className="w-full h-full mt-20 md:hidden">
                    <BigLogo theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-60">
                        <Input defaultValue={credentials?.firstName} onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} placeholder={"Prénom"} />
                        <Input defaultValue={credentials?.lastName} onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} placeholder={"Nom"} />
                        <Input defaultValue={credentials?.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type="email" placeholder={"Adresse email"} />
                        <Input defaultValue={credentials?.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" placeholder={"Mot de passe"} />
                        <Input defaultValue={credentials?.confirmPassword} onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-[60px]">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button type="submit">S'inscrire</Button>
                    <div className="flex items-center justify-center gap-1.5 mb-[100px] mt-[15px]">
                        <Paragraph>Déjà un compte ?</Paragraph>
                        <ParagraphLink href="/login">Se connecter</ParagraphLink>
                    </div>
                </form>

                <form onSubmit={register} className="hidden md:block">
                    <StraightLogo className={"!mt-0 justify-center"} theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-10">
                        <Input defaultValue={credentials?.firstName} onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} placeholder={"Prénom"} />
                        <Input defaultValue={credentials?.lastName} onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} placeholder={"Nom"} />
                        <Input defaultValue={credentials?.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type="email" placeholder={"Adresse email"} />
                        <Input defaultValue={credentials?.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" placeholder={"Mot de passe"} />
                        <Input defaultValue={credentials?.confirmPassword} onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-10">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button type="submit">S'inscrire</Button>
                    <div className="flex items-center justify-center gap-1.5 mt-[15px]">
                        <Paragraph>Déjà un compte ?</Paragraph>
                        <ParagraphLink href="/login">Se connecter</ParagraphLink>
                    </div>
                </form>
            </NewTemplate>
        </>
    )
}
