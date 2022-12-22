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
            toast.success("Inscription réussie !")
            router.push("/login")
        }
    }

    return (
        <>
        
            <NewTemplate>
                <form onClick={register} className="w-full h-full mt-20 md:hidden">
                    <BigLogo theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-60">
                        <Input onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} placeholder={"Prénom"} />
                        <Input onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} placeholder={"Nom"} />
                        <Input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type="email" placeholder={"Adresse email"} />
                        <Input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" placeholder={"Mot de passe"} />
                        <Input onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-[60px]">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button type="submit">S'inscrire</Button>
                    <div className="flex items-center justify-center gap-1.5 mb-[100px] mt-[15px]">
                        <Paragraph>Déjà un compte ?</Paragraph>
                        <ParagraphLink href="/login">Se connecter</ParagraphLink>
                    </div>
                </form>

                <form className="hidden md:block">
                    <StraightLogo className={"!mt-0 justify-center"} theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-10">
                        <Input placeholder={"Prénom"} />
                        <Input placeholder={"Nom"} />
                        <Input type="email" placeholder={"Adresse email"} />
                        <Input type="password" placeholder={"Mot de passe"} />
                        <Input type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-10">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button>S'inscrire</Button>
                    <div className="flex items-center justify-center gap-1.5 mt-[15px]">
                        <Paragraph>Déjà un compte ?</Paragraph>
                        <ParagraphLink href="/login">Se connecter</ParagraphLink>
                    </div>
                </form>
            </NewTemplate>
        </>
    )
}
