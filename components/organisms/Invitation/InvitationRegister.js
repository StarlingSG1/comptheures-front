import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { invitationRegisterUser } from "../../../api/auth/auth"
import { useUserContext } from "../../../context"
import { Button, Input, Paragraph, ParagraphLink } from "../../atoms"
import { BigLogo, StraightLogo } from "../../molecules"


export function InvitationRegister({setStep, role, enterprise}) {

    const { setBurgerOpen } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        enterprise: enterprise,
        password: "",
        confirmPassword: "",
        role
    })

    const router = useRouter()

    const register = async (e) => {
        e.preventDefault();
        const response = await invitationRegisterUser(credentials)
        if (response.error === true) {
            toast.error(response.message)
        } else {
            toast.success(response.message)
            router.push("/login")
        }
    }

    return (
                <form onSubmit={register} className="w-full h-full mt-20 md:mt-10">
                    <StraightLogo className={"!mt-0 justify-center hidden md:flex"} />
                    <BigLogo className={"md:hidden "}/>
                    <div className="flex flex-col gap-[15px] mt-60 md:mt-10">
                        <Input defaultValue={credentials?.firstName} onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} placeholder={"Prénom"} />
                        <Input defaultValue={credentials?.lastName} onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} placeholder={"Nom"} />
                        <Input defaultValue={credentials?.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type="email" placeholder={"Adresse email"} />
                        <Input editable={false} defaultValue={credentials?.enterprise?.name} placeholder={"Entreprise"} />
                        <Input defaultValue={credentials?.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" placeholder={"Mot de passe"} />
                        <Input defaultValue={credentials?.confirmPassword} onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-[60px] md:mb-10">En m’inscrivant, je consens à la <ParagraphLink href="mentions-legales">politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button type="submit">S'inscrire</Button>
                </form>
    )
}
