import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import { invitationLoginUser } from "../../../api/auth/auth"
import { useUserContext } from "../../../context"
import { Button, Input, Paragraph, ParagraphLink } from "../../atoms"
import { BigLogo, StraightLogo } from "../../molecules"

export function InvitationLogin({ setStep, role, enterprise }) {

    const { setUser, setStatus, setLoading } = useUserContext()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        role,
        enterprise
    })

    const navigate = useRouter()


    const login = async (e, credentials) => {
        e.preventDefault()
        const response = await invitationLoginUser(credentials)
        if (!response.error) {
            localStorage.setItem("comptheures-token", response.data.token);
            setUser(response.user);
            setStatus("connected");
            setLoading(false);
            toast.success(response.message);
            navigate.push("/login");
        } else {
            toast.error(response.message);
            setStatus("error");
            setLoading(false);
        }
    }

    return (
        <form className="md:w-auto md:h-auto md:mt-10 w-full h-full" onSubmit={(e) => { login(e, credentials) }}>
            <StraightLogo className={"!mt-0 justify-center hidden md:flex"} />
            <BigLogo className={"md:hidden "} />
            <div className="flex flex-col gap-[15px] mt-60 md:mt-10">
                <Input onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} type="email" placeholder={"Adresse email"} />
                <Input onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} type="password" placeholder={"Mot de passe"} />
            </div>
            <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
            <Paragraph className="mt-5">En vous connectant, vous rejoindrez l'enterprise <strong>{enterprise?.name}</strong>.</Paragraph>
            <Button className="md:mt-[30px] mt-60" type="submit">Se connecter</Button>
            <div className="flex items-center justify-center gap-1.5 md:mb-0 mb-[100px] mt-[15px]">
                <Paragraph>Pas de compte ?</Paragraph>
                <Paragraph className="underline cursor-pointer" onClick={() => setStep(0)}>S'inscrire</Paragraph>
            </div>
        </form>
    )
}
