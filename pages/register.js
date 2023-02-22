import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth/auth";
import { BigLogo, EnterpriseRegister, StraightLogo, UserRegister } from "../components/molecules";
import { Breadcrumb, NewTemplate } from "../components/organisms";
import { useUserContext } from "../context";

export default function Register() {

    const { setBurgerOpen, theme } = useUserContext()
    const router = useRouter()

    const stepsName = ["Informations personnelles", "Informations entreprise"];
    const [step, setStep] = useState(0);
    const [credentials, setCredentials] = useState({
        user: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        enterprise: {
            name: "",
            address: "",
            postalCode: "",
            city: "",
            email: "",
            phone: "",
            website: "",
        }
    })


    const handleNextStep = (e) => {
        e.preventDefault();
        if (step >= 1) return;
        setStep(step + 1);
    }

    const handlePreviousStep = (e) => {
        e.preventDefault();
        if (step <= 0) return;
        setStep(step - 1);
    }

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

    useEffect(() => { setBurgerOpen(false) }, [])


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
                <StraightLogo className={"!mt-0 justify-center hidden md:flex"} />
                <BigLogo className={"md:hidden "} />
                <Breadcrumb
                    steps={stepsName}
                    currentStep={step}
                    onChooseStep={setStep}
                    className="mt-10 md:mt-0"
                    />
                <UserRegister
                    show={step === 0}
                    credentials={credentials}
                    setCredentials={setCredentials}
                    onSubmit={handleNextStep}
                    />
                <EnterpriseRegister
                    show={step === 1}
                    credentials={credentials}
                    setCredentials={setCredentials}
                    onSubmit={register}
                    handlePreviousStep={handlePreviousStep}
                    />
            </NewTemplate>
        </>
    )
}
